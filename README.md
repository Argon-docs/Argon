# Fully Custom CUDA Inference for LLaMA2

This repository contains a **100% custom CUDA inference implementation** for LLaMA2 using custom kernels with minimal Python dependencies. The inference computation is completely custom (no HuggingFace model forward pass), using direct CUDA kernels for all operations.

## Overview

This implementation provides:
- **Custom weight loading**: Loads safetensors and packs weights to persistent CUDA device buffers
- **Custom kernels**: All operations (RMSNorm, GEMMs, attention, MLP) use custom CUDA kernels
- **Custom inference**: Complete forward pass implemented with custom kernels
- **HuggingFace integration**: Only uses HuggingFace for tokenizer and config (no model forward pass)

## Architecture

The inference pipeline uses:
1. **Custom weight loader** (`kernels/weights/weight_loader.py`): Loads and packs model weights to CUDA device memory
2. **Custom kernels** (`kernels/`):
   - `decode/capture_decode_step`: RMSNorm, GEMMs (Q/K/V, MLP gate/up/down, logits), SwiGLU
   - `attention/attn_varlen`: Variable-length attention kernel
   - `embedding/d2d_row_copy`: Device-to-device embedding row copy
3. **Inference engine** (`src/inference/`): Modular inference engine with model state management
4. **Utilities** (`src/utils/`): RoPE, sampling, and setup utilities

## Project Structure

```
.
├── inference.py              # Main CLI entry point
├── src/                      # Source code
│   ├── inference/           # Inference engine
│   │   ├── model.py         # Model state and weight management
│   │   └── engine.py        # Inference engine
│   └── utils/               # Utilities
│       ├── rope.py          # Rotary Position Embedding
│       ├── sampling.py      # Token sampling (top-p, repetition penalty)
│       └── setup.py         # Environment setup
├── kernels/                  # Custom CUDA kernels
│   ├── attention/           # Attention kernels
│   │   ├── attn_varlen.cpp
│   │   └── attn_varlen_kernel.cu
│   ├── decode/             # Decode step kernels
│   │   ├── capture_decode_step.cpp
│   │   └── capture_decode_step_kernel.cu
│   ├── embedding/          # Embedding kernels
│   │   └── d2d_row_copy.cpp
│   ├── weights/            # Weight loading
│   │   └── weight_loader.py
│   ├── setup.py            # Build script
│   └── *.so                # Compiled extensions
└── README.md
```

## Custom Kernels

### Core Operations
- **RMSNorm**: Fused RMS normalization
- **GEMMs**: cuBLAS-based matrix multiplications for:
  - Q/K/V projections
  - MLP gate/up/down projections
  - Logits projection
- **SwiGLU**: Fused SiLU-Gated Linear Unit activation
- **Attention**: Variable-length attention with GQA (Grouped Query Attention) support
- **RoPE**: Rotary Position Embedding (implemented in Python)

## Build

Build the custom CUDA extensions:

```bash
cd kernels
python3 setup.py build_ext --inplace
```

The compiled `.so` files will be in `kernels/`.

## Usage

Run custom inference:

```bash
python3 inference.py \
    --model-path meta-llama/Llama-2-7b-hf \
    --prompt "The future of AI is" \
    --max-tokens 500 \
    --temperature 0.8 \
    --top-p 0.95
```

### Arguments

- `--model-path`: Path to HuggingFace model directory or model ID (required)
- `--prompt`: Input prompt text (default: "The future of AI is")
- `--max-tokens`: Maximum tokens to generate (default: 500)
- `--temperature`: Sampling temperature (default: 0.8)
- `--top-p`: Top-p (nucleus) sampling threshold (default: 0.95)
- `--repetition-penalty`: Repetition penalty factor (default: 1.1)
- `--repetition-window`: Window size for repetition penalty (default: 128)
- `--no-sample`: Use greedy decoding instead of sampling
- `--max-seq-len`: Maximum sequence length (default: 1024)
- `--device`: CUDA device ID (default: 0)

## Custom Kernels Details

### capture_decode_step
- `rmsnorm_ptr`: RMSNorm with weight pointer
- `down_gemm`: Down projection GEMM (used for Q/K/V, O-proj, MLP down)
- `gate_up_gemm`: Fused gate/up GEMM for MLP
- `swiglu`: SwiGLU activation
- `logits_gemm_vocab`: Logits projection to vocabulary

### attn_varlen
- Variable-length attention kernel supporting GQA
- Handles Q·K^T → softmax → P·V computation

### d2d_row_copy
- Efficient device-to-device copy of embedding rows
- Used for token embedding lookup

### weight_loader
- Loads safetensors from HuggingFace model
- Supports both local paths and HuggingFace model IDs
- Packs weights to persistent CUDA device buffers
- Exposes device pointers for custom kernels

## Requirements

- Python 3.x
- PyTorch with CUDA
- transformers (for tokenizer and config only)
- safetensors
- huggingface_hub (for downloading models from HuggingFace Hub)
- CUDA toolkit
- cuBLAS

## Inference Flow

1. **Load model config and tokenizer** (HuggingFace)
2. **Load and pack weights** (custom weight loader)
3. **Tokenize prompt** (HuggingFace tokenizer)
4. **Prefill KV cache** (custom kernels):
   - For each prompt token:
     - Embedding lookup (d2d_row_copy)
     - For each layer:
       - RMSNorm → Q/K/V GEMMs → RoPE → Attention → O-proj
       - RMSNorm → MLP (gate/up → SwiGLU → down)
5. **Generate tokens** (custom kernels):
   - For each generation step:
     - Same layer operations as prefill
     - Sample token from logits
     - Update KV cache
     - Continue until max_tokens

## Notes

- All weights are stored in persistent CUDA device memory
- KV cache uses grouped-query attention (GQA) format
- RoPE is applied manually in Python (can be moved to CUDA kernel)
- Sampling is done on CPU to avoid CUDA allocations during inference
- All GEMMs use cuBLAS with stream-bound handles

## Performance

The custom inference path eliminates:
- HuggingFace model overhead
- Python overhead in forward pass
- Unnecessary allocations
- IPC overhead (pure single-process inference)

All operations run directly on GPU using optimized CUDA kernels.

## Modular Design

The codebase is organized into clear modules:

- **`src/inference/model.py`**: Model state management, weight loading, configuration
- **`src/inference/engine.py`**: Inference engine with prefill and generation logic
- **`src/utils/rope.py`**: Rotary Position Embedding implementation
- **`src/utils/sampling.py`**: Token sampling utilities
- **`src/utils/setup.py`**: Environment configuration
- **`kernels/`**: Organized by functionality (attention, decode, embedding, weights)

This modular structure makes it easy to:
- Extend functionality
- Test individual components
- Understand the codebase
- Maintain and debug
