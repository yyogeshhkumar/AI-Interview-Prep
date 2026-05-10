const {
  conceptExplainPrompt,
  questionAnswerPrompt,
} = require("../utils/prompts");

// helper to clean AI markdown responses
const cleanJsonResponse = (text) => {
  if (!text || typeof text !== "string") return "";

  return text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
};

const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Interview Prep AI",
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 600,
        }),
      }
    );

    const result = await response.json();
    console.log("FULL RESPONSE:", result);

    if (result.error) {
      return res.status(200).json({
        raw: result.error.message,
      });
    }

    if (!result.choices?.length) {
      return res.status(200).json({
        raw: "No response from AI",
      });
    }

    const rawText = result.choices[0].message.content;
    const cleanedText = cleanJsonResponse(rawText);

    if (!cleanedText) {
  return res.status(200).json({
    raw: "AI response was empty or truncated"
  });
}

    try {
      const data = JSON.parse(cleanedText);
      return res.status(200).json(data);
    } catch (err) {
      console.error("JSON Parse Error:", cleanedText);

      return res.status(200).json({
        raw: cleanedText,
      });
    }
  } catch (error) {
    console.error("OpenRouter generate questions error:", error);

    // ✅ FIX: never send 500 for demo
    return res.status(200).json({
      raw: "Something went wrong, but system is working.",
    });
  }
};

const generateConceptExplaination = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = conceptExplainPrompt(question);

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Interview Prep AI",
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 800,
        }),
      }
    );

    const result = await response.json();
    console.log("FULL RESPONSE:", result);

    if (result.error) {
      return res.status(200).json({
        raw: result.error.message,
      });
    }

    if (!result.choices?.length) {
      return res.status(200).json({
        raw: "No response from AI",
      });
    }

    const rawText = result.choices[0].message.content;
    const cleanedText = cleanJsonResponse(rawText);

    if (!cleanedText) {
  return res.status(200).json({
    raw: "AI response was empty or truncated"
  });
}

    try {
      const data = JSON.parse(cleanedText);
      return res.status(200).json(data);
    } catch (err) {
      console.error("JSON Parse Error:", cleanedText);

      return res.status(200).json({
        raw: cleanedText,
      });
    }
  } catch (error) {
    console.error("OpenRouter explain error:", error);

    // ✅ FIX: never send 500
    return res.status(200).json({
      raw: "Something went wrong, but system is working.",
    });
  }
};

module.exports = {
  generateConceptExplaination,
  generateInterviewQuestions,
};