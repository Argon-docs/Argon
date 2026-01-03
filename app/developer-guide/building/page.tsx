export default function Building() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Building from Source</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          Build Argon from source to get the latest features, contribute to development, 
          or customize the framework for your needs.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Prerequisites</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
          <li>Python 3.8+</li>
          <li>CUDA 11.8+ and cuDNN</li>
          <li>CMake 3.18+</li>
          <li>Git</li>
          <li>NVIDIA GPU with compute capability 7.0+</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Clone the Repository</h2>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <code className="text-green-400 text-sm">
            $ git clone https://github.com/yourusername/argon.git
            $ cd argon
          </code>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Build Custom Kernels</h2>
        <p className="text-gray-700 mb-4">
          Argon's custom kernels are built using CUDA:
        </p>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-green-400 text-sm">
{`$ cd kernels
$ mkdir build && cd build
$ cmake ..
$ make -j$(nproc)`}
          </pre>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Install Python Package</h2>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-green-400 text-sm">
{`$ cd ..
$ pip install -e ".[dev]"
$ pip install -e .`}
          </pre>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Verify Build</h2>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <pre className="text-green-400 text-sm">
{`$ python -c "import argon; print(argon.__version__)"
$ argon --version`}
          </pre>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Development Mode</h2>
        <p className="text-gray-700 mb-4">
          Install in development mode with all dependencies:
        </p>
        <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
          <code className="text-green-400 text-sm">
            $ pip install -e ".[dev,test]"
          </code>
        </div>
      </div>
    </div>
  )
}

