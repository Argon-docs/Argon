"""Dynamic kernel loader based on configuration"""

import sys
import importlib
from typing import Any, Dict, Optional


class KernelLoadError(Exception):
    """Error loading kernel"""
    pass


class KernelRegistry:
    """Registry for kernel modules"""
    
    def __init__(self):
        self._kernels: Dict[str, Any] = {}
    
    def load_kernel(self, kernel_name: str) -> Any:
        """
        Load a kernel module by name.
        
        Kernel names map to Python modules in the kernels directory:
        - 'capture_decode_step' -> kernels/capture_decode_step module
        - 'attn_varlen' -> kernels/attn_varlen module
        - 'd2d_row_copy' -> kernels/d2d_row_copy module
        - 'weight_loader' -> kernels/weights/weight_loader module
        """
        if kernel_name in self._kernels:
            return self._kernels[kernel_name]
        
        try:
            # Special handling for weight_loader (it's in a subdirectory)
            if kernel_name == 'weight_loader':
                from kernels.weights.weight_loader import load_and_pack
                self._kernels[kernel_name] = {'load_and_pack': load_and_pack}
                return self._kernels[kernel_name]
            
            # For other kernels, they should be compiled .so files in kernels/
            # Import them directly (they're added to sys.path by setup_environment)
            module = importlib.import_module(kernel_name)
            self._kernels[kernel_name] = module
            return module
        
        except ImportError as e:
            raise KernelLoadError(
                f"Failed to load kernel '{kernel_name}': {e}\n"
                f"Make sure the kernel is compiled and available. "
                f"Run 'cd kernels && python3 setup.py build_ext --inplace' to build kernels."
            )
        except Exception as e:
            raise KernelLoadError(f"Unexpected error loading kernel '{kernel_name}': {e}")
    
    def get_kernel(self, kernel_name: str) -> Optional[Any]:
        """Get a previously loaded kernel, or None if not loaded"""
        return self._kernels.get(kernel_name)
    
    def clear(self):
        """Clear all loaded kernels (useful for testing)"""
        self._kernels.clear()


# Global kernel registry instance
_kernel_registry = KernelRegistry()


def load_kernel(kernel_name: str) -> Any:
    """Load a kernel module by name"""
    return _kernel_registry.load_kernel(kernel_name)


def get_kernel(kernel_name: str) -> Optional[Any]:
    """Get a previously loaded kernel"""
    return _kernel_registry.get_kernel(kernel_name)

