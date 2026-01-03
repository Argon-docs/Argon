# Fully Custom CUDA Inference Engine

This repository contains a **100% custom CUDA inference implementation** with configurable, reusable architecture. It supports custom kernels with minimal Python dependencies. The inference computation is completely custom (no HuggingFace model forward pass), using direct CUDA kernels for all operations.

## Overview

This implementation provides:
- **Configurable Architecture**: Define your model, kernels, and settings via `config.yaml`
- **Custom weight loading**: Loads safetensors and packs weights to persistent CUDA device buffers
- **Custom kernels**: All operations (RMSNorm, GEMMs, attention, MLP) use custom CUDA kernels
- **Custom inference**: Complete forward pass implemented with custom kernels
- **HuggingFace integration**: Only uses HuggingFace for tokenizer and config (no model forward pass)
- **Reusable Framework**: Easy to add custom kernels and support new models

## Architecture

The inference pipeline uses:
1. **Configuration System** (`src/utils/config.py`): YAML-based configuration for models, kernels, and settings
2. **Custom weight loader** (`kernels/weights/weight_loader.py`): Loads and packs model weights to CUDA device memory
3. **Custom kernels** (`kernels/`):
   - `decode/capture_decode_step`: RMSNorm, GEMMs (Q/K/V, MLP gate/up/down, logits), SwiGLU
   - `attention/attn_varlen`: Variable-length attention kernel
   - `embedding/d2d_row_copy`: Device-to-device embedding row copy
4. **Inference engine** (`src/inference/`): Modular inference engine with model state management
5. **Utilities** (`src/utils/`): RoPE, sampling, setup, and configuration utilities

## Project Structure

```
.
├── inference.py              # Main CLI entry point
├── test_inference.py         # Test/validate command
├── config.yaml               # Configuration file (create from config.example.yaml)
├── config.example.yaml       # Example configuration file
├── src/                      # Source code
│   ├── inference/           # Inference engine
│   │   ├── model.py         # Model state and weight management
│   │   └── engine.py        # Inference engine
│   └── utils/               # Utilities
│       ├── config.py        # Configuration loader
│       ├── kernel_loader.py # Dynamic kernel loader
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

## Configuration

The inference engine is configured via `config.yaml`. Create your configuration file:

```bash
cp config.example.yaml config.yaml
# Edit config.yaml with your settings
```

### Configuration Structure

```yaml
# Model configuration
model:
  path: "meta-llama/Llama-2-7b-hf"  # HuggingFace model ID or local path
  tokenizer:
    use_fast: true

# Kernel configuration
kernels:
  decode: "capture_decode_step"      # Decode step kernel
  attention: "attn_varlen"           # Attention kernel
  embedding: "d2d_row_copy"          # Embedding kernel
  weight_loader: "weight_loader"     # Weight loader

# Inference settings
inference:
  max_seq_len: 1024
  device: 0
  default_temperature: 0.8
  default_top_p: 0.95
  default_repetition_penalty: 1.1
  default_repetition_window: 128
  default_max_tokens: 500
```

### Adding Custom Kernels

To use custom kernels:

1. Implement your kernel following the existing kernel structure
2. Compile it using `kernels/setup.py`
3. Update `config.yaml` to specify your kernel name:
   ```yaml
   kernels:
     decode: "your_custom_decode_kernel"
   ```

The kernel loader will automatically import and use your custom kernels.

## Build

Build the custom CUDA extensions:

```bash
cd kernels
python3 setup.py build_ext --inplace
```

The compiled `.so` files will be in `kernels/`.

## Usage

### Using Configuration File (Recommended)

1. Create and configure `config.yaml`:
   ```bash
   cp config.example.yaml config.yaml
   # Edit config.yaml with your model and settings
   ```

2. Run inference:
   ```bash
   python3 inference.py --config config.yaml --prompt "Hello, world!"
   ```

3. Override config values with command-line arguments:
   ```bash
   python3 inference.py --config config.yaml --prompt "Hello" --max-tokens 100 --temperature 0.7
   ```

### Legacy Mode (Backwards Compatible)

You can still use command-line arguments directly (for backwards compatibility):

```bash
python3 inference.py \
    --model-path meta-llama/Llama-2-7b-hf \
    --prompt "The future of AI is" \
    --max-tokens 500 \
    --temperature 0.8 \
    --top-p 0.95
```

### Testing and Validation

Test your configuration and forward pass:

```bash
python3 test_inference.py --config config.yaml
```

This will:
- Test kernel loading
- Test model loading
- Test forward pass
- Provide recommendations if issues are found

Skip forward pass test (only test loading):
```bash
python3 test_inference.py --config config.yaml --skip-forward
```

### Arguments

When using config file, command-line arguments override config defaults:

- `--config`: Path to config.yaml file (default: config.yaml if exists)
- `--prompt`: Input prompt text
- `--max-tokens`: Maximum tokens to generate
- `--temperature`: Sampling temperature
- `--top-p`: Top-p (nucleus) sampling threshold
- `--repetition-penalty`: Repetition penalty factor
- `--repetition-window`: Window size for repetition penalty
- `--no-sample`: Use greedy decoding instead of sampling
- `--max-seq-len`: Maximum sequence length
- `--device`: CUDA device ID

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
- PyYAML (for configuration file support)
- transformers (for tokenizer and config only)
- safetensors
- huggingface_hub (for downloading models from HuggingFace Hub)
- CUDA toolkit
- cuBLAS

Install dependencies:
```bash
pip install torch transformers safetensors huggingface_hub pyyaml
```

## Inference Flow

1. **Load configuration** (`config.yaml`)
2. **Load model config and tokenizer** (HuggingFace)
3. **Load and pack weights** (custom weight loader)
4. **Tokenize prompt** (HuggingFace tokenizer)
5. **Prefill KV cache** (custom kernels):
   - For each prompt token:
     - Embedding lookup (d2d_row_copy)
     - For each layer:
       - RMSNorm → Q/K/V GEMMs → RoPE → Attention → O-proj
       - RMSNorm → MLP (gate/up → SwiGLU → down)
6. **Generate tokens** (custom kernels):
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
- Configuration system makes it easy to swap kernels and models
- Future: Multi-GPU support can be added via configuration (data parallelism, tensor parallelism, etc.)

## Performance

The custom inference path eliminates:
- HuggingFace model overhead
- Python overhead in forward pass
- Unnecessary allocations
- IPC overhead (pure single-process inference)

All operations run directly on GPU using optimized CUDA kernels.

## Modular Design

The codebase is organized into clear modules:

- **`src/utils/config.py`**: Configuration loading and validation
- **`src/utils/kernel_loader.py`**: Dynamic kernel loading system
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
- Add new kernels and models
- Scale to multi-GPU setups (future)

## Examples

### Example: Using Mistral 7B

1. Update `config.yaml`:
   ```yaml
   model:
     path: "mistralai/Mistral-7B-v0.1"
   ```

2. Run inference:
   ```bash
   python3 inference.py --config config.yaml --prompt "What is AI?"
   ```

3. Test configuration:
   ```bash
   python3 test_inference.py --config config.yaml
   ```
