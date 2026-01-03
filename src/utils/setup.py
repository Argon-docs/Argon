"""Setup utilities for CUDA inference environment"""

import os
import sys
import torch


def setup_environment():
    """Configure environment for CUDA extensions"""
    # Set LD_LIBRARY_PATH to include PyTorch libraries for custom extensions
    torch_lib_path = os.path.join(os.path.dirname(torch.__file__), 'lib')
    if 'LD_LIBRARY_PATH' in os.environ:
        os.environ['LD_LIBRARY_PATH'] = f"{torch_lib_path}:{os.environ['LD_LIBRARY_PATH']}"
    else:
        os.environ['LD_LIBRARY_PATH'] = torch_lib_path
    
    # Add kernels directory to path
    script_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    kernels_dir = os.path.join(script_dir, 'kernels')
    if kernels_dir not in sys.path:
        sys.path.insert(0, kernels_dir)
    
    # Configure PyTorch
    os.environ.setdefault("TOKENIZERS_PARALLELISM", "false")
    torch.backends.cuda.matmul.allow_tf32 = True

