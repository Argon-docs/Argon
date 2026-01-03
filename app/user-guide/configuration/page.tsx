export default function Configuration() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Configuration File Format</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          Argon uses YAML-based configuration files to define models, kernels, and inference settings. 
          This provides a flexible, reusable system that makes it easy to switch models and customize behavior.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Configuration Structure</h2>
        <p className="text-gray-700 mb-4">
          The <code className="bg-gray-100 px-2 py-1 rounded">config.yaml</code> file consists of three main sections:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
          <li><strong>model:</strong> Model path, tokenizer settings, and architecture parameters</li>
          <li><strong>kernels:</strong> Kernel implementations for different operations</li>
          <li><strong>inference:</strong> Inference settings, device configuration, and default parameters</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Complete Configuration Example</h2>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-green-400 text-sm">
{`# Argon Configuration File
# Example for LLaMA 7B

model:
  # Path to model directory containing model files
  path: "./models/llama-7b"
  
  # Tokenizer configuration
  tokenizer_path: "./models/llama-7b/tokenizer.model"
  
  # Model architecture parameters (optional, auto-detected)
  vocab_size: 32000
  hidden_size: 4096
  intermediate_size: 11008
  num_hidden_layers: 32
  num_attention_heads: 32
  num_key_value_heads: 32
  hidden_act: "silu"
  max_position_embeddings: 4096
  initializer_range: 0.02
  rms_norm_eps: 1e-6
  use_cache: true
  pad_token_id: null
  bos_token_id: 1
  eos_token_id: 2
  pretraining_tp: 1
  tie_word_embeddings: false
  rope_theta: 10000.0

kernels:
  # Kernel implementations
  # Options: "cuda", "flash", "triton", or path to custom kernel
  decode: "cuda"
  attention: "flash"      # Flash Attention for efficiency
  embedding: "cuda"
  weight_loader: "cuda"

inference:
  # Maximum sequence length
  max_seq_len: 2048
  
  # Device configuration
  device: "cuda"          # "cuda" or "cpu"
  
  # Default inference parameters
  temperature: 0.7
  top_p: 0.9
  top_k: 50
  max_tokens: 512
  repetition_penalty: 1.1`}
          </pre>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Model Section</h2>
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Required Fields</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li><code className="bg-gray-200 px-2 py-1 rounded">path</code> - Path to model directory</li>
            <li><code className="bg-gray-200 px-2 py-1 rounded">tokenizer_path</code> - Path to tokenizer file</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-6">Optional Fields</h3>
          <p className="text-gray-700 mb-4">
            Architecture parameters are optional and will be auto-detected from the model if not specified. 
            You can override them for fine-tuning or custom configurations.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Kernels Section</h2>
        <p className="text-gray-700 mb-4">
          Specify which kernel implementations to use for different operations:
        </p>
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kernel</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Options</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">decode</td>
                <td className="px-4 py-3 text-sm text-gray-600">"cuda", "triton", custom path</td>
                <td className="px-4 py-3 text-sm text-gray-600">Token decoding kernel</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">attention</td>
                <td className="px-4 py-3 text-sm text-gray-600">"cuda", "flash", custom path</td>
                <td className="px-4 py-3 text-sm text-gray-600">Attention computation (Flash recommended)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">embedding</td>
                <td className="px-4 py-3 text-sm text-gray-600">"cuda", custom path</td>
                <td className="px-4 py-3 text-sm text-gray-600">Embedding layer kernel</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">weight_loader</td>
                <td className="px-4 py-3 text-sm text-gray-600">"cuda", custom path</td>
                <td className="px-4 py-3 text-sm text-gray-600">Model weight loading kernel</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Inference Section</h2>
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Required Fields</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li><code className="bg-gray-200 px-2 py-1 rounded">max_seq_len</code> - Maximum sequence length</li>
            <li><code className="bg-gray-200 px-2 py-1 rounded">device</code> - "cuda" or "cpu"</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-6">Default Parameters</h3>
          <p className="text-gray-700 mb-4">
            These parameters can be overridden via command-line arguments when running inference.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Mistral Configuration Example</h2>
        <p className="text-gray-700 mb-4">
          Example configuration for Mistral 7B (different architecture parameters):
        </p>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-green-400 text-sm">
{`model:
  path: "./models/mistral-7b"
  tokenizer_path: "./models/mistral-7b/tokenizer.model"
  
  # Mistral-specific parameters
  vocab_size: 32000
  hidden_size: 4096
  intermediate_size: 14336
  num_hidden_layers: 32
  num_attention_heads: 32
  num_key_value_heads: 8        # GQA (Grouped Query Attention)
  hidden_act: "silu"
  max_position_embeddings: 8192
  rope_theta: 10000.0
  sliding_window: 4096          # Mistral sliding window

kernels:
  decode: "cuda"
  attention: "flash"
  embedding: "cuda"
  weight_loader: "cuda"

inference:
  max_seq_len: 4096             # Mistral supports longer sequences
  device: "cuda"
  temperature: 0.7
  top_p: 0.9`}
          </pre>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Custom Kernel Paths</h2>
        <p className="text-gray-700 mb-4">
          To use custom kernels, specify the path to the kernel module:
        </p>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-green-400 text-sm">
{`kernels:
  decode: "./custom_kernels/my_decode_kernel.so"
  attention: "./custom_kernels/optimized_attention.so"
  embedding: "cuda"  # Use default for embedding`}
          </pre>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Overriding Configuration via CLI</h2>
        <p className="text-gray-700 mb-4">
          You can override configuration values via command-line arguments:
        </p>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-green-400 text-sm">
{`# Override prompt and temperature
python3 inference.py \\
  --config config.yaml \\
  --prompt "Your prompt here" \\
  --temperature 0.9 \\
  --max-tokens 1024

# Override device
python3 inference.py \\
  --config config.yaml \\
  --device cpu \\
  --prompt "Your prompt"`}
          </pre>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Best Practices</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
          <li>Use absolute paths for model directories to avoid confusion</li>
          <li>Keep a backup of your working configuration</li>
          <li>Test configurations with <code className="bg-gray-100 px-2 py-1 rounded">test_inference.py</code> before running inference</li>
          <li>Use Flash Attention kernel for better performance on supported GPUs</li>
          <li>Set <code className="bg-gray-100 px-2 py-1 rounded">max_seq_len</code> based on your model's training context length</li>
        </ul>
      </div>
    </div>
  )
}

