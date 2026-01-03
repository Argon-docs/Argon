export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Documentation
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/user-guide" className="text-gray-600 hover:text-gray-900 text-sm">
                  User Guide
                </a>
              </li>
              <li>
                <a href="/developer-guide" className="text-gray-600 hover:text-gray-900 text-sm">
                  Developer Guide
                </a>
              </li>
              <li>
                <a href="/api-reference" className="text-gray-600 hover:text-gray-900 text-sm">
                  API Reference
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/benchmarking" className="text-gray-600 hover:text-gray-900 text-sm">
                  Benchmarking
                </a>
              </li>
              <li>
                <a href="/community" className="text-gray-600 hover:text-gray-900 text-sm">
                  Community
                </a>
              </li>
              <li>
                <a href="https://github.com" className="text-gray-600 hover:text-gray-900 text-sm">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/license" className="text-gray-600 hover:text-gray-900 text-sm">
                  License
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-600 hover:text-gray-900 text-sm">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              About
            </h3>
            <p className="text-gray-600 text-sm">
              Argon is a fast and scalable distributed inference framework powered by custom kernels.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Argon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

