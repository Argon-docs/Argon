export default function Kernels() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Custom Kernels</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          Argon's performance is powered by custom CUDA kernels. Learn how to develop, 
          optimize, and integrate custom kernels into Argon.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Kernel Architecture</h2>
        <p className="text-gray-700 mb-4">
          Custom kernels in Argon follow a modular design:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
          <li>Kernel functions are defined in CUDA C++</li>
          <li>Kernels are compiled and linked at build time</li>
          <li>Python bindings expose kernels to the framework</li>
          <li>Automatic memory management and synchronization</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Writing a Custom Kernel</h2>
        <p className="text-gray-700 mb-4">
          Example kernel for attention computation:
        </p>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-green-400 text-sm">
{`__global__ void attention_kernel(
    float* Q, float* K, float* V,
    float* output,
    int batch_size, int seq_len, int head_dim
) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx >= batch_size * seq_len * head_dim) return;
    
    // Kernel implementation
    // ...
}

// Python binding
PYBIND11_MODULE(attention_kernel, m) {
    m.def("attention", []() {
        // Call CUDA kernel
    });
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Kernel Optimization</h2>
        <p className="text-gray-700 mb-4">
          Best practices for kernel optimization:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
          <li>Use shared memory for data reuse</li>
          <li>Optimize memory access patterns</li>
          <li>Use tensor cores when available</li>
          <li>Minimize register usage</li>
          <li>Profile with Nsight Compute</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Building Kernels</h2>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-green-400 text-sm">
{`$ cd kernels
$ nvcc -O3 -arch=sm_80 attention_kernel.cu \\
    -o attention_kernel.so \\
    --shared`}
          </pre>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Testing Kernels</h2>
        <p className="text-gray-700 mb-4">
          Test your kernels with Argon's testing framework:
        </p>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-green-400 text-sm">
{`from argon.kernels import AttentionKernel
import torch

kernel = AttentionKernel()
Q = torch.randn(1, 128, 64).cuda()
K = torch.randn(1, 128, 64).cuda()
V = torch.randn(1, 128, 64).cuda()

output = kernel.forward(Q, K, V)
assert output.shape == (1, 128, 64)`}
          </pre>
        </div>
      </div>
    </div>
  )
}

