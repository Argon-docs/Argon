"""Inference engine for custom CUDA inference"""

import math
import torch
from typing import Tuple

from .model import ModelState
from ..utils.rope import apply_rope
from ..utils.sampling import apply_repetition_penalty, sample_top_p

# Kernels will be imported when needed (after setup_environment is called)


class InferenceEngine:
    """Main inference engine for custom CUDA inference"""
    
    def __init__(self, model: ModelState, max_seq_len: int = 1024):
        # Import kernels (lazy import after setup_environment)
        import capture_decode_step as cds
        import d2d_row_copy as d2d
        import attn_varlen
        self.cds = cds
        self.d2d = d2d
        self.attn_varlen = attn_varlen
        
        self.model = model
        self.max_seq_len = max_seq_len
        self.device = model.device
        
        # Allocate KV cache
        self.arena_k = torch.empty(
            (model.num_layers, 1, model.kv_heads, max_seq_len, model.head_dim),
            dtype=torch.float16, device=self.device
        )
        self.arena_v = torch.empty_like(self.arena_k)
        self.seq_len_dev = torch.tensor([0], dtype=torch.int32, device=self.device)
        self.pos_dev = torch.tensor([0], dtype=torch.int32, device=self.device)
        
        # Allocate scratch buffers
        self._allocate_buffers()
    
    def _allocate_buffers(self):
        """Allocate scratch buffers for inference"""
        m = self.model
        self.x = torch.empty((m.hidden,), dtype=torch.float16, device=self.device)
        self.x_norm = torch.empty((m.hidden,), dtype=torch.float16, device=self.device)
        self.gate = torch.empty((m.I,), dtype=torch.float16, device=self.device)
        self.up = torch.empty((m.I,), dtype=torch.float16, device=self.device)
        self.act = torch.empty((m.I,), dtype=torch.float16, device=self.device)
        self.mlp_out = torch.empty((m.hidden,), dtype=torch.float16, device=self.device)
        self.attn_ctx = torch.empty((m.hidden,), dtype=torch.float16, device=self.device)
        self.q_vec = torch.empty((m.hidden,), dtype=torch.float16, device=self.device)
        self.k_vec = torch.empty((m.kv_heads * m.head_dim,), dtype=torch.float16, device=self.device)
        self.v_vec = torch.empty((m.kv_heads * m.head_dim,), dtype=torch.float16, device=self.device)
        self.logits = torch.empty((1, m.V), dtype=torch.float32, device=self.device)
    
    def prefill(self, prompt_ids: list):
        """Prefill KV cache with prompt tokens"""
        print(f"[Engine] Prefilling KV cache with {len(prompt_ids)} tokens...")
        self.seq_len_dev.fill_(0)
        self.pos_dev.fill_(0)
        
        m = self.model
        for pos in range(len(prompt_ids)):
            tok_id = int(prompt_ids[pos])
            self.d2d.copy_emb_row(m.emb_ptr, m.V, m.hidden, tok_id, self.x)
            
            for l in range(m.num_layers):
                self._forward_layer(l, is_prefill=True)
            
            # Advance sequence length
            if int(self.seq_len_dev.item()) + 1 < self.max_seq_len:
                self.seq_len_dev.add_(1)
                self.pos_dev.fill_(int(self.seq_len_dev.item()))
    
    def _forward_layer(self, layer_idx: int, is_prefill: bool = False):
        """Forward pass through a single transformer layer"""
        m = self.model
        l = layer_idx
        
        # Attention block
        rin = m.get_layer_weight_ptr(l, "rms_in")
        if rin != 0:
            self.cds.rmsnorm_ptr(self.x, rin, self.x_norm, m.rms_eps)
        else:
            self.x_norm.copy_(self.x)
        
        wq_ptr = m.get_layer_weight_ptr(l, "q")
        wk_ptr = m.get_layer_weight_ptr(l, "k")
        wv_ptr = m.get_layer_weight_ptr(l, "v")
        
        if wq_ptr and wk_ptr and wv_ptr:
            self.cds.down_gemm(self.x_norm, self.q_vec, wq_ptr, m.hidden, m.hidden)
            self.cds.down_gemm(self.x_norm, self.k_vec, wk_ptr, m.hidden, m.kv_heads * m.head_dim)
            self.cds.down_gemm(self.x_norm, self.v_vec, wv_ptr, m.hidden, m.kv_heads * m.head_dim)
            
            q_heads = self.q_vec.view(m.num_heads, m.head_dim).contiguous()
            k_heads = self.k_vec.view(m.kv_heads, m.head_dim).contiguous()
            v_heads = self.v_vec.view(m.kv_heads, m.head_dim).contiguous()
            
            T = int(self.seq_len_dev.item())
            # Apply RoPE
            q_heads = apply_rope(q_heads, T, m.rotary_dim, m.rope_theta, self.device)
            k_heads = apply_rope(k_heads, T, m.rotary_dim, m.rope_theta, self.device)
            
            # Cache K/V
            if T < self.max_seq_len:
                self.arena_k[l, 0, :, T, :].copy_(k_heads)
                self.arena_v[l, 0, :, T, :].copy_(v_heads)
            
            # Build K/V slices
            Ks = self.arena_k[l, 0, :, :T+1, :].contiguous()
            Vs = self.arena_v[l, 0, :, :T+1, :].contiguous()
            
            # Broadcast KV heads to query heads (GQA)
            group = max(1, m.num_heads // m.kv_heads)
            Ks = Ks.repeat_interleave(group, dim=0)
            Vs = Vs.repeat_interleave(group, dim=0)
            
            # Attention
            scale = 1.0 / math.sqrt(max(1, m.head_dim))
            ctx = self.attn_varlen.forward(q_heads, Ks, Vs, T + 1, scale)
            self.attn_ctx.copy_(ctx.view(-1).contiguous())
            
            # O projection and residual
            o_ptr = m.get_layer_weight_ptr(l, "o")
            if o_ptr:
                self.cds.down_gemm(self.attn_ctx, self.mlp_out, o_ptr, m.hidden, m.hidden)
                self.mlp_out.add_(self.x)
                self.x.copy_(self.mlp_out)
            else:
                self.x.add_(self.attn_ctx)
        
        # MLP block
        lp = m.get_layer_weight_ptr(l, "rms_post")
        if lp != 0:
            self.cds.rmsnorm_ptr(self.x, lp, self.x_norm, m.rms_eps)
        else:
            self.x_norm.copy_(self.x)
        
        wg = m.get_layer_weight_ptr(l, "mlp_gate")
        wu = m.get_layer_weight_ptr(l, "mlp_up")
        wd = m.get_layer_weight_ptr(l, "mlp_down")
        
        self.cds.gate_up_gemm(self.x_norm, self.gate, self.up, wg, wu, m.hidden, m.I)
        self.cds.swiglu(self.gate, self.up, self.act)
        self.cds.down_gemm(self.act, self.mlp_out, wd, m.I, m.hidden)
        self.mlp_out.add_(self.x)
        self.x.copy_(self.mlp_out)
    
    def generate_step(self) -> int:
        """Generate one token"""
        m = self.model
        
        # Forward through all layers
        for l in range(m.num_layers):
            self._forward_layer(l, is_prefill=False)
        
        # Final RMSNorm and logits
        y_final = self.x
        if m.rms_final_ptr != 0:
            self.cds.rmsnorm_ptr(self.x, m.rms_final_ptr, self.x_norm, m.rms_eps)
            y_final = self.x_norm
        
        self.cds.logits_gemm_vocab(y_final, self.logits[0], m.w_vocab_ptr, m.hidden, m.V)
        
        # Advance sequence length
        if int(self.seq_len_dev.item()) + 1 < self.max_seq_len:
            self.seq_len_dev.add_(1)
            self.pos_dev.fill_(int(self.seq_len_dev.item()))
        
        return int(torch.argmax(self.logits[0]).item())  # Return greedy token for now
    
    def generate(
        self,
        prompt: str,
        max_new_tokens: int = 500,
        temperature: float = 0.8,
        top_p: float = 0.95,
        repetition_penalty: float = 1.1,
        repetition_window: int = 128,
        do_sample: bool = True
    ) -> Tuple[list, str]:
        """Generate tokens from prompt"""
        # Tokenize prompt
        prompt_ids = self.model.tokenize(prompt)
        
        # Prefill
        self.prefill(prompt_ids)
        
        # Start generation from last prompt token
        last_token = int(prompt_ids[-1])
        self.d2d.copy_emb_row(self.model.emb_ptr, self.model.V, self.model.hidden, int(last_token), self.x)
        tokens = []
        
        print(f"[Engine] Generating {max_new_tokens} tokens...")
        for step in range(max_new_tokens):
            # Forward through all layers
            for l in range(self.model.num_layers):
                self._forward_layer(l, is_prefill=False)
            
            # Final RMSNorm and logits
            y_final = self.x
            if self.model.rms_final_ptr != 0:
                self.cds.rmsnorm_ptr(self.x, self.model.rms_final_ptr, self.x_norm, self.model.rms_eps)
                y_final = self.x_norm
            
            self.cds.logits_gemm_vocab(y_final, self.logits[0], self.model.w_vocab_ptr, self.model.hidden, self.model.V)
            
            # Sample token
            logits_cpu = self.logits[0].to("cpu")
            if do_sample:
                apply_repetition_penalty(logits_cpu, tokens[-repetition_window:], repetition_penalty)
                next_token = sample_top_p(logits_cpu, temperature, top_p)
            else:
                next_token = int(torch.argmax(logits_cpu).item())
            
            tokens.append(next_token)
            last_token = next_token
            
            # Update x as embedding of new token
            self.d2d.copy_emb_row(self.model.emb_ptr, self.model.V, self.model.hidden, int(last_token), self.x)
            
            # Advance sequence length
            if int(self.seq_len_dev.item()) + 1 < self.max_seq_len:
                self.seq_len_dev.add_(1)
                self.pos_dev.fill_(int(self.seq_len_dev.item()))
            
            # Print progress
            if (step + 1) % 50 == 0:
                partial_text = self.model.decode(tokens)
                print(f"[Engine] Generated {step + 1}/{max_new_tokens} tokens...")
        
        # Decode and return
        generated_text = self.model.decode(tokens)
        return tokens, generated_text

