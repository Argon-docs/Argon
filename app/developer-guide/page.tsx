import Link from 'next/link'

export default function DeveloperGuide() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Developer Guide</h1>
      
      <div className="prose prose-lg max-w-none mb-12">
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          This guide is for developers who want to contribute to Argon, build custom 
          kernels, or extend the framework. Learn about the architecture, build process, 
          and development workflow.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-12">
        <Link href="/developer-guide/architecture" className="block p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Architecture</h2>
          <p className="text-gray-600">Understand Argon's architecture and design</p>
        </Link>
        
        <Link href="/developer-guide/building" className="block p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Building from Source</h2>
          <p className="text-gray-600">Build Argon from source code</p>
        </Link>
        
        <Link href="/developer-guide/kernels" className="block p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Custom Kernels</h2>
          <p className="text-gray-600">Develop custom kernels for Argon</p>
        </Link>
        
        <Link href="/developer-guide/contributing" className="block p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Contributing</h2>
          <p className="text-gray-600">Contribute to the Argon project</p>
        </Link>
        
        <Link href="/developer-guide/testing" className="block p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Testing</h2>
          <p className="text-gray-600">Write and run tests for Argon</p>
        </Link>
        
        <Link href="/developer-guide/debugging" className="block p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Debugging</h2>
          <p className="text-gray-600">Debug and troubleshoot issues</p>
        </Link>
      </div>

      <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Getting Started</h2>
        <p className="text-gray-700 mb-4">
          New to Argon development? Start with the{' '}
          <Link href="/developer-guide/architecture" className="text-blue-600 hover:text-blue-800 underline">
            Architecture Guide
          </Link>
          {' '}to understand how Argon works under the hood.
        </p>
      </div>
    </div>
  )
}

