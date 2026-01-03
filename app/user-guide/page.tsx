import Link from 'next/link'

export default function UserGuide() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">User Guide</h1>
      
      <div className="prose prose-lg max-w-none mb-12">
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          This guide will help you get started with Argon, from installation to deploying 
          your first inference server. Whether you're running models locally or scaling 
          across distributed systems, this guide has you covered.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-12">
        <Link href="/user-guide/quickstart" className="block p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Quickstart</h2>
          <p className="text-gray-600">Get up and running with Argon's new configuration system</p>
        </Link>
        
        <Link href="/user-guide/installation" className="block p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Installation</h2>
          <p className="text-gray-600">Install Argon on your system</p>
        </Link>
        
        <Link href="/user-guide/configuration" className="block p-6 border border-blue-200 bg-blue-50 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Configuration File Format</h2>
          <p className="text-gray-600">Complete reference for config.yaml structure</p>
        </Link>
        
        <Link href="/user-guide/models" className="block p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Using Different Models</h2>
          <p className="text-gray-600">Switch between LLaMA, Mistral, and other models</p>
        </Link>
        
        <Link href="/user-guide/custom-kernels" className="block p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Custom Kernels</h2>
          <p className="text-gray-600">Implement and use custom kernels via configuration</p>
        </Link>
        
        <Link href="/user-guide/testing" className="block p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Testing and Validation</h2>
          <p className="text-gray-600">Validate configurations with test_inference.py</p>
        </Link>
        
        <Link href="/user-guide/migration" className="block p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Migration Guide</h2>
          <p className="text-gray-600">Upgrade from legacy CLI to configuration-based system</p>
        </Link>
        
        <Link href="/user-guide/serving" className="block p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Serving</h2>
          <p className="text-gray-600">Deploy and serve your models</p>
        </Link>
        
        <Link href="/user-guide/distributed" className="block p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Distributed Inference</h2>
          <p className="text-gray-600">Scale across multiple nodes</p>
        </Link>
        
        <Link href="/user-guide/performance" className="block p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Performance Tuning</h2>
          <p className="text-gray-600">Optimize your inference performance</p>
        </Link>
      </div>

      <div className="bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Need Help?</h2>
        <p className="text-gray-700 mb-4">
          If you encounter any issues or have questions, check out our{' '}
          <Link href="/community" className="text-blue-600 hover:text-blue-800 underline">
            community resources
          </Link>
          {' '}or open an issue on GitHub.
        </p>
      </div>
    </div>
  )
}

