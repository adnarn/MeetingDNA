import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMeetings } from '../api/meetingApi';

const History = () => {
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, completed, pending

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      setLoading(true);
      const data = await getMeetings();
      setMeetings(data);
      setError('');
    } catch (err) {
      setError('Failed to load meetings history');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getMeetingStats = (meeting) => {
    const totalTasks = meeting.tasks?.length || 0;
    const completedTasks = meeting.tasks?.filter(t => t.completed).length || 0;
    const overdueTasks = meeting.tasks?.filter(t => {
      if (!t.deadline || t.completed) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const taskDate = new Date(t.deadline);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate < today;
    }).length || 0;
    
    return { totalTasks, completedTasks, overdueTasks };
  };

  const getFilteredMeetings = () => {
    if (filter === 'all') return meetings;
    
    return meetings.filter(meeting => {
      const { totalTasks, completedTasks } = getMeetingStats(meeting);
      
      if (filter === 'completed') {
        return totalTasks > 0 && completedTasks === totalTasks;
      }
      if (filter === 'pending') {
        return totalTasks > 0 && completedTasks < totalTasks;
      }
      return true;
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (meeting) => {
    const { totalTasks, completedTasks, overdueTasks } = getMeetingStats(meeting);
    
    if (totalTasks === 0) {
      return { text: 'No Tasks', color: '#6b7280', bg: '#f3f4f6' };
    }
    if (completedTasks === totalTasks) {
      return { text: '✓ Complete', color: '#065f46', bg: '#d1fae5' };
    }
    if (overdueTasks > 0) {
      return { text: `⚠️ ${overdueTasks} Overdue`, color: '#dc2626', bg: '#fee2e2' };
    }
    return { text: `${completedTasks}/${totalTasks} Done`, color: '#1d4ed8', bg: '#dbeafe' };
  };

  const getProgressPercent = (meeting) => {
    const { totalTasks, completedTasks } = getMeetingStats(meeting);
    if (totalTasks === 0) return 0;
    return (completedTasks / totalTasks) * 100;
  };

  if (loading) {
    return (
      <div className="container-narrow">
        <div className="card text-center py-16 px-6">
          <div className="text-5xl mb-4">📋</div>
          <h2 className="mb-3 text-gray-600 dark:text-gray-400">Loading meetings...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-narrow">
        <div className="card bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
          <h2 className="text-red-600 dark:text-red-400 mb-3">Error</h2>
          <p className="text-gray-700 dark:text-gray-300">{error}</p>
          <button onClick={fetchMeetings} className="button mt-4 w-auto">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const filteredMeetings = getFilteredMeetings();

  return (
    <div className="container-narrow">
      {/* Header */}
      <div className="page-header">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-gray-900 dark:text-gray-100">Meeting History</h1>
            <p className="text-gray-600 dark:text-gray-400">{meetings.length} total meeting(s) analyzed</p>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="button w-auto bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500"
          >
            + New Meeting
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      {meetings.length > 0 && (
        <div className="card mb-6 p-4">
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 border-none rounded-full cursor-pointer font-medium text-sm transition-colors ${
                filter === 'all' 
                  ? 'bg-blue-500 text-white dark:bg-blue-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              All Meetings
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-1.5 border-none rounded-full cursor-pointer font-medium text-sm transition-colors ${
                filter === 'pending' 
                  ? 'bg-amber-500 text-white dark:bg-amber-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Pending Tasks
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-1.5 border-none rounded-full cursor-pointer font-medium text-sm transition-colors ${
                filter === 'completed' 
                  ? 'bg-green-500 text-white dark:bg-green-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Complete
            </button>
          </div>
        </div>
      )}

      {/* Meetings List */}
      {filteredMeetings.length === 0 ? (
        <div className="card text-center py-16 px-6">
          <div className="text-5xl mb-4">📭</div>
          <h2 className="mb-3 text-gray-900 dark:text-gray-100">No meetings found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {meetings.length === 0 
              ? "You haven't analyzed any meetings yet" 
              : `No meetings with ${filter} status`}
          </p>
          <button onClick={() => navigate('/')} className="button">
            Analyze Your First Meeting
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredMeetings.map((meeting) => {
            const status = getStatusBadge(meeting);
            const progress = getProgressPercent(meeting);
            const { totalTasks, completedTasks, overdueTasks } = getMeetingStats(meeting);
            
            return (
              <div 
                key={meeting._id} 
                className="card cursor-pointer transition-all duration-200 hover:translate-x-1 hover:shadow-lg"
                onClick={() => navigate(`/meeting/${meeting._id}`)}
              >
                {/* Header Row */}
                <div className="flex justify-between items-start flex-wrap gap-3 mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {meeting.title || 'Untitled Meeting'}
                    </h3>
                    <div className="flex gap-3 flex-wrap text-sm text-gray-600 dark:text-gray-400">
                      <span>📅 {formatDate(meeting.createdAt)}</span>
                      {meeting.next_meeting && <span>⏰ Next: {meeting.next_meeting}</span>}
                      {totalTasks > 0 && (
                        <span>📋 {totalTasks} task{totalTasks !== 1 ? 's' : ''}</span>
                      )}
                      {overdueTasks > 0 && (
                        <span className="text-red-600 dark:text-red-400">⚠️ {overdueTasks} overdue</span>
                      )}
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                    totalTasks === 0 
                      ? 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400' 
                      : completedTasks === totalTasks 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' 
                        : overdueTasks > 0 
                          ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' 
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                  }`}>
                    {status.text}
                  </div>
                </div>

                {/* Progress Bar */}
                {totalTasks > 0 && (
                  <div className="mt-3">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden h-1.5">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          overdueTasks > 0 ? 'bg-red-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1.5 text-xs text-gray-600 dark:text-gray-400">
                      <span>{completedTasks} of {totalTasks} completed</span>
                      {progress === 100 && <span>✓ All tasks complete!</span>}
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 flex gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/meeting/${meeting._id}`);
                    }}
                    className="button w-auto px-4 py-1.5 text-xs"
                  >
                    View Details
                  </button>
                  {totalTasks > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/meeting/${meeting._id}/emails`);
                      }}
                      className="button button-secondary w-auto px-4 py-1.5 text-xs"
                    >
                      View Emails
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default History;