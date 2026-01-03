export default function Models() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Using Different Models</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          Argon's configuration-based system makes it easy to switch between different models. 
          This guide shows you how to configure Argon for various LLaMA-like architecture models.
        </p>

        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-8">
          <p className="text-green-800">
            <strong>Scalability:</strong> Argon supports any model with a LLaMA-like architecture, 
            including LLaMA, Mistral, CodeLlama, and custom models.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step-by-Step: Switching Models</h2>
        <p className="text-gray-700 mb-4">
          Follow these steps to switch from one model to another (e.g., LLaMA to Mistral):
        </p>

        <div className="space-y-6 mb-8">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 1: Update Model Path</h3>
            <p className="text-gray-700 mb-4">
              Edit your <code className="bg-gray-100 px-2 py-1 rounded">config.yaml</code> and update the model path:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
{`model:
  path: "./models/mistral-7b"  # Changed from "./models/llama-7b"
  tokenizer_path: "./models/mistral-7b/tokenizer.model"`}
              </pre>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 2: Update Architecture Parameters (Optional)</h3>
            <p className="text-gray-700 mb-4">
              Update model-specific parameters. Argon can auto-detect these, but specifying them explicitly is recommended:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
{`model:
  # ... path and tokenizer ...
  num_key_value_heads: 8        # Mistral uses GQA (Grouped Query Attention)
  max_position_embeddings: 8192 # Mistral supports longer context
  sliding_window: 4096          # Mistral-specific parameter`}
              </pre>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 3: Adjust Inference Settings</h3>
            <p className="text-gray-700 mb-4">
              Update <code className="bg-gray-100 px-2 py-1 rounded">max_seq_len</code> to match your model's capabilities:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
{`inference:
  max_seq_len: 4096  # Mistral supports up to 8192, but 4096 is more memory-efficient
  device: "cuda"`}
              </pre>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 4: Test Configuration</h3>
            <p className="text-gray-700 mb-4">
              Validate your configuration before running inference:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <code className="text-green-400 text-sm">
                $ python3 test_inference.py --config config.yaml
              </code>
            </div>
            <p className="text-gray-700 mt-4">
              This will verify kernel compatibility, model loading, and provide recommendations.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 5: Run Inference</h3>
            <p className="text-gray-700 mb-4">
              Once validated, run inference with your new model:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <code className="text-green-400 text-sm">
                $ python3 inference.py --config config.yaml --prompt "Your prompt here"
              </code>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Model Configurations</h2>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">LLaMA 7B</h3>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-green-400 text-sm">
{`model:
  path: "./models/llama-7b"
  tokenizer_path: "./models/llama-7b/tokenizer.model"
  vocab_size: 32000
  hidden_size: 4096
  intermediate_size: 11008
  num_hidden_layers: 32
  num_attention_heads: 32
  num_key_value_heads: 32
  max_position_embeddings: 4096

inference:
  max_seq_len: 2048`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Mistral 7B</h3>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-green-400 text-sm">
{`model:
  path: "./models/mistral-7b"
  tokenizer_path: "./models/mistral-7b/tokenizer.model"
  vocab_size: 32000
  hidden_size: 4096
  intermediate_size: 14336
  num_hidden_layers: 32
  num_attention_heads: 32
  num_key_value_heads: 8        # GQA
  max_position_embeddings: 8192
  sliding_window: 4096

inference:
  max_seq_len: 4096`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">CodeLlama 7B</h3>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-green-400 text-sm">
{`model:
  path: "./models/codellama-7b"
  tokenizer_path: "./models/codellama-7b/tokenizer.model"
  vocab_size: 32016
  hidden_size: 4096
  intermediate_size: 11008
  num_hidden_layers: 32
  num_attention_heads: 32
  num_key_value_heads: 32
  max_position_embeddings: 16384  # CodeLlama supports longer context

inference:
  max_seq_len: 8192`}
          </pre>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Key Differences Between Models</h2>
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Model</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Key Features</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Max Context</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">LLaMA</td>
                <td className="px-4 py-3 text-sm text-gray-600">Standard MHA (Multi-Head Attention)</td>
                <td className="px-4 py-3 text-sm text-gray-600">4096 tokens</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">Mistral</td>
                <td className="px-4 py-3 text-sm text-gray-600">GQA, Sliding Window Attention</td>
                <td className="px-4 py-3 text-sm text-gray-600">8192 tokens</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">CodeLlama</td>
                <td className="px-4 py-3 text-sm text-gray-600">Extended context, code-focused</td>
                <td className="px-4 py-3 text-sm text-gray-600">16384 tokens</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Using Multiple Configurations</h2>
        <p className="text-gray-700 mb-4">
          You can maintain multiple configuration files for different models:
        </p>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-green-400 text-sm">
{`config/
  llama-7b.yaml
  mistral-7b.yaml
  codellama-7b.yaml

# Use different configs
python3 inference.py --config config/llama-7b.yaml --prompt "..."
python3 inference.py --config config/mistral-7b.yaml --prompt "..."`}
          </pre>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Troubleshooting</h2>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-8">
          <h3 className="text-lg font-semibold text-yellow-900 mb-2">Common Issues</h3>
          <ul className="list-disc list-inside text-yellow-800 space-y-2">
            <li><strong>Model not found:</strong> Verify the path in config.yaml points to the correct directory</li>
            <li><strong>Out of memory:</strong> Reduce max_seq_len or use a smaller model variant</li>
            <li><strong>Kernel incompatibility:</strong> Run test_inference.py to check kernel availability</li>
            <li><strong>Wrong architecture:</strong> Ensure architecture parameters match your model</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

