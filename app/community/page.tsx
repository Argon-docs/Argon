export default function Community() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Community</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          Join the Argon community! Get help, share your experiences, and contribute 
          to the project.
        </p>

        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">GitHub</h2>
            <p className="text-gray-700 mb-4">
              Star, fork, and contribute to Argon on GitHub. Report bugs, suggest features, 
              and submit pull requests.
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              Visit GitHub
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Discord</h2>
            <p className="text-gray-700 mb-4">
              Join our Discord server for real-time discussions, Q&A, and community support.
            </p>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              Join Discord
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Twitter/X</h2>
            <p className="text-gray-700 mb-4">
              Follow us on Twitter/X for the latest updates, announcements, and news.
            </p>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              Follow @Argon
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Stack Overflow</h2>
            <p className="text-gray-700 mb-4">
              Ask questions on Stack Overflow with the <code className="bg-gray-100 px-2 py-1 rounded">argon</code> tag.
            </p>
            <a
              href="https://stackoverflow.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              Ask Questions
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contributing</h2>
        <p className="text-gray-700 mb-4">
          We welcome contributions! Here's how you can help:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
          <li>Report bugs and suggest features on GitHub</li>
          <li>Submit pull requests with improvements</li>
          <li>Improve documentation</li>
          <li>Share your use cases and experiences</li>
          <li>Help answer questions in the community</li>
        </ul>

        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Code of Conduct</h3>
          <p className="text-gray-700">
            Argon is committed to providing a welcoming and inclusive environment. 
            Please read and follow our{' '}
            <a href="/code-of-conduct" className="text-blue-600 hover:text-blue-800 underline">
              Code of Conduct
            </a>
            {' '}when participating in the community.
          </p>
        </div>
      </div>
    </div>
  )
}

