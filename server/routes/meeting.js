const express = require("express");
const router = express.Router();
const { 
  createMeeting, 
  getMeetings, 
  getMeetingById,  // Import it
  generateEmails, 
  markTaskComplete, 
  getOverdueTasks 
} = require("../controllers/meeting");

// SPECIFIC routes first
router.post("/create", createMeeting);
router.post("/emails", generateEmails);
router.get("/", getMeetings);
router.get('/overdue-tasks', getOverdueTasks);

// DYNAMIC routes last
router.get('/:id', getMeetingById);  // Add this
router.patch('/:id/tasks/:taskId', markTaskComplete);

module.exports = router;