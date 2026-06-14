const express = require("express")
const router = express.Router()
const Task = require("../models/Meeting")

router.post("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: "sent" },
      { new: true }
    )

    if (!task) {
      return res.status(404).json({ error: "Task not found" })
    }

    res.json({ message: "Email approved and marked as sent", task })
  } catch (error) {
    console.error("Approve error:", error.message)
    res.status(500).json({ error: "Failed to approve task" })
  }
})

module.exports = router