export default function Architecture() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Architecture</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          Argon is built with a modular architecture that enables high-performance 
          distributed inference through custom kernels and efficient resource management.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Core Components</h2>
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <ul className="list-disc list-inside text-gray-700 space-y-3">
            <li><strong>Kernel Engine:</strong> Custom CUDA kernels for efficient computation</li>
            <li><strong>Request Router:</strong> Distributes requests across available workers</li>
            <li><strong>Model Loader:</strong> Loads and manages model weights</li>
            <li><strong>Scheduler:</strong> Manages request queuing and batching</li>
            <li><strong>Distributed Coordinator:</strong> Handles multi-node communication</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">System Architecture</h2>
        <div className="bg-gray-900 rounded-lg p-6 mb-8 overflow-x-auto">
          <pre className="text-green-400 text-sm">
{`┌─────────────────────────────────────────┐
│           API Layer (REST/gRPC)          │
└───────────────┬─────────────────────────┘
                │
┌───────────────▼─────────────────────────┐
│         Request Router                  │
└───────┬───────────────────┬─────────────┘
        │                   │
┌───────▼──────┐    ┌───────▼──────────┐
│   Scheduler  │    │ Distributed      │
│   (Batching) │    │ Coordinator      │
└───────┬──────┘    └───────┬──────────┘
        │                   │
┌───────▼───────────────────▼──────────┐
│         Kernel Engine                │
│    (Custom CUDA Kernels)             │
└───────┬──────────────────────────────┘
        │
┌───────▼──────────────────────────────┐
│      Model Loader & Cache            │
└──────────────────────────────────────┘`}
          </pre>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Custom Kernels</h2>
        <p className="text-gray-700 mb-4">
          Argon's performance comes from custom CUDA kernels optimized for inference:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
          <li>Flash Attention kernels for efficient attention computation</li>
          <li>Optimized matrix multiplication kernels</li>
          <li>Custom activation functions</li>
          <li>Memory-efficient kernel fusion</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Distributed Architecture</h2>
        <p className="text-gray-700 mb-4">
          Argon supports distributed inference across multiple nodes:
        </p>
        <div className="bg-gray-900 rounded-lg p-6 mb-8 overflow-x-auto">
          <pre className="text-green-400 text-sm">
{`Node 1                Node 2                Node 3
┌─────────┐          ┌─────────┐          ┌─────────┐
│ Worker  │◄────────►│ Worker  │◄────────►│ Worker  │
│   A     │          │   B     │          │   C     │
└────┬────┘          └────┬────┘          └────┬────┘
     │                    │                    │
     └────────────────────┼────────────────────┘
                          │
                    ┌─────▼─────┐
                    │ Coordinator│
                    │  (Leader)  │
                    └────────────┘`}
          </pre>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Memory Management</h2>
        <p className="text-gray-700 mb-4">
          Efficient memory management is crucial for performance:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
          <li>PagedAttention for efficient KV cache management</li>
          <li>Memory pooling to reduce fragmentation</li>
          <li>Automatic memory allocation and deallocation</li>
          <li>Support for CPU offloading when GPU memory is limited</li>
        </ul>
      </div>
    </div>
  )
}

