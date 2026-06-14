import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMeeting } from '../api/meetingApi';

const Home = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!transcript.trim()) {
      setError('Please paste a meeting transcript');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const meeting = await createMeeting(title, transcript);
      // Navigate to the meeting detail page after successful creation
      navigate(`/meeting/${meeting._id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze meeting. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setTranscript(event.target.result);
    };
    reader.readAsText(file);
  };

  return (
    <div className=" container max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          MeetingDNA
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Paste your meeting transcript and let AI extract action items, decisions, and send follow-ups
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
        <form onSubmit={handleSubmit}>
          {/* Meeting Title Input */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Meeting Title (Optional)
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Product Sprint Planning - June 15"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Transcript Textarea */}
          <div className="mb-6">
            <label htmlFor="transcript" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Meeting Transcript *
            </label>
            <textarea
              id="transcript"
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Paste your meeting transcript here...
Example:
John: We need to update the API documentation by Friday
Sarah: I'll create wireframes for the dashboard by tomorrow
Mike: Let's migrate the database to PostgreSQL by July 15

Decisions:
- Use React for the frontend
- Deploy to AWS

Next meeting is scheduled for Monday at 10 AM"
              rows={12}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-mono text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              required
            />
          </div>

          {/* File Upload Option */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Or Upload File
            </label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 transition">
                <span className="text-sm text-gray-700 dark:text-gray-300">📁 Choose .txt file</span>
                <input
                  type="file"
                  accept=".txt,.md"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Supports .txt and .md files
              </span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
              <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing meeting...
              </span>
            ) : (
              'Analyze Meeting →'
            )}
          </button>
        </form>
      </div>

      {/* Quick Tips */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">💡 Tips for best results:</h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Clearly label tasks with assignees (e.g., "John: Update docs")</li>
          <li>• Include deadlines like "tomorrow", "Friday", or specific dates</li>
          <li>• List decisions explicitly (e.g., "Decision: Use React")</li>
          <li>• Mention next meeting time for automatic scheduling</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;