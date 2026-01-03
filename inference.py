#!/usr/bin/env python3
"""
Pure Custom CUDA Inference for LLaMA2
100% custom inference using custom kernels and custom weight loading.
Only uses HuggingFace for tokenizer and config.
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


def main():
    parser = argparse.ArgumentParser(description="Pure Custom CUDA Inference for LLaMA2")
    parser.add_argument("--model-path", type=str, required=True, help="Path to model directory")
    parser.add_argument("--prompt", type=str, default="The future of AI is", help="Input prompt")
    parser.add_argument("--max-tokens", type=int, default=500, help="Maximum tokens to generate")
    parser.add_argument("--temperature", type=float, default=0.8, help="Sampling temperature")
    parser.add_argument("--top-p", type=float, default=0.95, help="Top-p (nucleus) sampling")
    parser.add_argument("--repetition-penalty", type=float, default=1.1, help="Repetition penalty")
    parser.add_argument("--repetition-window", type=int, default=128, help="Repetition penalty window")
    parser.add_argument("--no-sample", action="store_true", help="Use greedy decoding (no sampling)")
    parser.add_argument("--max-seq-len", type=int, default=1024, help="Maximum sequence length")
    parser.add_argument("--device", type=int, default=0, help="CUDA device ID")
    
    args = parser.parse_args()
    
    print("=" * 80)
    print("Pure Custom CUDA Inference")
    print("=" * 80)
    print(f"Model: {args.model_path}")
    print(f"Prompt: {args.prompt}")
    print(f"Max tokens: {args.max_tokens}")
    print("=" * 80)
    
    # Load model
    model = ModelState(args.model_path, device_id=args.device)
    
    # Create inference engine
    engine = InferenceEngine(model, max_seq_len=args.max_seq_len)
    
    # Generate
    tokens, text = engine.generate(
        prompt=args.prompt,
        max_new_tokens=args.max_tokens,
        temperature=args.temperature,
        top_p=args.top_p,
        repetition_penalty=args.repetition_penalty,
        repetition_window=args.repetition_window,
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
