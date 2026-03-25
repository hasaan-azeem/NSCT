// NOTE: We call /api/chat (our own Vercel serverless function) instead of
// the Anthropic API directly. Calling Anthropic from the browser causes CORS
// errors because Anthropic only allows server-side requests.

const SYSTEM_PROMPT = `You are an expert computer science tutor helping final-year IT students in Pakistan prepare for the National Skill Competency Test (NSCT) conducted by HEC (Higher Education Commission).

When given a topic from a specific subject area, provide exam-focused study material in the following EXACT format:

## Overview
[3-5 paragraphs of clear, concise explanation of the topic. Focus on what's testable.]

## Key Concepts
- [concept 1 with brief explanation]
- [concept 2 with brief explanation]
- [concept 3 with brief explanation]
- [concept 4 with brief explanation]
- [concept 5 with brief explanation]
- [concept 6 with brief explanation]

## Watch Out For
- [common exam trap or misconception 1]
- [common exam trap or misconception 2]
- [common exam trap or misconception 3]

## Practice Questions

**Q1.** [MCQ question]
A) [option] B) [option] C) [option] D) [option]
**Answer:** [letter] — [brief explanation why]

**Q2.** [MCQ question]
A) [option] B) [option] C) [option] D) [option]
**Answer:** [letter] — [brief explanation why]

**Q3.** [MCQ question]
A) [option] B) [option] C) [option] D) [option]
**Answer:** [letter] — [brief explanation why]

**Q4.** [MCQ question]
A) [option] B) [option] C) [option] D) [option]
**Answer:** [letter] — [brief explanation why]

Keep all content practical, accurate, and exam-ready. No fluff. Focus on what a student MUST know to score well.`;

export async function fetchTopicNotes(area, topic) {
  // Calls /api/chat — our Vercel serverless function — which calls Anthropic on the server side.
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ area, topic }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || `Request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.text || "Could not load content. Please try again.";
}

export function parseContent(text) {
  const sections = [];
  const lines = text.split("\n");
  let current = null;

  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (current) sections.push(current);
      current = { heading: line.slice(3).trim(), content: [] };
    } else if (current) {
      current.content.push(line);
    }
  }
  if (current) sections.push(current);
  return sections;
}
