# MeetingDNA 🧬

> Most meeting tools transcribe. MeetingDNA acts.

MeetingDNA is an AI-powered meeting agent that transforms raw transcripts into fully processed work artifacts — automatically extracting decisions, assigning tasks, generating personalized follow-up emails, and tracking accountability without any manual input.

## The Problem
A 1-hour meeting produces zero structured output. Action items get lost, follow-ups never happen, and accountability dies in the chat.

## The Solution
Paste your transcript. MeetingDNA's agent handles the rest.

## Features
- 🧠 **AI Extraction** — Decisions, tasks, assignees, and deadlines parsed automatically
- 📅 **Smart Deadlines** — Relative dates ("Friday", "next week") converted to real dates
- ✅ **Task Tracking** — Mark tasks complete with progress visualization
- 📧 **Autonomous Email Generation** — Personalized follow-up emails per assignee, written by AI
- ⚠️ **Accountability Nudges** — Overdue task detection with automatic nudge emails
- 📁 **Meeting History** — Full archive with filtering by status

## Tech Stack
**Frontend:** React, Tailwind CSS, React Router
**Backend:** Node.js, Express
**Database:** MongoDB
**AI:** Qwen (qwen-plus via Alibaba DashScope)

## How It Works
1. Paste meeting transcript
2. Agent extracts structured data via Qwen
3. Tasks saved to MongoDB with real deadline dates
4. Generate personalized follow-up emails per assignee
5. Track completion and get nudged on overdue items

## Local Setup

### Prerequisites
- Node.js 18+
- MongoDB URI
- Qwen API key (Alibaba DashScope)

### Backend
```bash
cd server
npm install
# Create .env file with:
# MONGODB_URI=your_mongodb_uri
# QWEN_API_KEY=your_qwen_api_key
node index.js
```

### Frontend
```bash
cd client
npm install
npm run dev
```

## Built For
Qwen Cloud Hackathon 2025 — Track 4: Autopilot Agent

## Author
Adnan Usman (Dex) — [github.com/adnarn](https://github.com/adnarn)
