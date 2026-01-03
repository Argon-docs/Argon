export default function Testing() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Testing and Validation</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          Argon includes <code className="bg-gray-100 px-2 py-1 rounded">test_inference.py</code> to validate your 
          configuration, test kernel availability, and ensure everything is set up correctly before running inference.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Running Tests</h2>
        <p className="text-gray-700 mb-4">
          Test your configuration with a single command:
        </p>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <code className="text-green-400 text-sm">
            $ python3 test_inference.py --config config.yaml
          </code>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What Gets Tested</h2>
        <p className="text-gray-700 mb-4">
          The test script validates the following:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
          <li><strong>Configuration Parsing:</strong> Validates YAML syntax and required fields</li>
          <li><strong>Model Loading:</strong> Checks if model files exist and can be loaded</li>
          <li><strong>Kernel Availability:</strong> Verifies specified kernels are available and loadable</li>
          <li><strong>Kernel Compatibility:</strong> Tests kernel initialization and basic functionality</li>
          <li><strong>Device Configuration:</strong> Validates GPU/CPU availability and compatibility</li>
          <li><strong>Memory Requirements:</strong> Estimates memory usage and checks availability</li>
          <li><strong>Architecture Validation:</strong> Verifies model architecture parameters</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Understanding Test Output</h2>
        <p className="text-gray-700 mb-4">
          Example output from a successful test:
        </p>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-green-400 text-sm">
{`$ python3 test_inference.py --config config.yaml

=== Argon Configuration Test ===

[✓] Configuration file loaded successfully
[✓] Model path exists: ./models/llama-7b
[✓] Tokenizer found: ./models/llama-7b/tokenizer.model
[✓] Decode kernel available: cuda
[✓] Attention kernel available: flash
[✓] Embedding kernel available: cuda
[✓] Weight loader kernel available: cuda
[✓] GPU available: CUDA (NVIDIA RTX 3090)
[✓] Model architecture validated
[✓] Estimated memory usage: 12.5 GB (within limits)

=== Recommendations ===
- Flash Attention kernel is available and recommended
- Model size fits in GPU memory
- Configuration looks good for inference

[✓] All tests passed! Configuration is ready for inference.`}
          </pre>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Error Output and Recommendations</h2>
        <p className="text-gray-700 mb-4">
          When issues are detected, the test script provides specific recommendations:
        </p>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-red-400 text-sm">
{`$ python3 test_inference.py --config config.yaml

=== Argon Configuration Test ===

[✓] Configuration file loaded successfully
[✗] Model path not found: ./models/llama-7b
[✗] Flash Attention kernel not available
[✓] CUDA kernel available as fallback
[!] GPU memory may be insufficient for max_seq_len=4096

=== Recommendations ===
- Update model.path in config.yaml to correct path
- Flash Attention requires GPU with compute capability 8.0+
  Using CUDA kernel instead (slower but compatible)
- Consider reducing max_seq_len to 2048 to save memory
- Or use a GPU with more VRAM

[✗] Configuration has issues. Please fix before running inference.`}
          </pre>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Test Output Sections</h2>
        <div className="space-y-4 mb-8">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Status Indicators</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li><code className="bg-gray-100 px-2 py-1 rounded">[✓]</code> - Test passed</li>
              <li><code className="bg-gray-100 px-2 py-1 rounded">[✗]</code> - Test failed (must fix)</li>
              <li><code className="bg-gray-100 px-2 py-1 rounded">[!]</code> - Warning (optional fix)</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Recommendations Section</h3>
            <p className="text-gray-700">
              Provides actionable suggestions for improving your configuration, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2">
              <li>Kernel alternatives if specified kernel unavailable</li>
              <li>Memory optimization suggestions</li>
              <li>Performance improvement recommendations</li>
              <li>Configuration corrections</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Verbose Mode</h2>
        <p className="text-gray-700 mb-4">
          Get detailed information about each test:
        </p>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <code className="text-green-400 text-sm">
            $ python3 test_inference.py --config config.yaml --verbose
          </code>
        </div>
        <p className="text-gray-700 mb-4">
          Verbose mode provides additional details about:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
          <li>Kernel loading process</li>
          <li>Model file structure</li>
          <li>Memory breakdown by component</li>
          <li>Performance estimates</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Testing Custom Kernels</h2>
        <p className="text-gray-700 mb-4">
          When using custom kernels, the test script validates:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Kernel file exists and is loadable</li>
          <li>Required interface functions are exported</li>
          <li>Kernel initializes successfully</li>
          <li>Basic functionality works</li>
        </ul>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-green-400 text-sm">
{`$ python3 test_inference.py --config config.yaml

[✓] Custom attention kernel loaded: ./custom_kernels/my_attention.so
[✓] Kernel interface validated
[✓] Kernel initialization successful
[✓] Test execution passed`}
          </pre>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Common Test Scenarios</h2>
        <div className="space-y-4 mb-8">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Before First Run</h3>
            <p className="text-gray-700">
              Always run tests before your first inference to catch configuration errors early.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">After Changing Models</h3>
            <p className="text-gray-700">
              Test when switching to a different model to verify paths and architecture parameters.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">After Adding Custom Kernels</h3>
            <p className="text-gray-700">
              Validate custom kernels are properly integrated and functional.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance Tuning</h3>
            <p className="text-gray-700">
              Use test output to identify bottlenecks and optimization opportunities.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Best Practices</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
          <li>Run tests after any configuration changes</li>
          <li>Review recommendations even if tests pass</li>
          <li>Use verbose mode when troubleshooting issues</li>
          <li>Keep test output for debugging reference</li>
          <li>Test on the same hardware you'll use for inference</li>
        </ul>

        <div className="bg-green-50 border-l-4 border-green-500 p-4">
          <p className="text-green-800">
            <strong>Tip:</strong> The test script is designed to be non-destructive and fast. 
            It doesn't load the full model into memory, making it safe to run frequently.
          </p>
        </div>
      </div>
    </div>
  )
}

