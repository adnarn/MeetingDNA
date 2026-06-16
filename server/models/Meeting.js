const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema(
  {
    userId: {  // This should match what you're sending
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
      index: true,
    },
    title: { type: String, default: "Untitled Meeting" },
    transcript: { type: String, required: true },
    decisions: [{ type: String }],
    tasks: [
      {
        assignee: { type: String },
        task: { type: String },
        deadline: { type: Date, default: null },
        completed: { type: Boolean, default: false },
        completedAt: { type: Date, default: null },
      },
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
);

// Add compound index for user + createdAt for faster history queries
meetingSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model("Meeting", meetingSchema);