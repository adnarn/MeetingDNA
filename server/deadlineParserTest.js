// test/deadlineParser.js
require('dotenv').config();
const { analyzeMeeting } = require("./services/qwenService")

const testDeadlineParsing = async () => {
  const testTranscript = `
Meeting on June 15, 2026

John: We need to get the API documentation done by Friday.
Sarah: I'll have the wireframes ready by tomorrow.
Mike: The database migration should be complete by July 15.

Tasks:
- John: Update API docs by Friday
- Sarah: Create wireframes by tomorrow
- Mike: Complete DB migration by July 15
`;

  console.log("Today's date:", new Date().toISOString().split('T')[0]);
  console.log("\nSending to Qwen...\n");
  
  const result = await analyzeMeeting(testTranscript);
  
  console.log("Qwen's parsed tasks:");
  result.tasks.forEach(task => {
    console.log(`\n${task.assignee}: ${task.task}`);
    console.log(`  Deadline returned: ${task.deadline}`);
    console.log(`  Type: ${typeof task.deadline}`);
    if (task.deadline) {
      const dateObj = new Date(task.deadline);
      console.log(`  Parsed as date: ${dateObj.toDateString()}`);
      console.log(`  Is valid: ${!isNaN(dateObj.getTime())}`);
    }
  });
  
  return result;
};

testDeadlineParsing().then(console.log).catch(console.error);