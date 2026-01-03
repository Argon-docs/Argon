export default function Benchmarking() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Benchmarking</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          Learn how to benchmark Argon's performance and compare it with other 
          inference frameworks. Performance metrics, benchmarking tools, and best practices.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Performance Metrics</h2>
        <p className="text-gray-700 mb-4">
          Key metrics to measure when benchmarking:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
          <li><strong>Throughput:</strong> Tokens per second (tokens/s)</li>
          <li><strong>Latency:</strong> Time to first token (TTFT) and time per token</li>
          <li><strong>Memory Usage:</strong> GPU and CPU memory consumption</li>
          <li><strong>Batch Processing:</strong> Requests per second (RPS)</li>
          <li><strong>Concurrent Requests:</strong> Maximum number of simultaneous requests</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Using the Benchmark Tool</h2>
        <p className="text-gray-700 mb-4">
          Argon includes a built-in benchmarking tool:
        </p>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-green-400 text-sm">
{`# Basic benchmark
argon benchmark --model meta-llama/Llama-2-7b-chat-hf

# With custom parameters
argon benchmark \\
  --model meta-llama/Llama-2-7b-chat-hf \\
  --num-prompts 1000 \\
  --request-rate 10 \\
  --max-tokens 256`}
          </pre>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Sample Results</h2>
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Llama-2-7B on A100 GPU</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Metric</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Value</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Throughput</td>
                  <td className="px-4 py-3 text-sm text-gray-600">245 tokens/s</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">TTFT</td>
                  <td className="px-4 py-3 text-sm text-gray-600">45ms</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">GPU Memory</td>
                  <td className="px-4 py-3 text-sm text-gray-600">13.2 GB</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">Max RPS</td>
                  <td className="px-4 py-3 text-sm text-gray-600">12.5 req/s</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Python Benchmarking</h2>
        <p className="text-gray-700 mb-4">
          Programmatic benchmarking with Python:
        </p>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-green-400 text-sm">
{`from argon.benchmark import benchmark

results = benchmark(
    model="meta-llama/Llama-2-7b-chat-hf",
    num_prompts=100,
    max_tokens=256,
    request_rate=10
)

print(f"Throughput: {results.throughput} tokens/s")
print(f"Average latency: {results.avg_latency}ms")
print(f"P95 latency: {results.p95_latency}ms")`}
          </pre>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Best Practices</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
          <li>Warm up the model before benchmarking to get accurate results</li>
          <li>Use representative prompts that match your use case</li>
          <li>Run multiple benchmark runs and average the results</li>
          <li>Monitor system resources during benchmarking</li>
          <li>Compare results under similar hardware configurations</li>
        </ul>
      </div>
    </div>
  )
}

