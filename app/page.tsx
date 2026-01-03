import Link from 'next/link'

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Welcome Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-8">Welcome to Argon</h1>
        
        {/* Large Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-5xl">A</span>
            </div>
            <span className="text-6xl font-bold text-gray-900">Argon</span>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-2xl text-gray-700 mb-8">
          Easy, fast, and scalable distributed inference for everyone
        </p>

        {/* Stats */}
        <div className="flex justify-center space-x-8 mb-12">
          <div className="flex items-center space-x-2 text-gray-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="font-medium">Star 12,542</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="font-medium">Watch 348</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.527 2.341 1.086 2.91.832.092-.647.35-1.086.636-1.336-2.22-.252-4.555-1.11-4.555-4.95 0-1.092.39-1.985 1.029-2.685-.103-.252-.446-1.27.098-2.647 0 0 .84-.27 2.75 1.024A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.024 2.747-1.024.546 1.377.202 2.395.1 2.648.64.7 1.028 1.593 1.028 2.685 0 3.84-2.339 4.698-4.566 4.943.359.308.678.918.678 1.852 0 1.336-.012 2.414-.012 2.743 0 .265.18.574.688.482C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Fork 3,245</span>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="prose prose-lg max-w-none mb-12">
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Argon is a fast and easy-to-use framework for distributed LLM inference and serving, 
          powered entirely by custom kernels for maximum performance.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Built from the ground up with performance in mind, Argon provides a scalable solution 
          for running large language models across distributed systems with minimal overhead.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">✨ New Configuration System</h3>
          <p className="text-gray-700 mb-2">
            Argon now features a flexible, reusable configuration system that makes it easy to:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
            <li>Switch between models (LLaMA, Mistral, CodeLlama, and more) with simple config changes</li>
            <li>Specify custom kernels via YAML configuration</li>
            <li>Test and validate setups before running inference</li>
            <li>Maintain backwards compatibility with the original CLI</li>
          </ul>
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-gray-50 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting Started</h2>
        <p className="text-gray-700 mb-6">
          Where to get started with Argon depends on the type of user. If you are looking to:
        </p>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">•</span>
            <div>
              <span>Run open-source models on Argon, we recommend starting with the </span>
              <Link href="/user-guide/quickstart" className="text-blue-600 hover:text-blue-800 underline">
                Quickstart Guide
              </Link>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">•</span>
            <div>
              <span>Build applications with Argon, we recommend starting with the </span>
              <Link href="/user-guide" className="text-blue-600 hover:text-blue-800 underline">
                User Guide
              </Link>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">•</span>
            <div>
              <span>Build Argon or contribute to the project, we recommend starting with the </span>
              <Link href="/developer-guide" className="text-blue-600 hover:text-blue-800 underline">
                Developer Guide
              </Link>
            </div>
          </li>
        </ul>
      </div>

      {/* Development Information */}
      <div className="bg-blue-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Development Information</h2>
        <p className="text-gray-700 mb-6">
          For information about the development of Argon, see:
        </p>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">•</span>
            <Link href="/roadmap" className="text-blue-600 hover:text-blue-800 underline">
              Roadmap
            </Link>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">•</span>
            <Link href="/releases" className="text-blue-600 hover:text-blue-800 underline">
              Releases
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

