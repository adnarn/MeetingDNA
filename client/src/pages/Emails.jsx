import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { generateEmails, getMeeting } from '../api/meetingApi';

const Emails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [emails, setEmails] = useState([]);
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if emails were passed from the meeting detail page
    if (location.state?.emails) {
      setEmails(location.state.emails);
      setLoading(false);
      fetchMeetingDetails();
    } else {
      // If no emails passed, try to generate them
      handleGenerateEmails();
    }
  }, [id]);

  const fetchMeetingDetails = async () => {
    try {
      const data = await getMeeting(id);
      setMeeting(data);
    } catch (err) {
      console.error('Failed to fetch meeting:', err);
    }
  };

  const handleGenerateEmails = async () => {
    try {
      setGenerating(true);
      setError('');
      const result = await generateEmails(id);
      setEmails(result.emails);
      fetchMeetingDetails();
    } catch (err) {
      setError('Failed to generate emails. Please try again.');
      console.error(err);
    } finally {
      setGenerating(false);
      setLoading(false);
    }
  };

  const handleCopyEmail = (emailBody, index) => {
    navigator.clipboard.writeText(emailBody);
    setCopiedEmail(index);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const handleCopyAllEmails = () => {
    const allEmailsText = emails.map(email => 
      `To: ${email.to}\nSubject: ${email.subject}\n\n${email.body}\n\n${'='.repeat(60)}\n\n`
    ).join('');
    navigator.clipboard.writeText(allEmailsText);
    alert('All emails copied to clipboard!');
  };

  const formatRecipients = (emails) => {
    return emails.map(e => e.to).join(', ');
  };

  if (loading || generating) {
    return (
      <div className="container">
        <div className="card text-center py-16 px-6">
          <div className="text-5xl mb-4">📧</div>
          <h2 className="mb-3 text-gray-600 dark:text-gray-400">
            {generating ? 'Generating personalized emails...' : 'Loading emails...'}
          </h2>
          <p className="text-gray-500 dark:text-gray-500">
            {generating ? 'AI is writing context-aware follow-ups for each assignee' : 'Please wait'}
          </p>
          {generating && (
            <div className="mt-6 w-10 h-10 border-3 border-gray-200 dark:border-gray-700 border-t-blue-500 rounded-full animate-spin mx-auto" />
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="card bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
          <h2 className="text-red-600 dark:text-red-400 mb-3">Error</h2>
          <p className="text-gray-700 dark:text-gray-300">{error}</p>
          <button onClick={handleGenerateEmails} className="button mt-4 w-auto">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (emails.length === 0) {
    return (
      <div className="container">
        <div className="card text-center py-16 px-6">
          <div className="text-5xl mb-4">📭</div>
          <h2 className="mb-3 text-gray-900 dark:text-gray-100">No Emails Generated</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            No tasks found in this meeting to generate follow-up emails.
          </p>
          <button onClick={() => navigate(`/meeting/${id}`)} className="button">
            Back to Meeting
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-narrow">
      {/* Header */}
      <div className="page-header">
        <button 
          onClick={() => navigate(`/meeting/${id}`)}
          className="bg-none border-none text-blue-500 dark:text-blue-400 cursor-pointer text-sm mb-4 inline-flex items-center gap-1 hover:underline"
        >
          ← Back to Meeting
        </button>
        <h1 className="text-gray-900 dark:text-gray-100">Follow-up Emails</h1>
        <p className="text-gray-600 dark:text-gray-400">
          AI-generated personalized emails for {emails.length} assignee(s): {formatRecipients(emails)}
        </p>
      </div>

      {/* Meeting Context Summary */}
      {meeting && (
        <div className="card mb-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xl">📄</span>
            <h3 className="text-base font-semibold text-green-800 dark:text-green-300">Meeting Context</h3>
          </div>
          <p className="text-sm text-green-700 dark:text-green-300">
            <strong className="text-green-900 dark:text-green-200">{meeting.title || 'Untitled Meeting'}</strong> — 
            {meeting.decisions?.length > 0 && ` ${meeting.decisions.length} decision(s) made`}
            {meeting.tasks?.length > 0 && `, ${meeting.tasks.length} task(s) assigned`}
          </p>
        </div>
      )}

      {/* Copy All Button */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={handleCopyAllEmails}
          className="button button-secondary w-auto bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500"
        >
          📋 Copy All Emails
        </button>
      </div>

      {/* Emails List */}
      <div className="flex flex-col gap-6">
        {emails.map((email, index) => (
          <div key={index} className={`card border-l-4 transition-transform duration-200 ${
            index === 0 ? 'border-l-blue-500' : 'border-l-purple-500'
          }}`}>
            {/* Email Header */}
            <div className="flex justify-between items-start mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">👤</span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    To: {email.to}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Subject: {email.subject}
                </p>
              </div>
              <button
                onClick={() => handleCopyEmail(email.body, index)}
                className={`${
                  copiedEmail === index 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                } px-3 py-1.5 border-none rounded cursor-pointer text-xs font-medium transition-all duration-200`}
              >
                {copiedEmail === index ? '✓ Copied!' : '📋 Copy'}
              </button>
            </div>

            {/* Email Body */}
            <div className="email-body bg-gray-50 dark:bg-gray-900 p-5 rounded-lg font-mono text-sm leading-relaxed whitespace-pre-wrap break-words text-gray-800 dark:text-gray-200">
              {email.body}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  const mailtoLink = `mailto:${email.to}?subject=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(email.body)}`;
                  window.location.href = mailtoLink;
                }}
                className="button w-auto bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-xs px-4 py-2"
              >
                📧 Open in Email Client
              </button>
              <button
                onClick={() => handleCopyEmail(email.body, index)}
                className="button button-secondary w-auto bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 text-xs px-4 py-2"
              >
                📋 Copy to Clipboard
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Regenerate Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleGenerateEmails}
          disabled={generating}
          className="button button-secondary w-auto bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {generating ? 'Regenerating...' : '🔄 Regenerate Emails'}
        </button>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
          Emails are generated by AI based on meeting decisions and tasks
        </p>
      </div>

      {/* Spin Animation Keyframes */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .border-3 {
          border-width: 3px;
        }
      `}</style>
    </div>
  );
};

export default Emails;