// models/Meeting.js
const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema(
  {
    transcript: { type: String, required: true },
    title: { type: String, default: "Untitled Meeting" }, // Added with default
    decisions: [{ type: String }],
    tasks: [
      {
        assignee: { type: String },
        task: { type: String },
        deadline: { type: Date, default: null },
        completed: { type: Boolean, default: false },
        completedAt: { type: Date, default: null },
      }
    ],
    open_questions: [{ type: String }],
    next_meeting: { type: String, default: null },
    status: {
      type: String,
      enum: ["processing", "ready", "actioned"],
      default: "processing",
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Meeting", taskSchema)