const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { 
  createMeeting, 
  getMeetings, 
  getMeetingById,
  generateEmails, 
  markTaskComplete, 
  getOverdueTasks 
} = require("../controllers/meeting");

// All meeting routes require authentication
router.use(auth);

// Routes
router.post("/create", createMeeting);
router.post("/emails", generateEmails);
router.get("/", getMeetings);
router.get("/overdue-tasks", getOverdueTasks);
router.get("/:id", getMeetingById);
router.patch("/:id/tasks/:taskId", markTaskComplete);

module.exports = router;