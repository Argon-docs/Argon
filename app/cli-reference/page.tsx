export default function CLIReference() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">CLI Reference</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          Complete command-line interface reference for Argon.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">argon serve</h2>
        <div className="border border-gray-200 rounded-lg p-6 mb-8">
          <p className="text-gray-700 mb-4">Start an Argon inference server</p>
          
          <h4 className="font-semibold text-gray-900 mb-2">Usage</h4>
          <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
            <code className="text-green-400 text-sm">
              argon serve [OPTIONS]
            </code>
          </div>

          <h4 className="font-semibold text-gray-900 mb-2">Options</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Option</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">--model</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Model name or path (required)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">--host</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Host to bind to (default: 0.0.0.0)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">--port</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Port to bind to (default: 8000)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">--tensor-parallel-size</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Number of tensor parallel replicas (default: 1)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">--max-model-len</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Maximum model length (default: 2048)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">--gpu-memory-utilization</td>
                  <td className="px-4 py-3 text-sm text-gray-600">GPU memory utilization (default: 0.9)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 className="font-semibold text-gray-900 mb-2 mt-4">Examples</h4>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 text-sm">
{`# Basic usage
argon serve --model meta-llama/Llama-2-7b-chat-hf

# Custom port and host
argon serve --model meta-llama/Llama-2-7b-chat-hf \\
  --host 127.0.0.1 --port 8080

# Tensor parallelism
argon serve --model meta-llama/Llama-2-70b-chat-hf \\
  --tensor-parallel-size 4`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">argon benchmark</h2>
        <div className="border border-gray-200 rounded-lg p-6 mb-8">
          <p className="text-gray-700 mb-4">Benchmark model performance</p>
          
          <h4 className="font-semibold text-gray-900 mb-2">Usage</h4>
          <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
            <code className="text-green-400 text-sm">
              argon benchmark [OPTIONS]
            </code>
          </div>

          <h4 className="font-semibold text-gray-900 mb-2">Options</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Option</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">--model</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Model name or path (required)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">--num-prompts</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Number of prompts to test (default: 100)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">--request-rate</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Request rate (requests/second)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">argon convert</h2>
        <div className="border border-gray-200 rounded-lg p-6 mb-8">
          <p className="text-gray-700 mb-4">Convert models to Argon format</p>
          
          <h4 className="font-semibold text-gray-900 mb-2">Usage</h4>
          <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
            <code className="text-green-400 text-sm">
              argon convert [OPTIONS] INPUT_PATH OUTPUT_PATH
            </code>
          </div>

          <h4 className="font-semibold text-gray-900 mb-2">Example</h4>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <code className="text-green-400 text-sm">
              argon convert ./model.ckpt ./argon-model
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}

