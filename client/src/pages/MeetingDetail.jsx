import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMeeting, markTaskComplete, generateEmails } from '../api/meetingApi';

const MeetingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [generatingEmails, setGeneratingEmails] = useState(false);
  const [updatingTask, setUpdatingTask] = useState(null);

  useEffect(() => {
    fetchMeeting();
  }, [id]);

  const fetchMeeting = async () => {
    try {
      setLoading(true);
      const data = await getMeeting(id);
      setMeeting(data);
      setError('');
    } catch (err) {
      setError('Failed to load meeting details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkComplete = async (taskId) => {
    try {
      setUpdatingTask(taskId);
      await markTaskComplete(id, taskId);
      // Refresh meeting data
      await fetchMeeting();
    } catch (err) {
      console.error('Failed to mark task complete:', err);
      alert('Failed to update task status');
    } finally {
      setUpdatingTask(null);
    }
  };

  const handleGenerateEmails = async () => {
    try {
      setGeneratingEmails(true);
      const result = await generateEmails(id);
      // Navigate to emails page with the generated emails
      navigate(`/meeting/${id}/emails`, { state: { emails: result.emails } });
    } catch (err) {
      console.error('Failed to generate emails:', err);
      alert('Failed to generate follow-up emails');
    } finally {
      setGeneratingEmails(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'No deadline';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isTaskOverdue = (deadline) => {
    if (!deadline) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const taskDate = new Date(deadline);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate < today;
  };

  if (loading) {
    return (
      <div className="container text-center pt-16">
        <div className="text-lg text-gray-600 dark:text-gray-400">Loading meeting...</div>
      </div>
    );
  }

  if (error || !meeting) {
    return (
      <div className="container">
        <div className="card bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
          <h2 className="text-red-600 dark:text-red-400 mb-3">Error</h2>
          <p className="text-gray-700 dark:text-gray-300">{error || 'Meeting not found'}</p>
          <button onClick={() => navigate('/')} className="button mt-4 w-auto">
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  const completedTasks = meeting.tasks?.filter(t => t.completed).length || 0;
  const totalTasks = meeting.tasks?.length || 0;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="container-narrow">
      {/* Header Section */}
      <div className="mb-6">
        <button 
          onClick={() => navigate('/history')}
          className="bg-none border-none text-blue-500 dark:text-blue-400 cursor-pointer text-sm mb-4 inline-flex items-center gap-1 hover:underline"
        >
          ← Back to History
        </button>
        <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          {meeting.title || 'Untitled Meeting'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Created {new Date(meeting.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Progress Bar */}
      {totalTasks > 0 && (
        <div className="card mb-6">
          <div className="flex justify-between mb-2">
            <span className="font-medium text-gray-900 dark:text-gray-100">Task Progress</span>
            <span className="text-gray-600 dark:text-gray-400">{completedTasks}/{totalTasks} complete</span>
          </div>
          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
            <div 
              className="bg-green-500 h-2 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Actions Bar */}
      <div className="card mb-6 bg-gray-50 dark:bg-gray-800">
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={handleGenerateEmails}
            disabled={generatingEmails || totalTasks === 0}
            className="button w-auto bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
          >
            {generatingEmails ? 'Generating...' : '📧 Generate Follow-up Emails'}
          </button>
          <button
            onClick={() => window.location.reload()}
            className="button w-auto bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500"
          >
            🔄 Refresh
          </button>
        </div>
        {totalTasks === 0 && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
            No tasks found in this meeting.
          </p>
        )}
      </div>

      {/* Tasks Section */}
      <div className="card mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          📋 Action Items ({totalTasks})
        </h2>
        {meeting.tasks && meeting.tasks.length > 0 ? (
          <div className="flex flex-col gap-3">
            {meeting.tasks.map((task, index) => {
              const overdue = isTaskOverdue(task.deadline) && !task.completed;
              return (
                <div 
                  key={task._id || index}
                  className={`p-4 border rounded-lg transition-all duration-200 ${
                    task.completed 
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                      : overdue 
                        ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' 
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap mb-2">
                        <span className={`font-semibold text-base ${
                          task.completed 
                            ? 'line-through text-gray-500 dark:text-gray-400' 
                            : 'text-gray-900 dark:text-gray-100'
                        }`}>
                          {task.task}
                        </span>
                        <span className="bg-indigo-100 dark:bg-indigo-900/30 px-2 py-0.5 rounded-full text-xs font-medium text-indigo-700 dark:text-indigo-300">
                          👤 {task.assignee || 'Unassigned'}
                        </span>
                        {task.deadline && (
                          <span className={`${
                            overdue 
                              ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' 
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                          } px-2 py-0.5 rounded-full text-xs`}>
                            📅 {formatDate(task.deadline)}
                            {overdue && ' ⚠️ Overdue'}
                          </span>
                        )}
                        {task.completed && (
                          <span className="bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full text-xs text-green-700 dark:text-green-300">
                            ✓ Completed
                          </span>
                        )}
                      </div>
                    </div>
                    {!task.completed && (
                      <button
                        onClick={() => handleMarkComplete(task._id)}
                        disabled={updatingTask === task._id}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-none cursor-pointer text-xs font-medium ml-3 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {updatingTask === task._id ? '✓' : 'Mark Complete'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No tasks assigned in this meeting.</p>
        )}
      </div>

      {/* Decisions Section */}
      {meeting.decisions && meeting.decisions.length > 0 && (
        <div className="card mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            ✅ Decisions Made
          </h2>
          <ul className="list-none p-0">
            {meeting.decisions.map((decision, index) => (
              <li key={index} className="py-2 border-b border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                • {decision}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Open Questions Section */}
      {meeting.open_questions && meeting.open_questions.length > 0 && (
        <div className="card mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            ❓ Open Questions
          </h2>
          <ul className="list-none p-0">
            {meeting.open_questions.map((question, index) => (
              <li key={index} className="py-2 border-b border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                • {question}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Next Meeting Section */}
      {meeting.next_meeting && (
        <div className="card">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            📅 Next Meeting
          </h2>
          <p className="text-gray-700 dark:text-gray-300">{meeting.next_meeting}</p>
        </div>
      )}
    </div>
  );
};

export default MeetingDetail;