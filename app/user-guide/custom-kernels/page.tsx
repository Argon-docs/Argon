export default function CustomKernels() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Custom Kernels</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          Argon's modular kernel system allows you to implement, compile, and use custom kernels 
          for maximum performance. This guide shows you how to integrate custom kernels via the configuration system.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
          <p className="text-blue-800">
            <strong>Developer-Friendly:</strong> The modular design provides clear separation of concerns, 
            making it easy to add custom kernels and extend Argon's capabilities.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Kernel Architecture</h2>
        <p className="text-gray-700 mb-4">
          Argon supports four types of kernels that can be customized:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
          <li><strong>Decode Kernel:</strong> Token decoding and generation</li>
          <li><strong>Attention Kernel:</strong> Attention computation (can use Flash Attention, custom implementations)</li>
          <li><strong>Embedding Kernel:</strong> Token embedding operations</li>
          <li><strong>Weight Loader Kernel:</strong> Model weight loading and initialization</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Using Custom Kernels in Configuration</h2>
        <p className="text-gray-700 mb-4">
          Specify custom kernel paths in your <code className="bg-gray-100 px-2 py-1 rounded">config.yaml</code>:
        </p>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-green-400 text-sm">
{`kernels:
  decode: "./custom_kernels/my_decode_kernel.so"
  attention: "./custom_kernels/optimized_attention.so"
  embedding: "cuda"  # Use default CUDA kernel
  weight_loader: "./custom_kernels/fast_weight_loader.so"`}
          </pre>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Implementing a Custom Kernel</h2>
        <p className="text-gray-700 mb-4">
          Here's a step-by-step guide to creating a custom kernel:
        </p>

        <div className="space-y-6 mb-8">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 1: Kernel Implementation</h3>
            <p className="text-gray-700 mb-4">
              Create your kernel in CUDA C++ or Triton. Example structure:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
{`// custom_kernels/my_attention_kernel.cu
#include <cuda_runtime.h>
#include "argon_kernel_interface.h"

__global__ void my_attention_kernel(
    float* Q, float* K, float* V,
    float* output,
    int batch_size, int seq_len, int head_dim
) {
    // Your custom attention implementation
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx >= batch_size * seq_len * head_dim) return;
    
    // Kernel logic here
}

// Export function for Argon
extern "C" void execute_attention(
    void* Q, void* K, void* V,
    void* output,
    int batch_size, int seq_len, int head_dim
) {
    my_attention_kernel<<<...>>>(...);
}`}
              </pre>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 2: Compile the Kernel</h3>
            <p className="text-gray-700 mb-4">
              Compile your kernel as a shared library:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
{`# Compile CUDA kernel
nvcc -O3 -arch=sm_80 --shared \\
    -o custom_kernels/my_attention_kernel.so \\
    my_attention_kernel.cu \\
    -I/path/to/argon/kernels/include

# Or use nvcc with Python bindings
python setup.py build_ext --inplace`}
              </pre>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 3: Implement Kernel Interface</h3>
            <p className="text-gray-700 mb-4">
              Your kernel must implement Argon's kernel interface:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
{`// Kernel interface requirements
// 1. Function signature matching Argon's expected format
// 2. Proper memory management (device pointers)
// 3. Error handling
// 4. Thread synchronization

// Example interface function
extern "C" {
    int kernel_init() {
        // Initialization code
        return 0;  // 0 = success
    }
    
    void execute_attention(...) {
        // Main kernel execution
    }
    
    void kernel_cleanup() {
        // Cleanup code
    }
}`}
              </pre>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 4: Update Configuration</h3>
            <p className="text-gray-700 mb-4">
              Add your custom kernel to <code className="bg-gray-100 px-2 py-1 rounded">config.yaml</code>:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
{`kernels:
  attention: "./custom_kernels/my_attention_kernel.so"`}
              </pre>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 5: Test Your Kernel</h3>
            <p className="text-gray-700 mb-4">
              Validate your kernel using the test script:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <code className="text-green-400 text-sm">
                $ python3 test_inference.py --config config.yaml
              </code>
            </div>
            <p className="text-gray-700 mt-4">
              This will verify kernel loading, initialization, and basic functionality.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Kernel Interface Specification</h2>
        <p className="text-gray-700 mb-4">
          All custom kernels must implement these functions:
        </p>
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Required Functions</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><code className="bg-gray-200 px-2 py-1 rounded">kernel_init()</code> - Initialize kernel, return 0 on success</li>
            <li><code className="bg-gray-200 px-2 py-1 rounded">execute_*()</code> - Main execution function (name varies by kernel type)</li>
            <li><code className="bg-gray-200 px-2 py-1 rounded">kernel_cleanup()</code> - Cleanup resources</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Built-in Kernel Options</h2>
        <p className="text-gray-700 mb-4">
          Before creating custom kernels, try the built-in options:
        </p>
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kernel</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Option</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Performance</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">Attention</td>
                <td className="px-4 py-3 text-sm text-gray-600">"flash"</td>
                <td className="px-4 py-3 text-sm text-gray-600">Best (requires compatible GPU)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">Attention</td>
                <td className="px-4 py-3 text-sm text-gray-600">"cuda"</td>
                <td className="px-4 py-3 text-sm text-gray-600">Good (universal)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">Decode</td>
                <td className="px-4 py-3 text-sm text-gray-600">"cuda"</td>
                <td className="px-4 py-3 text-sm text-gray-600">Good</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">Decode</td>
                <td className="px-4 py-3 text-sm text-gray-600">"triton"</td>
                <td className="px-4 py-3 text-sm text-gray-600">Excellent (experimental)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Example: Custom Flash Attention Variant</h2>
        <p className="text-gray-700 mb-4">
          Complete example of integrating a custom Flash Attention variant:
        </p>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-green-400 text-sm">
{`# 1. Kernel implementation (simplified)
# custom_kernels/flash_attn_v2.cu
#include "flash_attn/flash_attn.h"

extern "C" void execute_attention(
    float* Q, float* K, float* V,
    float* output,
    int batch, int seq_len, int head_dim
) {
    flash_attn_v2_forward(Q, K, V, output, batch, seq_len, head_dim);
}

# 2. Compile
nvcc -shared -o custom_kernels/flash_attn_v2.so flash_attn_v2.cu

# 3. Config.yaml
kernels:
  attention: "./custom_kernels/flash_attn_v2.so"

# 4. Test
python3 test_inference.py --config config.yaml`}
          </pre>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Kernel Development Best Practices</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
          <li>Profile your kernels with Nsight Compute to identify bottlenecks</li>
          <li>Use shared memory efficiently for data reuse</li>
          <li>Optimize memory access patterns (coalesced access)</li>
          <li>Leverage Tensor Cores when available (Ampere+ GPUs)</li>
          <li>Test with different batch sizes and sequence lengths</li>
          <li>Handle edge cases (very short/long sequences)</li>
          <li>Include error checking and validation</li>
          <li>Document kernel-specific requirements (GPU architecture, CUDA version)</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Troubleshooting Custom Kernels</h2>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-8">
          <h3 className="text-lg font-semibold text-yellow-900 mb-2">Common Issues</h3>
          <ul className="list-disc list-inside text-yellow-800 space-y-2">
            <li><strong>Kernel not found:</strong> Check file path in config.yaml (use absolute paths)</li>
            <li><strong>Symbol not found:</strong> Ensure kernel exports required interface functions</li>
            <li><strong>CUDA errors:</strong> Verify GPU compatibility and CUDA version</li>
            <li><strong>Performance regression:</strong> Profile and compare with built-in kernels</li>
            <li><strong>Memory errors:</strong> Check device memory allocation and synchronization</li>
          </ul>
        </div>

        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Future-Ready Architecture</h3>
          <p className="text-gray-700">
            Argon's kernel architecture is designed to support multi-GPU inference in future versions. 
            Custom kernels that follow the interface specification will be compatible with distributed inference.
          </p>
        </div>
      </div>
    </div>
  )
}

