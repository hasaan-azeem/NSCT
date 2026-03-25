export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { area, topic } = req.body;

  if (!area || !topic) {
    return res.status(400).json({ error: "Missing area or topic" });
  }

  const SYSTEM_PROMPT = `You are an expert computer science tutor helping final-year IT students in Pakistan prepare for the National Skill Competency Test (NSCT) conducted by HEC (Higher Education Commission).

When given a topic from a specific subject area, provide exam-focused study material in the following EXACT format:

## Overview
[3-5 paragraphs of clear, concise explanation of the topic. Focus on what is testable.]

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

Keep all content practical, accurate, and exam-ready. No fluff.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-5-haiku-20241022",
        max_tokens: 1500,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: `Subject Area: ${area}\nTopic: ${topic}\n\nGenerate complete study notes for this topic.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({ error: err.error?.message || "API error" });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || "";
    return res.status(200).json({ text });

  } catch (error) {
    console.error("Handler error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

console.log("KEY:", process.env.ANTHROPIC_API_KEY);
