const questionAnswerPrompt = (
  role,
  experience,
  topicsToFocus,
  numberOfQuestions
) => `
You are an AI trained to generate technical interview questions and answers.

Task:
- Role: ${role}
- Candidate Experience: ${experience} years
- Focus Topics: ${topicsToFocus}
- Generate exactly ${numberOfQuestions} interview questions.

Instructions:
- Each answer must be concise (3-4 lines max).
- Avoid long explanations.
- If needed, include a very short code example (1 small snippet only).
- Do NOT exceed length.
- Keep formatting clean.

Output format (STRICT):
Return ONLY valid JSON array. No extra text.

[
  {
    "question": "Question here?",
    "answer": "Short and clear answer here."
  }
]
`;

const conceptExplainPrompt = (question) => `
You are an AI trained to generate explanations for interview questions.

Task:
- Question: "${question}"

Instructions:
- Explain the concept clearly for a beginner.
- Keep explanation concise (5-6 lines max).
- Do NOT write long paragraphs.
- If needed, include a small code example.
- Generate a short title (max 6-8 words).

Output format (STRICT):
Return ONLY valid JSON. No extra text.

{
  "title": "Short title here",
  "explanation": "Concise explanation here."
}
`;

module.exports = {
  questionAnswerPrompt,
  conceptExplainPrompt,
};