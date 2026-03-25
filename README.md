# 📖 NSCT Study Hub

AI-powered study notes for the **HEC National Skill Competency Test** for IT Graduates (7th & 8th Semester).

**Test Date: April 4-5, 2026** | Conducted by Virtual University of Pakistan

---

## Features

- Full syllabus coverage: 10 subject areas, 100+ topics
- AI-generated notes, key concepts, and MCQ practice questions per topic
- Clean dark-themed UI built with React + Vite
- Serverless backend via Vercel API routes (no CORS issues, API key stays safe)

---

## Project Structure

```
nsct-study-hub/
├── api/
│   └── chat.js          <- Vercel serverless function (calls Anthropic server-side)
├── src/
│   ├── components/      <- Header, Sidebar, TopicList, ContentPanel
│   ├── data/
│   │   └── syllabus.js  <- All 10 subject areas and topics
│   ├── services/
│   │   └── api.js       <- Calls /api/chat (not Anthropic directly)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── vite.config.js
└── package.json
```

> **Why /api/chat instead of calling Anthropic directly?**
> Browsers block direct calls to api.anthropic.com due to CORS policy. The
> api/chat.js serverless function runs on Vercel's servers (not the browser),
> so the CORS restriction does not apply. Your API key also stays hidden.

---

## Setup

### 1. Get a Free Anthropic API Key

1. Go to https://console.anthropic.com
2. Sign up for a free account
3. Go to API Keys and create a new key
4. Add $5 credit (lasts a very long time, roughly 500+ topic loads)

### 2. Clone and Install

```bash
git clone https://github.com/YOUR_USERNAME/nsct-study-hub.git
cd nsct-study-hub
npm install
```

### 3. Local Development (with Vercel CLI)

```bash
npm install -g vercel
cp .env.example .env.local
# Edit .env.local and add your ANTHROPIC_API_KEY
npx vercel dev
```

App runs at http://localhost:3000

---

## Deploy to Vercel (Free)

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: NSCT Study Hub"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/nsct-study-hub.git
git push -u origin main
```

### Step 2: Deploy

1. Go to vercel.com, sign in with GitHub
2. Click Add New Project, import nsct-study-hub
3. Under Environment Variables, add:
   - Key: ANTHROPIC_API_KEY
   - Value: (your key from console.anthropic.com)
4. Click Deploy
5. Share your live URL with your batch!

---

## Syllabus Coverage

| Subject Area                        | Weightage | Topics |
|-------------------------------------|-----------|--------|
| Problem Solving & Analytical Skills | 20%       | 16     |
| Computer Networks & Cloud Computing | 10%       | 10     |
| Programming (C++/Java/Python)       | 10%       | 16     |
| Data Structures & Algorithms        | 10%       | 12     |
| Operating Systems                   | 5%        | 12     |
| Software Engineering                | 10%       | 16     |
| Web Development                     | 10%       | 17     |
| AI / ML & Data Analytics            | 10%       | 17     |
| Cyber Security                      | 5%        | 16     |
| Databases                           | 10%       | 17     |

---

Built for Pakistani IT students preparing for NSCT 2026. Good luck!
