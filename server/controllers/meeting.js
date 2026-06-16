const Meeting = require("../models/Meeting");
const { checkOverdueTasks, generateNudgeEmails } = require("../services/accountabilityService");
const { analyzeMeeting, generateFollowUpEmails } = require("../services/qwenService");

// @desc    Create a new meeting
// @route   POST /api/meetings/create
// @access  Private
const createMeeting = async (req, res) => {
  try {
    const { transcript, title } = req.body;

    if (!transcript || !transcript.trim()) {
      return res.status(400).json({ error: "Transcript is required" });
    }

    const result = await analyzeMeeting(transcript);

    // Ensure decisions is always an array
    const decisions = Array.isArray(result.decisions) ? result.decisions : [];
    
    // Convert deadline strings to Date objects explicitly
    const tasksWithDates = (result.tasks || []).map(task => ({
      ...task,
      deadline: task.deadline ? new Date(task.deadline) : null
    }));

    const meeting = await Meeting.create({
      userId: req.userId, // Change from 'user' to 'userId' if your model uses userId
      title: title || result.title || "Untitled Meeting",
      transcript,
      decisions: decisions,
      tasks: tasksWithDates,
      open_questions: result.open_questions || [],
      next_meeting: result.next_meeting || null,
      status: "ready",
    });

    res.json({ meeting });
  } catch (error) {
    console.error("Meeting error:", error.message);
    res.status(500).json({ error: "Failed to analyze meeting" });
  }
};

// @desc    Get all meetings for current user
// @route   GET /api/meetings/
// @access  Private
const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({ userId: req.userId }) // Change from 'user' to 'userId'
      .sort({ createdAt: -1 });
    res.json(meetings);
  } catch (error) {
    console.error("History error:", error.message);
    res.status(500).json({ error: "Failed to fetch meetings" });
  }
};

// @desc    Get single meeting by ID
// @route   GET /api/meetings/:id
// @access  Private
const getMeetingById = async (req, res) => {
  try {
    const { id } = req.params;
    const meeting = await Meeting.findOne({ 
      _id: id, 
      userId: req.userId // Change from 'user' to 'userId'
    });
    
    if (!meeting) {
      return res.status(404).json({ error: "Meeting not found" });
    }
    
    res.json(meeting);
  } catch (error) {
    console.error("Get meeting error:", error.message);
    res.status(500).json({ error: "Failed to fetch meeting" });
  }
};

// @desc    Generate emails for a meeting
// @route   POST /api/meetings/emails
// @access  Private
const generateEmails = async (req, res) => {
  try {
    const { meetingId } = req.body;

    if (!meetingId) {
      return res.status(400).json({ 
        error: "meetingId is required in request body" 
      });
    }

    // Find the meeting and ensure user owns it
    const meeting = await Meeting.findOne({ 
      _id: meetingId, 
      userId: req.userId // Change from 'user' to 'userId'
    });

    if (!meeting) {
      return res.status(404).json({ 
        error: "Meeting not found" 
      });
    }

    if (!meeting.tasks || meeting.tasks.length === 0) {
      return res.status(400).json({ 
        error: "No tasks found for this meeting. Cannot generate emails." 
      });
    }

    const emailsData = await generateFollowUpEmails(
      meeting.tasks,
      meeting.decisions || []
    );

    return res.status(200).json({
      success: true,
      meetingId: meeting._id,
      emails: emailsData.emails
    });

  } catch (error) {
    console.error("Generate emails error:", error.message);
    return res.status(500).json({ 
      error: "Failed to generate follow-up emails",
      details: error.message 
    });
  }
};

// @desc    Mark task as complete
// @route   PATCH /api/meetings/:id/tasks/:taskId
// @access  Private
const markTaskComplete = async (req, res) => {
  try {
    const { id, taskId } = req.params;

    const meeting = await Meeting.findOne({ 
      _id: id, 
      userId: req.userId // Change from 'user' to 'userId'
    });

    if (!meeting) {
      return res.status(404).json({ error: "Meeting not found" });
    }

    const taskIndex = meeting.tasks.findIndex(
      t => t._id.toString() === taskId
    );

    if (taskIndex === -1) {
      return res.status(404).json({ error: "Task not found" });
    }

    meeting.tasks[taskIndex].completed = true;
    meeting.tasks[taskIndex].completedAt = new Date();

    await meeting.save();

    return res.status(200).json({
      success: true,
      task: meeting.tasks[taskIndex]
    });

  } catch (error) {
    console.error("Task completion error:", error.message);
    return res.status(500).json({ error: "Failed to mark task complete" });
  }
};

// @desc    Get overdue tasks for current user
// @route   GET /api/meetings/overdue-tasks
// @access  Private
const getOverdueTasks = async (req, res) => {
  try {
    const overdue = await checkOverdueTasks(req.userId);
    const nudges = await generateNudgeEmails(req.userId);
    
    res.status(200).json({
      overdueMeetings: overdue,
      nudgesReady: nudges
    });
  } catch (error) {
    console.error("Overdue tasks error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { 
  createMeeting, 
  getMeetings, 
  getMeetingById,
  generateEmails, 
  markTaskComplete, 
  getOverdueTasks 
};