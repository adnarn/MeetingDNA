// test.js
require("dotenv").config()
const { analyzeMeeting } = require("./services/qwenService")

const transcript = `
Meeting: Product sync - June 14
Attendees: Dex, John, Sarah

Dex: We need to push the launch to July 20.
John: I'll update the landing page by Friday.
Sarah: What about the payment integration?
Dex: That's blocked until we get the API keys. John can you follow up with the provider?
John: Yes I'll email them today.
Sarah: I'll handle testing once integration is done, deadline July 15.
Dex: Agreed. Next meeting same time next week.
`

const run = async () => {
  const result = await analyzeMeeting(transcript)
  console.log("DECISIONS:", result.decisions)
  console.log("TASKS:", result.tasks)
  console.log("QUESTIONS:", result.open_questions)
  console.log("NEXT MEETING:", result.next_meeting)
}

run()