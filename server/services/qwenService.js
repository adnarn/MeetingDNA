require("dotenv").config({ path: "../.env" });
const axios = require("axios");

const analyzeMeeting = async (transcript) => {
  try {
    const response = await axios.post(
      "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions",
      {
        model: "qwen-plus",
        messages: [
          {
            role: "system",
            content: `You are a meeting analyst. Extract structured data from meeting transcripts. 
Return ONLY valid JSON, no explanation, no markdown, no backticks.`,
          },
          // In qwenService.js - Updated prompt
          {
            role: "user",
            content: `Generate personalized follow-up emails for each assignee based on their tasks.

Context:
${decisionsText}

Tasks by assignee:
${assigneesWithTasks}

CRITICAL FORMATTING RULES:
- DO NOT include any signature like "[Your Name]", "Best regards, [Name]", or any placeholder
- End each email with just "Best regards" on a new line, nothing after
- Do not add any name, title, or signature block

For each assignee, draft a professional email that:
1. References relevant decisions from the meeting
2. Lists ALL their tasks clearly
3. Includes deadlines where mentioned
4. Offers assistance or clarification
5. Has a warm but professional tone
6. Ends with "Best regards" on its own line

Return JSON in this exact format:
{
  "emails": [
    {
      "to": "assignee name",
      "subject": "Action items from today's meeting",
      "body": "Hi [Assignee],\n\n[Email content with tasks and context]\n\nBest regards"
    }
  ]
}

Each assignee gets ONE email covering all their tasks. Do not add explanations outside the JSON.`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.QWEN_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const raw = response.data.choices[0].message.content;
    return JSON.parse(raw);
  } catch (error) {
    console.error("Qwen error:", error.message);
    throw error;
  }
};

const generateFollowUpEmails = async (tasks, decisions) => {
  try {
    // Group tasks by assignee
    const tasksByAssignee = {};
    tasks.forEach(task => {
      if (!tasksByAssignee[task.assignee]) {
        tasksByAssignee[task.assignee] = [];
      }
      tasksByAssignee[task.assignee].push(task);
    });

    // Build context for Qwen
    const assigneesWithTasks = Object.entries(tasksByAssignee).map(([assignee, userTasks]) => {
      const taskList = userTasks.map(t => `- ${t.task}${t.deadline ? ` (deadline: ${new Date(t.deadline).toLocaleDateString()})` : ''}`).join('\n');
      return `Assignee: ${assignee}\nTasks:\n${taskList}`;
    }).join('\n\n');

    const decisionsText = decisions.length > 0 
      ? `\nDecisions made in meeting:\n${decisions.map(d => `- ${d}`).join('\n')}`
      : 'No specific decisions were recorded.';

    const response = await axios.post(
      "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions",
      {
        model: "qwen-plus",
        messages: [
          {
            role: "system",
            content: `You are an executive assistant that drafts professional, personalized follow-up emails. 
Return ONLY valid JSON, no explanation, no markdown, no backticks.`
          },
          {
            role: "user",
            content: `Generate personalized follow-up emails for each assignee based on their tasks.

Context:
${decisionsText}

Tasks by assignee:
${assigneesWithTasks}

CRITICAL FORMATTING RULES:
- DO NOT include any signature like "[Your Name]", "Best regards, [Name]", or any placeholder
- End each email with just "Best regards" on a new line, nothing after
- Do not add any name, title, or signature block

For each assignee, draft a professional email that:
1. References relevant decisions from the meeting
2. Lists ALL their tasks clearly
3. Includes deadlines where mentioned
4. Offers assistance or clarification
5. Has a warm but professional tone
6. Ends with "Best regards" on its own line

Return JSON in this exact format:
{
  "emails": [
    {
      "to": "assignee name",
      "subject": "Action items from today's meeting",
      "body": "Hi [Assignee],\n\n[Email content with tasks and context]\n\nBest regards"
    }
  ]
}

Each assignee gets ONE email covering all their tasks. Do not add explanations outside the JSON.`
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.QWEN_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const raw = response.data.choices[0].message.content;
    const parsed = JSON.parse(raw);
    
    // Validate structure
    if (!parsed.emails || !Array.isArray(parsed.emails)) {
      throw new Error("Qwen returned invalid email structure");
    }
    
    // Optional: Clean up any remaining placeholders just in case
    parsed.emails = parsed.emails.map(email => ({
      ...email,
      body: email.body
        .replace(/\[Your Name\]/gi, '')
        .replace(/Best regards,\s*\n\s*/gi, 'Best regards\n')
        .replace(/\n\s*\n\s*$/g, '\n')
        .trim()
    }));
    
    return parsed;
  } catch (error) {
    console.error("Qwen email generation error:", error.message);
    throw error;
  }
};

module.exports = { analyzeMeeting, generateFollowUpEmails };
