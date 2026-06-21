import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <Link 
          to="/" 
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6"
        >
          ← Back to MeetingDNA
        </Link>
        <div className="text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-8 space-y-8">
        
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Your Privacy Matters
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            MeetingDNA is an AI-powered meeting agent that transforms meeting transcripts into fully processed work artifacts. 
            We take your privacy seriously and are committed to protecting your data.
          </p>
        </section>

        {/* What MeetingDNA Does */}
        <section className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-300 mb-4">
            What MeetingDNA Does
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            After a meeting, MeetingDNA automatically:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 text-xl">✓</span>
              <span className="text-gray-700 dark:text-gray-300">
                <strong className="text-gray-900 dark:text-white">Extracts decisions</strong> made during the meeting
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 text-xl">✓</span>
              <span className="text-gray-700 dark:text-gray-300">
                <strong className="text-gray-900 dark:text-white">Identifies tasks</strong> and assigns them to the right people with deadlines
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 text-xl">✓</span>
              <span className="text-gray-700 dark:text-gray-300">
                <strong className="text-gray-900 dark:text-white">Generates personalized follow-up emails</strong> for each assignee
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 text-xl">✓</span>
              <span className="text-gray-700 dark:text-gray-300">
                <strong className="text-gray-900 dark:text-white">Tracks task completion</strong> and sends accountability nudges for overdue items
              </span>
            </li>
          </ul>
          <div className="mt-4 p-4 bg-blue-100 dark:bg-blue-800/30 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
              💡 Unlike tools that only transcribe, MeetingDNA acts. It turns a 1-hour meeting into a 
              fully processed work artifact in minutes — without any manual input.
            </p>
          </div>
        </section>

        {/* Information We Collect */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Information We Collect
          </h3>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Meeting Transcripts</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                The meeting text you paste or upload is sent to our AI service for analysis. 
                Transcripts are stored securely in your account.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Account Information</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                We collect your name and email address when you create an account to personalize your experience.
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Usage Data</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                We collect anonymized data about how you use MeetingDNA to improve the service.
              </p>
            </div>
          </div>
        </section>

        {/* How We Use Your Data */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            How We Use Your Data
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-green-500">•</span>
              <span>To analyze your meetings and extract structured data</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500">•</span>
              <span>To generate personalized follow-up emails</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500">•</span>
              <span>To track tasks and send accountability nudges</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500">•</span>
              <span>To improve our AI models and user experience</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500">•</span>
              <span>To provide you with a personalized dashboard and history</span>
            </li>
          </ul>
        </section>

        {/* Data Security */}
        <section className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            🔐 Data Security
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Encryption</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All data is encrypted in transit (SSL/TLS) and at rest.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Authentication</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Each user has private, secure access to their own meetings.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Data Isolation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your data is isolated from other users' data.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Secure Storage</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Meeting data is stored in MongoDB with access controls.
              </p>
            </div>
          </div>
        </section>

        {/* AI Processing */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            🤖 AI Processing
          </h3>
          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <p>
              MeetingDNA uses Qwen, a large language model, to process your meeting transcripts. 
              This processing includes:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400 ml-4">
              <li>Extracting decisions, tasks, and open questions</li>
              <li>Parsing dates and deadlines</li>
              <li>Generating personalized follow-up emails</li>
              <li>Creating nudge emails for overdue tasks</li>
            </ul>
            <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                ⚠️ Your data is processed by Qwen's API. We do not use your data to train their models.
              </p>
            </div>
          </div>
        </section>

        {/* Your Rights */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Your Rights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
              <h4 className="font-semibold text-gray-900 dark:text-white">View</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You can view all your meetings in your history.
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
              <h4 className="font-semibold text-gray-900 dark:text-white">Delete</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You can delete your account and all associated data.
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
              <h4 className="font-semibold text-gray-900 dark:text-white">Export</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You can export your meeting data and emails.
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
              <h4 className="font-semibold text-gray-900 dark:text-white">Update</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You can update your account information anytime.
              </p>
            </div>
          </div>
        </section>

        {/* Data Retention */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Data Retention
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Your meeting data is retained until you delete your account. 
            We keep your data to provide you with historical meeting insights and task tracking.
          </p>
        </section>

        {/* Third-Party Services */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Third-Party Services
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Qwen (Alibaba Cloud)</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">AI processing for meeting analysis</p>
              </div>
              <a 
                href="#" 
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Privacy Policy →
              </a>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div>
                <span className="font-medium text-gray-900 dark:text-white">MongoDB</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">Data storage</p>
              </div>
              <a 
                href="#" 
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Privacy Policy →
              </a>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Render</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">Hosting provider</p>
              </div>
              <a 
                href="#" 
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Privacy Policy →
              </a>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Contact Us
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
            <p className="text-gray-900 dark:text-white font-medium">
              📧 privacy@meetingdna.com
            </p>
          </div>
        </section>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            MeetingDNA is committed to protecting your privacy and data security.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            © {new Date().getFullYear()} MeetingDNA. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;