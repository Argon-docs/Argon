export default function Migration() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Migration Guide</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          This guide helps you migrate from the legacy CLI interface to the new configuration-based system. 
          The new system provides better flexibility, reusability, and scalability while maintaining backwards compatibility.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
          <p className="text-blue-800">
            <strong>Backwards Compatible:</strong> The original CLI still works! You can migrate at your own pace, 
            or continue using the legacy interface if it meets your needs.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What Changed</h2>
        <p className="text-gray-700 mb-4">
          Argon has been enhanced with a new configuration system:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
          <li><strong>Configuration Files:</strong> YAML-based configuration for models, kernels, and settings</li>
          <li><strong>Dynamic Kernel Loading:</strong> Specify kernels in config.yaml instead of hardcoding</li>
          <li><strong>Testing Tool:</strong> New test_inference.py script for validation</li>
          <li><strong>Improved Flexibility:</strong> Easy model switching and kernel customization</li>
          <li><strong>Better Organization:</strong> Separate configuration from code</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Legacy CLI (Still Supported)</h2>
        <p className="text-gray-700 mb-4">
          The original command-line interface continues to work:
        </p>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <code className="text-green-400 text-sm">
            $ argon serve --model meta-llama/Llama-2-7b-chat-hf
          </code>
        </div>
        <p className="text-gray-700 mb-8">
          This legacy mode uses default settings and doesn't require a configuration file. 
          However, the new configuration system offers more control and flexibility.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Migration Steps</h2>
        <div className="space-y-6 mb-8">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 1: Create Configuration File</h3>
            <p className="text-gray-700 mb-4">
              Start by copying the example configuration:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <code className="text-green-400 text-sm">
                $ cp config.example.yaml config.yaml
              </code>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 2: Configure Your Model</h3>
            <p className="text-gray-700 mb-4">
              Edit <code className="bg-gray-100 px-2 py-1 rounded">config.yaml</code> with your model settings. 
              If you were using:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <code className="text-green-400 text-sm">
                $ argon serve --model ./models/llama-7b
              </code>
            </div>
            <p className="text-gray-700 mt-4 mb-4">
              Set in config.yaml:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
{`model:
  path: "./models/llama-7b"
  tokenizer_path: "./models/llama-7b/tokenizer.model"`}
              </pre>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 3: Test Configuration</h3>
            <p className="text-gray-700 mb-4">
              Validate your configuration:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <code className="text-green-400 text-sm">
                $ python3 test_inference.py --config config.yaml
              </code>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 4: Update Your Scripts</h3>
            <p className="text-gray-700 mb-4">
              Replace CLI calls with configuration-based calls:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-gray-700 font-semibold mb-2">Before (Legacy):</p>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <code className="text-green-400 text-sm">
                  $ argon serve --model ./models/llama-7b --port 8000
                </code>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 font-semibold mb-2">After (New):</p>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <code className="text-green-400 text-sm">
                  $ python3 inference.py --config config.yaml --prompt "Your prompt"
                </code>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Migration Checklist</h2>
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <input type="checkbox" className="mt-1 mr-3" disabled checked />
              <span>Copy config.example.yaml to config.yaml</span>
            </li>
            <li className="flex items-start">
              <input type="checkbox" className="mt-1 mr-3" disabled />
              <span>Update model.path with your model directory</span>
            </li>
            <li className="flex items-start">
              <input type="checkbox" className="mt-1 mr-3" disabled />
              <span>Set tokenizer_path</span>
            </li>
            <li className="flex items-start">
              <input type="checkbox" className="mt-1 mr-3" disabled />
              <span>Configure kernel preferences (optional)</span>
            </li>
            <li className="flex items-start">
              <input type="checkbox" className="mt-1 mr-3" disabled />
              <span>Set inference.max_seq_len and device</span>
            </li>
            <li className="flex items-start">
              <input type="checkbox" className="mt-1 mr-3" disabled />
              <span>Run test_inference.py to validate</span>
            </li>
            <li className="flex items-start">
              <input type="checkbox" className="mt-1 mr-3" disabled />
              <span>Update scripts/automation to use new interface</span>
            </li>
            <li className="flex items-start">
              <input type="checkbox" className="mt-1 mr-3" disabled />
              <span>Test inference with new configuration</span>
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Benefits of Migration</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Scalability</h3>
            <p className="text-gray-700">
              Supports any LLaMA-like architecture model with simple configuration changes.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Reusability</h3>
            <p className="text-gray-700">
              Easy to add custom kernels and support new models without code changes.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">User-Friendly</h3>
            <p className="text-gray-700">
              Configuration-based approach is more intuitive and maintainable.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Future-Ready</h3>
            <p className="text-gray-700">
              Architecture supports multi-GPU inference (coming soon).
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Backwards Compatibility Notes</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
          <li>The legacy CLI interface remains fully functional</li>
          <li>No breaking changes to existing functionality</li>
          <li>You can use both interfaces in the same codebase</li>
          <li>Migration is optional and can be done gradually</li>
          <li>Legacy mode uses default kernels and settings</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Common Migration Scenarios</h2>
        <div className="space-y-4 mb-8">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Single Model Setup</h3>
            <p className="text-gray-700 mb-2">
              If you only use one model, migration is straightforward - just create one config.yaml.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Multiple Models</h3>
            <p className="text-gray-700 mb-2">
              Create separate config files (llama.yaml, mistral.yaml) and switch between them.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Kernels</h3>
            <p className="text-gray-700 mb-2">
              The new system makes it much easier to use custom kernels via configuration.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Automation/Scripts</h3>
            <p className="text-gray-700 mb-2">
              Update scripts to use the new interface while keeping legacy mode as fallback.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Getting Help</h2>
        <p className="text-gray-700 mb-4">
          If you encounter issues during migration:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
          <li>Run <code className="bg-gray-100 px-2 py-1 rounded">test_inference.py</code> to diagnose configuration issues</li>
          <li>Check the <a href="/user-guide/configuration" className="text-blue-600 hover:text-blue-800 underline">Configuration Guide</a> for detailed reference</li>
          <li>Review <a href="/user-guide/testing" className="text-blue-600 hover:text-blue-800 underline">Testing Guide</a> for validation help</li>
          <li>Open an issue on GitHub or ask in the community</li>
        </ul>

        <div className="bg-green-50 border-l-4 border-green-500 p-4">
          <p className="text-green-800">
            <strong>Remember:</strong> You can continue using the legacy CLI while learning the new system. 
            Take your time and migrate when it makes sense for your workflow.
          </p>
        </div>
      </div>
    </div>
  )
}

