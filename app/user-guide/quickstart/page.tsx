export default function Quickstart() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Quickstart Guide</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          Get up and running with Argon in just a few minutes using the new configuration-based system. 
          Argon now supports a flexible, reusable architecture that makes it easy to work with different models and custom kernels.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
          <p className="text-blue-800">
            <strong>New in Argon:</strong> The configuration-based system makes it easy to switch models, 
            customize kernels, and scale your inference setup. The original CLI still works for backwards compatibility.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 1: Installation</h2>
        <p className="text-gray-700 mb-4">
          Install Argon using pip:
        </p>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <code className="text-green-400 text-sm">
            $ pip install argon
          </code>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 2: Create Configuration File</h2>
        <p className="text-gray-700 mb-4">
          Copy the example configuration file and customize it for your model:
        </p>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <code className="text-green-400 text-sm">
            $ cp config.example.yaml config.yaml
          </code>
        </div>
        <p className="text-gray-700 mb-4">
          Edit <code className="bg-gray-100 px-2 py-1 rounded">config.yaml</code> to specify your model path and settings. 
          See the <a href="/user-guide/configuration" className="text-blue-600 hover:text-blue-800 underline">Configuration Guide</a> for details.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 3: Test Your Configuration</h2>
        <p className="text-gray-700 mb-4">
          Validate your setup before running inference:
        </p>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <code className="text-green-400 text-sm">
            $ python3 test_inference.py --config config.yaml
          </code>
        </div>
        <p className="text-gray-700 mb-4">
          This will test your configuration, validate kernel availability, and provide recommendations. 
          See the <a href="/user-guide/testing" className="text-blue-600 hover:text-blue-800 underline">Testing Guide</a> for more information.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 4: Run Inference</h2>
        <p className="text-gray-700 mb-4">
          Run inference with your configured model:
        </p>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <code className="text-green-400 text-sm">
            $ python3 inference.py --config config.yaml --prompt "What is the capital of France?"
          </code>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Example Configuration</h2>
        <p className="text-gray-700 mb-4">
          Here's a minimal <code className="bg-gray-100 px-2 py-1 rounded">config.yaml</code> for LLaMA 7B:
        </p>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-green-400 text-sm">
{`model:
  path: "./models/llama-7b"
  tokenizer_path: "./models/llama-7b/tokenizer.model"

kernels:
  decode: "cuda"
  attention: "flash"
  embedding: "cuda"
  weight_loader: "cuda"

inference:
  max_seq_len: 2048
  device: "cuda"`}
          </pre>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Legacy Mode (Backwards Compatible)</h2>
        <p className="text-gray-700 mb-4">
          The original CLI interface still works for backwards compatibility:
        </p>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <code className="text-green-400 text-sm">
            $ argon serve --model meta-llama/Llama-2-7b-chat-hf
          </code>
        </div>
        <p className="text-gray-700 mb-4">
          However, we recommend using the new configuration-based approach for better flexibility and control.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Next Steps</h2>
        <p className="text-gray-700 mb-4">
          Now that you have Argon running, explore these guides:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
          <li><a href="/user-guide/configuration" className="text-blue-600 hover:text-blue-800 underline">Configuration File Format</a> - Detailed configuration reference</li>
          <li><a href="/user-guide/models" className="text-blue-600 hover:text-blue-800 underline">Using Different Models</a> - Switch between LLaMA, Mistral, and other models</li>
          <li><a href="/user-guide/testing" className="text-blue-600 hover:text-blue-800 underline">Testing and Validation</a> - Understand test_inference.py output</li>
          <li><a href="/user-guide/custom-kernels" className="text-blue-600 hover:text-blue-800 underline">Custom Kernels</a> - Add and use custom kernels</li>
          <li><a href="/user-guide/migration" className="text-blue-600 hover:text-blue-800 underline">Migration Guide</a> - Upgrade from legacy CLI</li>
        </ul>
      </div>
    </div>
  )
}

