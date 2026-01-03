"""Model loading and state management"""

import torch
from transformers import AutoTokenizer, AutoConfig
from typing import Dict, Any, Tuple

# Kernels will be imported lazily when needed (after setup_environment is called)


class ModelState:
    """Manages model weights, configuration, and device state"""
    
    def __init__(self, model_path: str, device_id: int = 0):
        self.device = torch.device(f"cuda:{device_id}")
        self.model_path = model_path
        
        # Load tokenizer and config
        print(f"[Model] Loading tokenizer and config from {model_path}...")
        self.tokenizer = AutoTokenizer.from_pretrained(model_path, use_fast=True)
        if self.tokenizer.pad_token is None:
            self.tokenizer.pad_token = self.tokenizer.eos_token
        
        self.config = AutoConfig.from_pretrained(model_path)
        self._extract_config()
        
        # Load weights
        print(f"[Model] Loading weights using custom weight loader...")
        from kernels.weights.weight_loader import load_and_pack
        self.weights = load_and_pack(model_path)
        self._extract_weight_pointers()
    
    def _extract_config(self):
        """Extract model configuration parameters"""
        self.hidden = int(getattr(self.config, "hidden_size", 4096))
        self.num_layers = int(getattr(self.config, "num_hidden_layers", 32))
        self.num_heads = int(getattr(self.config, "num_attention_heads", 32))
        self.kv_heads = int(getattr(self.config, "num_key_value_heads", self.num_heads))
        self.head_dim = self.hidden // self.num_heads
        self.vocab = int(getattr(self.config, "vocab_size", 32000))
        self.rope_theta = float(getattr(self.config, "rope_theta", 10000.0))
        rotary_dim = int(getattr(self.config, "rotary_dim", self.head_dim))
        self.rotary_dim = max(2, min(rotary_dim, self.head_dim))
        self.rms_eps = float(getattr(self.config, "rms_norm_eps", 1e-6))
    
    def _extract_weight_pointers(self):
        """Extract weight pointers and shapes from loaded weights"""
        gate_shapes = self.weights.get("mlp_gate_shapes", [])
        up_shapes = self.weights.get("mlp_up_shapes", [])
        emb_shape = self.weights.get("emb_shape", (self.vocab, self.hidden))
        lm_head_shape = self.weights.get("lm_head_shape", (0, 0))
        
        # Infer intermediate size
        self.I = int(max(
            gate_shapes[0][0] if gate_shapes else 0,
            up_shapes[0][0] if up_shapes else 0
        ) or (self.hidden * 2))
        
        self.V = int(lm_head_shape[0]) if isinstance(lm_head_shape, (list, tuple)) and lm_head_shape and lm_head_shape[0] else \
            int(emb_shape[0]) if isinstance(emb_shape, (list, tuple)) and emb_shape and emb_shape[0] else self.vocab
        
        # Get weight pointers
        self.rms_final_ptr = int(self.weights.get("rms_final_ptr", 0))
        self.emb_ptr = int(self.weights.get("emb_ptr", 0))
        self.lm_head_ptr = int(self.weights.get("lm_head_ptr", 0))
        self.w_vocab_ptr = self.lm_head_ptr or self.emb_ptr
    
    def get_layer_weight_ptr(self, layer_idx: int, weight_type: str) -> int:
        """Get weight pointer for a specific layer and weight type"""
        ptrs = self.weights.get(f"{weight_type}_ptrs", [0] * self.num_layers)
        return int(ptrs[layer_idx]) if ptrs else 0
    
    def tokenize(self, text: str) -> list:
        """Tokenize text and return token IDs"""
        enc = self.tokenizer(text, return_tensors="pt")
        return enc["input_ids"][0].tolist()
    
    def decode(self, token_ids: list) -> str:
        """Decode token IDs to text"""
        return self.tokenizer.decode(token_ids, skip_special_tokens=True)

