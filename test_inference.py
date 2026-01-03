#!/usr/bin/env python3
"""
Test/Validate command for inference engine
Tests forward pass and provides recommendations for issues
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

from src.utils.config import Config, ConfigError
from src.utils.kernel_loader import load_kernel, KernelLoadError
from src.inference import ModelState, InferenceEngine


def test_kernels(config: Config) -> list:
    """Test if all required kernels can be loaded"""
    issues = []
    
    print("Testing kernel loading...")
    kernels_to_test = {
        'decode': config.kernel_decode,
        'attention': config.kernel_attention,
        'embedding': config.kernel_embedding,
        'weight_loader': config.kernel_weight_loader,
    }
    
    for kernel_type, kernel_name in kernels_to_test.items():
        try:
            load_kernel(kernel_name)
            print(f"  ✓ {kernel_type} kernel ('{kernel_name}') loaded successfully")
        except KernelLoadError as e:
            print(f"  ✗ {kernel_type} kernel ('{kernel_name}') failed to load: {e}")
            issues.append({
                'type': 'kernel_load',
                'kernel': kernel_name,
                'error': str(e),
                'recommendation': f"Make sure kernel '{kernel_name}' is compiled. Run: cd kernels && python3 setup.py build_ext --inplace"
            })
        except Exception as e:
            print(f"  ✗ {kernel_type} kernel ('{kernel_name}') failed with unexpected error: {e}")
            issues.append({
                'type': 'kernel_load',
                'kernel': kernel_name,
                'error': str(e),
                'recommendation': f"Check kernel '{kernel_name}' implementation and compilation"
            })
    
    return issues


def test_model_loading(config: Config) -> list:
    """Test if model can be loaded"""
    issues = []
    
    print("\nTesting model loading...")
    try:
        model = ModelState(config=config)
        print(f"  ✓ Model loaded successfully from {config.model_path}")
        print(f"    - Hidden size: {model.hidden}")
        print(f"    - Num layers: {model.num_layers}")
        print(f"    - Vocab size: {model.vocab}")
        return issues, model
    except Exception as e:
        print(f"  ✗ Model loading failed: {e}")
        issues.append({
            'type': 'model_load',
            'error': str(e),
            'recommendation': f"Check if model path '{config.model_path}' is correct and accessible. "
                            f"If using HuggingFace Hub, ensure you have proper authentication set up."
        })
        return issues, None


def test_forward_pass(engine: InferenceEngine) -> list:
    """Test forward pass with a simple prompt"""
    issues = []
    
    print("\nTesting forward pass...")
    try:
        # Use a simple prompt
        test_prompt = "Hello"
        print(f"  Testing with prompt: '{test_prompt}'")
        
        # Tokenize
        prompt_ids = engine.model.tokenize(test_prompt)
        print(f"  ✓ Tokenization successful ({len(prompt_ids)} tokens)")
        
        # Prefill
        try:
            engine.prefill(prompt_ids)
            print(f"  ✓ Prefill completed successfully")
        except Exception as e:
            print(f"  ✗ Prefill failed: {e}")
            issues.append({
                'type': 'forward_pass',
                'stage': 'prefill',
                'error': str(e),
                'recommendation': "Check kernel implementations, weight pointers, and CUDA memory availability. "
                                "Verify model architecture matches kernel expectations."
            })
            return issues
        
        # Generate one token
        try:
            token = engine.generate_step()
            print(f"  ✓ Generation step completed (token: {token})")
            
            # Decode to verify
            decoded = engine.model.decode([token])
            print(f"  ✓ Token decoding successful: '{decoded}'")
        except Exception as e:
            print(f"  ✗ Generation step failed: {e}")
            issues.append({
                'type': 'forward_pass',
                'stage': 'generation',
                'error': str(e),
                'recommendation': "Check kernel implementations, especially decode step kernel. "
                                "Verify logits computation and sampling logic."
            })
        
    except Exception as e:
        print(f"  ✗ Forward pass test failed: {e}")
        issues.append({
            'type': 'forward_pass',
            'stage': 'unknown',
            'error': str(e),
            'recommendation': "Check CUDA availability, memory, and kernel compatibility with model architecture."
        })
    
    return issues


def print_recommendations(issues: list):
    """Print recommendations for all issues"""
    if not issues:
        print("\n" + "=" * 80)
        print("✓ All tests passed! Your inference setup is ready to use.")
        print("=" * 80)
        return
    
    print("\n" + "=" * 80)
    print("Issues Found - Recommendations:")
    print("=" * 80)
    
    for i, issue in enumerate(issues, 1):
        print(f"\n{i}. {issue.get('type', 'unknown').upper()} Issue")
        if 'kernel' in issue:
            print(f"   Kernel: {issue['kernel']}")
        if 'stage' in issue:
            print(f"   Stage: {issue['stage']}")
        print(f"   Error: {issue['error']}")
        print(f"   Recommendation: {issue['recommendation']}")
    
    print("\n" + "=" * 80)


def main():
    parser = argparse.ArgumentParser(description="Test and validate inference engine configuration")
    parser.add_argument(
        "--config",
        type=str,
        default="config.yaml",
        help="Path to config.yaml file (default: config.yaml)"
    )
    parser.add_argument(
        "--skip-forward",
        action="store_true",
        help="Skip forward pass test (only test kernel and model loading)"
    )
    
    args = parser.parse_args()
    
    print("=" * 80)
    print("Inference Engine Test & Validation")
    print("=" * 80)
    print(f"Config file: {args.config}\n")
    
    # Load config
    try:
        config = Config(args.config)
        print(f"✓ Config loaded successfully")
    except ConfigError as e:
        print(f"✗ Config loading failed: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"✗ Unexpected error loading config: {e}")
        sys.exit(1)
    
    all_issues = []
    
    # Test kernel loading
    kernel_issues = test_kernels(config)
    all_issues.extend(kernel_issues)
    
    # If kernels failed, skip model and forward pass tests
    if kernel_issues:
        print("\n⚠ Kernel loading failed. Skipping model and forward pass tests.")
        print_recommendations(all_issues)
        sys.exit(1)
    
    # Test model loading
    model_issues, model = test_model_loading(config)
    all_issues.extend(model_issues)
    
    # If model loading failed, skip forward pass test
    if model_issues or model is None:
        print("\n⚠ Model loading failed. Skipping forward pass test.")
        print_recommendations(all_issues)
        sys.exit(1)
    
    # Test forward pass
    if not args.skip_forward:
        try:
            engine = InferenceEngine(model, max_seq_len=config.max_seq_len, config=config)
            forward_issues = test_forward_pass(engine)
            all_issues.extend(forward_issues)
        except Exception as e:
            print(f"\n✗ Failed to create inference engine: {e}")
            all_issues.append({
                'type': 'engine_init',
                'error': str(e),
                'recommendation': "Check inference engine initialization. Verify all kernels are compatible."
            })
    
    # Print recommendations
    print_recommendations(all_issues)
    
    # Exit with error code if issues found
    if all_issues:
        sys.exit(1)
    else:
        sys.exit(0)


if __name__ == "__main__":
    main()

