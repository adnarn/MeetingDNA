// services/accountabilityService.js
const axios = require('axios');
const Meeting = require('../models/Meeting');

const checkOverdueTasks = async (userId = null) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Build match condition
  const matchCondition = {
    "tasks.deadline": { $ne: null },
    "tasks.completed": { $ne: true },
    "tasks.deadline": { $lt: today }
  };
  
  // Add user filter if provided - use 'userId' or 'user' based on your model
  if (userId) {
    matchCondition.userId = userId; // Change to 'user' if your model uses 'user'
  }

  const overdueTasks = await Meeting.aggregate([
    { $unwind: "$tasks" },
    { $match: matchCondition },
    {
      $group: {
        _id: "$_id",
        meetingTitle: { $first: "$title" },
        overdueTasks: {
          $push: {
            taskId: "$tasks._id",
            task: "$tasks.task",
            assignee: "$tasks.assignee",
            deadline: "$tasks.deadline"
          }
        }
      }
    }
  ]);

  return overdueTasks;
};

const generateNudgeEmails = async (userId = null) => {
  const overdueMeetings = await checkOverdueTasks(userId);
  
  if (overdueMeetings.length === 0) {
    return [];
  }

  // Group overdue tasks by assignee
  const overdueByAssignee = {};
  for (const meeting of overdueMeetings) {
    for (const task of meeting.overdueTasks) {
      if (!overdueByAssignee[task.assignee]) {
        overdueByAssignee[task.assignee] = [];
      }
      overdueByAssignee[task.assignee].push({
        task: task.task,
        meetingTitle: meeting.meetingTitle || "Untitled Meeting",
        deadline: task.deadline
      });
    }
  }

  // Build prompt for Qwen
  const assigneeContext = Object.entries(overdueByAssignee).map(([assignee, tasks]) => {
    const taskList = tasks.map(t =>
      `- ${t.task} (due ${new Date(t.deadline).toLocaleDateString()})`
    ).join('\n');
    return `Assignee: ${assignee}\nOverdue Tasks:\n${taskList}`;
  }).join('\n\n');

  try {
    const response = await axios.post(
      "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions",
      {
        model: "qwen-plus",
        messages: [
          {
            role: "system",
            content: `You are an accountability assistant that drafts professional, empathetic nudge emails for overdue tasks.
Return ONLY valid JSON, no explanation, no markdown, no backticks.`
          },
          {
            role: "user",
            content: `Generate personalized nudge emails for each assignee with overdue tasks.

Context:
The following tasks are past their deadlines.

${assigneeContext}

CRITICAL FORMATTING RULES:
- DO NOT include any signature like "[Your Name]", "Best regards, [Name]", or any placeholder
- End each email with just "Best regards" on a new line, nothing after
- Do not add any name, title, or signature block

For each assignee, draft a professional nudge email that:
1. Politely reminds them of their overdue tasks
2. Lists each overdue task with its original deadline
3. Offers support or asks if they need clarification
4. Has a helpful, not accusatory tone
5. Suggests providing updated timelines if needed
6. Ends with "Best regards" on its own line

Return JSON in this exact format:
{
  "emails": [
    {
      "to": "assignee name",
      "subject": "Action items needing attention",
      "body": "Hi [Assignee],\n\n[Email content with overdue tasks]\n\nBest regards"
    }
  ]
}`
          }
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.QWEN_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const raw = response.data.choices[0].message.content;
    const parsed = JSON.parse(raw);
    
    // Clean up any remaining placeholders
    if (parsed.emails) {
      parsed.emails = parsed.emails.map(email => ({
        ...email,
        body: email.body
          .replace(/\[Your Name\]/gi, '')
          .replace(/Best regards,\s*\n\s*/gi, 'Best regards\n')
          .replace(/\n\s*\n\s*$/g, '\n')
          .trim()
      }));
    }
    
    return parsed.emails || [];
    
  } catch (error) {
    console.error("Qwen nudge generation error:", error.message);
    // Fallback to template if Qwen fails
    return Object.entries(overdueByAssignee).map(([assignee, tasks]) => ({
      to: assignee,
      subject: "⚠️ Overdue action items",
      body: `Hi ${assignee},\n\nThe following tasks are overdue:\n\n${tasks.map(t =>
        `- ${t.task} (due ${new Date(t.deadline).toLocaleDateString()})`
      ).join('\n')}\n\nPlease prioritize these or let me know if you need support.\n\nBest regards`
    }));
  }
};

module.exports = { checkOverdueTasks, generateNudgeEmails };