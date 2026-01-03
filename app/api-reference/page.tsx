export default function APIReference() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">API Reference</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          Complete API reference for Argon's REST API and Python client.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">REST API</h2>
        
        <div className="border border-gray-200 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">POST /v1/completions</h3>
          <p className="text-gray-700 mb-4">Generate text completions</p>
          
          <h4 className="font-semibold text-gray-900 mb-2">Request Body</h4>
          <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
            <pre className="text-green-400 text-sm">
{`{
  "prompt": "string",
  "max_tokens": 100,
  "temperature": 0.7,
  "top_p": 1.0,
  "n": 1,
  "stream": false
}`}
            </pre>
          </div>

          <h4 className="font-semibold text-gray-900 mb-2">Response</h4>
          <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
            <pre className="text-green-400 text-sm">
{`{
  "id": "cmpl-123",
  "object": "text_completion",
  "created": 1677652288,
  "choices": [{
    "text": "The capital of France is Paris.",
    "index": 0,
    "finish_reason": "stop"
  }],
  "usage": {
    "prompt_tokens": 5,
    "completion_tokens": 7,
    "total_tokens": 12
  }
}`}
            </pre>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">POST /v1/chat/completions</h3>
          <p className="text-gray-700 mb-4">Generate chat completions</p>
          
          <h4 className="font-semibold text-gray-900 mb-2">Request Body</h4>
          <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
            <pre className="text-green-400 text-sm">
{`{
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Hello!"}
  ],
  "max_tokens": 100,
  "temperature": 0.7
}`}
            </pre>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">GET /v1/models</h3>
          <p className="text-gray-700 mb-4">List available models</p>
          
          <h4 className="font-semibold text-gray-900 mb-2">Response</h4>
          <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
            <pre className="text-green-400 text-sm">
{`{
  "data": [
    {
      "id": "meta-llama/Llama-2-7b-chat-hf",
      "object": "model",
      "created": 1677610602,
      "owned_by": "meta"
    }
  ]
}`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Python Client</h2>
        
        <div className="border border-gray-200 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">ArgonClient</h3>
          <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
            <pre className="text-green-400 text-sm">
{`from argon import ArgonClient

client = ArgonClient(base_url="http://localhost:8000")

# Generate completion
response = client.completions.create(
    prompt="What is the capital of France?",
    max_tokens=100
)

# Chat completion
response = client.chat.completions.create(
    messages=[
        {"role": "user", "content": "Hello!"}
    ]
)`}
            </pre>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">AsyncClient</h3>
          <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
            <pre className="text-green-400 text-sm">
{`from argon import AsyncArgonClient

async def main():
    client = AsyncArgonClient(base_url="http://localhost:8000")
    response = await client.completions.create(
        prompt="What is the capital of France?",
        max_tokens=100
    )
    print(response)

import asyncio
asyncio.run(main())`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

