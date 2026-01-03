export default function Quickstart() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Quickstart Guide</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          This guide will get you up and running with Argon in just a few minutes. 
          We'll install Argon and run your first inference server.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Installation</h2>
        <p className="text-gray-700 mb-4">
          Install Argon using pip:
        </p>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <code className="text-green-400 text-sm">
            $ pip install argon
          </code>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Basic Usage</h2>
        <p className="text-gray-700 mb-4">
          Start an inference server with a single command:
        </p>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <code className="text-green-400 text-sm">
            $ argon serve --model meta-llama/Llama-2-7b-chat-hf
          </code>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Python Client</h2>
        <p className="text-gray-700 mb-4">
          Use Argon from Python:
        </p>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-green-400 text-sm">
{`from argon import ArgonClient

client = ArgonClient("http://localhost:8000")

prompt = "What is the capital of France?"
response = client.generate(prompt)
print(response)`}
          </pre>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">REST API</h2>
        <p className="text-gray-700 mb-4">
          Use the REST API directly:
        </p>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-green-400 text-sm">
{`curl http://localhost:8000/v1/completions \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "What is the capital of France?",
    "max_tokens": 100
  }'`}
          </pre>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Next Steps</h2>
        <p className="text-gray-700 mb-4">
          Now that you have Argon running, check out:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
          <li><a href="/user-guide/configuration" className="text-blue-600 hover:text-blue-800 underline">Configuration Guide</a> - Learn how to configure Argon</li>
          <li><a href="/user-guide/serving" className="text-blue-600 hover:text-blue-800 underline">Serving Guide</a> - Deploy models in production</li>
          <li><a href="/api-reference" className="text-blue-600 hover:text-blue-800 underline">API Reference</a> - Full API documentation</li>
        </ul>
      </div>
    </div>
  )
}

