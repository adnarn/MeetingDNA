import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000/api/meetings'; // Adjust port as needed
const API_BASE_URL = 'https://meetingdna.onrender.com/api/meetings'; // Adjust port as needed

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create a new meeting from transcript
export const createMeeting = async (title, transcript) => {
  try {
    const response = await api.post('/create', { title, transcript });
    return response.data.meeting;
  } catch (error) {
    console.error('Create meeting error:', error.response?.data || error.message);
    throw error;
  }
};

// Get all meetings (history page)
export const getMeetings = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Get meetings error:', error.response?.data || error.message);
    throw error;
  }
};

// Get single meeting by ID (meeting detail page)
export const getMeeting = async (meetingId) => {
  try {
    // You'll need to add this endpoint if not exists
    const response = await api.get(`/${meetingId}`);
    return response.data;
  } catch (error) {
    console.error('Get meeting error:', error.response?.data || error.message);
    throw error;
  }
};

// Generate follow-up emails for a meeting
export const generateEmails = async (meetingId) => {
  try {
    const response = await api.post('/emails', { meetingId });
    return response.data;
  } catch (error) {
    console.error('Generate emails error:', error.response?.data || error.message);
    throw error;
  }
};

// Mark a specific task as complete
export const markTaskComplete = async (meetingId, taskId) => {
  try {
    const response = await api.patch(`/${meetingId}/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Mark task complete error:', error.response?.data || error.message);
    throw error;
  }
};

// Optional: Get overdue tasks (for nudge feature)
export const getOverdueTasks = async () => {
  try {
    const response = await api.get('/overdue-tasks');
    return response.data;
  } catch (error) {
    console.error('Get overdue tasks error:', error.response?.data || error.message);
    throw error;
  }
};

export default api;