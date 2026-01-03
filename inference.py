#!/usr/bin/env python3
"""
Pure Custom CUDA Inference
100% custom inference using custom kernels and custom weight loading.
Only uses HuggingFace for tokenizer and config.
Supports configuration via config.yaml file.
"""

import os
import sys
import argparse

# Add src to path
script_dir = os.path.dirname(os.path.abspath(__file__))
src_dir = os.path.join(script_dir, 'src')
if src_dir not in sys.path:
    sys.path.insert(0, src_dir)

# Setup environment FIRST (before importing modules that need kernels)
from src.utils.setup import setup_environment
setup_environment()

# Now import inference modules (they can import kernels)
from src.inference import ModelState, InferenceEngine
from src.utils.config import Config, ConfigError


def main():
    parser = argparse.ArgumentParser(
        description="Pure Custom CUDA Inference",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Use config file (recommended)
  python3 inference.py --config config.yaml --prompt "Hello, world!"
  
  # Override config with command-line arguments
  python3 inference.py --config config.yaml --prompt "Hello" --max-tokens 100
  
  # Legacy mode: use command-line arguments directly (backwards compatibility)
  python3 inference.py --model-path meta-llama/Llama-2-7b-hf --prompt "Hello"
        """
    )
    
    # Config file argument
    parser.add_argument(
        "--config",
        type=str,
        default=None,
        help="Path to config.yaml file (if not provided, model-path is required)"
    )
    
    # Model arguments (optional if config is provided)
    parser.add_argument(
        "--model-path",
        type=str,
        default=None,
        help="Path to model directory (required if --config is not provided)"
    )
    
    # Generation arguments (override config defaults)
    parser.add_argument("--prompt", type=str, default=None, help="Input prompt")
    parser.add_argument("--max-tokens", type=int, default=None, help="Maximum tokens to generate")
    parser.add_argument("--temperature", type=float, default=None, help="Sampling temperature")
    parser.add_argument("--top-p", type=float, default=None, help="Top-p (nucleus) sampling")
    parser.add_argument("--repetition-penalty", type=float, default=None, help="Repetition penalty")
    parser.add_argument("--repetition-window", type=int, default=None, help="Repetition penalty window")
    parser.add_argument("--no-sample", action="store_true", help="Use greedy decoding (no sampling)")
    parser.add_argument("--max-seq-len", type=int, default=None, help="Maximum sequence length")
    parser.add_argument("--device", type=int, default=None, help="CUDA device ID")
    
    args = parser.parse_args()
    
    # Determine if using config or legacy mode
    # Use config mode if --config is explicitly provided, or if config.yaml exists (default)
    # Legacy mode is used only if --config is not provided and config.yaml doesn't exist
    use_config = args.config is not None or os.path.exists("config.yaml")
    
    if use_config:
        # Config-based mode
        config_path = args.config if args.config else "config.yaml"
        try:
            config = Config(config_path)
        except ConfigError as e:
            print(f"Error loading config: {e}")
            sys.exit(1)
        except Exception as e:
            print(f"Unexpected error loading config: {e}")
            sys.exit(1)
        
        # Use config values, override with command-line args if provided
        model_path = config.model_path
        device_id = args.device if args.device is not None else config.device_id
        max_seq_len = args.max_seq_len if args.max_seq_len is not None else config.max_seq_len
        prompt = args.prompt if args.prompt is not None else "The future of AI is"
        max_tokens = args.max_tokens if args.max_tokens is not None else config.default_max_tokens
        temperature = args.temperature if args.temperature is not None else config.default_temperature
        top_p = args.top_p if args.top_p is not None else config.default_top_p
        repetition_penalty = args.repetition_penalty if args.repetition_penalty is not None else config.default_repetition_penalty
        repetition_window = args.repetition_window if args.repetition_window is not None else config.default_repetition_window
        
        print("=" * 80)
        print("Pure Custom CUDA Inference (Config Mode)")
        print("=" * 80)
        print(f"Config: {config_path}")
        print(f"Model: {model_path}")
        print(f"Prompt: {prompt}")
        print(f"Max tokens: {max_tokens}")
        print("=" * 80)
        
        # Load model with config
        model = ModelState(config=config)
        
        # Create inference engine with config
        engine = InferenceEngine(model, max_seq_len=max_seq_len, config=config)
    
    else:
        # Legacy mode (backwards compatibility)
        if args.model_path is None:
            parser.error("--model-path is required when --config is not provided")
        
        model_path = args.model_path
        device_id = args.device if args.device is not None else 0
        max_seq_len = args.max_seq_len if args.max_seq_len is not None else 1024
        prompt = args.prompt if args.prompt is not None else "The future of AI is"
        max_tokens = args.max_tokens if args.max_tokens is not None else 500
        temperature = args.temperature if args.temperature is not None else 0.8
        top_p = args.top_p if args.top_p is not None else 0.95
        repetition_penalty = args.repetition_penalty if args.repetition_penalty is not None else 1.1
        repetition_window = args.repetition_window if args.repetition_window is not None else 128
        
        print("=" * 80)
        print("Pure Custom CUDA Inference (Legacy Mode)")
        print("=" * 80)
        print(f"Model: {model_path}")
        print(f"Prompt: {prompt}")
        print(f"Max tokens: {max_tokens}")
        print("=" * 80)
        
        # Load model (legacy mode)
        model = ModelState(model_path, device_id=device_id)
        
        # Create inference engine (legacy mode)
        engine = InferenceEngine(model, max_seq_len=max_seq_len)
    
    # Generate
    tokens, text = engine.generate(
        prompt=prompt,
        max_new_tokens=max_tokens,
        temperature=temperature,
        top_p=top_p,
        repetition_penalty=repetition_penalty,
        repetition_window=repetition_window,
        do_sample=not args.no_sample
    )
    
    print("\n" + "=" * 80)
    print("Generated Text:")
    print("=" * 80)
    print(text)
    print("=" * 80)
    print(f"\nGenerated {len(tokens)} tokens")


if __name__ == "__main__":
    main()
