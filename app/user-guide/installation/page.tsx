export default function Installation() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Installation</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          Argon can be installed using pip, conda, or from source. Choose the method 
          that works best for your environment.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Prerequisites</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
          <li>Python 3.8 or higher</li>
          <li>CUDA 11.8 or higher (for GPU support)</li>
          <li>8GB+ RAM recommended</li>
          <li>NVIDIA GPU with compute capability 7.0+ (for custom kernels)</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Install with pip</h2>
        <p className="text-gray-700 mb-4">
          The easiest way to install Argon:
        </p>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <code className="text-green-400 text-sm">
            $ pip install argon
          </code>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Install with conda</h2>
        <p className="text-gray-700 mb-4">
          Install from conda-forge:
        </p>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <code className="text-green-400 text-sm">
            $ conda install -c conda-forge argon
          </code>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Install from Source</h2>
        <p className="text-gray-700 mb-4">
          For the latest features, install from source:
        </p>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-green-400 text-sm">
{`$ git clone https://github.com/yourusername/argon.git
$ cd argon
$ pip install -e .`}
          </pre>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Verify Installation</h2>
        <p className="text-gray-700 mb-4">
          Verify that Argon is installed correctly:
        </p>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-green-400 text-sm">
{`$ argon --version
argon version 1.0.0`}
          </pre>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Docker Installation</h2>
        <p className="text-gray-700 mb-4">
          Run Argon in a Docker container:
        </p>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-green-400 text-sm">
{`$ docker pull argon/argon:latest
$ docker run --gpus all -p 8000:8000 argon/argon:latest`}
          </pre>
        </div>
      </div>
    </div>
  )
}

