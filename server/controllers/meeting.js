const Meeting = require("../models/Meeting")
const { checkOverdueTasks, generateNudgeEmails } = require("../services/accountabilityService")
const { analyzeMeeting, generateFollowUpEmails } = require("../services/qwenService")


const createMeeting = async (req, res) => {
  try {
    const { transcript, title } = req.body

    if (!transcript || !transcript.trim()) {
      return res.status(400).json({ error: "Transcript is required" })
    }

    const result = await analyzeMeeting(transcript)

    // Ensure decisions is always an array
    const decisions = Array.isArray(result.decisions) ? result.decisions : [];
    
    // Convert deadline strings to Date objects explicitly
    const tasksWithDates = (result.tasks || []).map(task => ({
      ...task,
      deadline: task.deadline ? new Date(task.deadline) : null
    }))

    const meeting = await Meeting.create({
      title: title || result.title || "Untitled Meeting",
      transcript,
      decisions: decisions,
      tasks: tasksWithDates,
      open_questions: result.open_questions || [],
      next_meeting: result.next_meeting || null,
      status: "ready",
    })

    res.json({ meeting })
  } catch (error) {
    console.error("Meeting error:", error.message)
    res.status(500).json({ error: "Failed to analyze meeting" })
  }
};

const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find().sort({ createdAt: -1 })
    res.json(meetings)
  } catch (error) {
    console.error("History error:", error.message)
    res.status(500).json({ error: "Failed to fetch meetings" })
  }
}

const generateEmails = async (req, res) => {
  try {
    const { meetingId } = req.body;

    if (!meetingId) {
      return res.status(400).json({ 
        error: "meetingId is required in request body" 
      });
    }

    // Find the meeting in MongoDB
    const meeting = await Meeting.findById(meetingId);
    
    if (!meeting) {
      return res.status(404).json({ 
        error: "Meeting not found" 
      });
    }

    // Check if meeting has tasks
    if (!meeting.tasks || meeting.tasks.length === 0) {
      return res.status(400).json({ 
        error: "No tasks found for this meeting. Cannot generate emails." 
      });
    }

    // Generate emails using Qwen
    const emailsData = await generateFollowUpEmails(
      meeting.tasks,
      meeting.decisions || [] // Pass empty array if no decisions
    );

    // Return just the emails array
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


const markTaskComplete = async (req, res) => {
  try {
    const { id, taskId } = req.params;

    const meeting = await Meeting.findById(id);
    if (!meeting) {
      return res.status(404).json({ error: "Meeting not found" });
    }

    // Find and update the specific task
    const taskIndex = meeting.tasks.findIndex(
      t => t._id.toString() === taskId
    );

    if (taskIndex === -1) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Mark as complete and add completion timestamp
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

const getOverdueTasks = async (req, res) => {
  try {
    const overdue = await checkOverdueTasks();
    const nudges = await generateNudgeEmails();
    
    res.status(200).json({
      overdueMeetings: overdue,
      nudgesReady: nudges
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getMeetingById = async (req, res) => {
  try {
    const { id } = req.params;
    const meeting = await Meeting.findById(id);
    
    if (!meeting) {
      return res.status(404).json({ error: "Meeting not found" });
    }
    
    res.json(meeting);
  } catch (error) {
    console.error("Get meeting error:", error.message);
    res.status(500).json({ error: "Failed to fetch meeting" });
  }
};


module.exports = { createMeeting, getMeetings, generateEmails, markTaskComplete, getOverdueTasks, getMeetingById }