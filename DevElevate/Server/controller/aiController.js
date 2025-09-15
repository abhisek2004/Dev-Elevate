import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const getAIReply = async (req, res) => {
  const { message, category } = req.body;
  if (!message) return res.status(400).json({ error: "No input provided" });
  try {
    // Build prompt based on category
    let prompt = message;
    if (category && category.toLowerCase() === "quiz") {
      prompt = `You are Study Buddy, an AI mentor specializing in DSA quizzes.\nGenerate 6 deep-level MCQ (multiple choice questions) based on the topic: \"${message}\".\nMake sure the questions test strong understanding, not just definitions.\nEach question should have 4 options and clearly mark the correct answer.\nFormat:\n1. Question text\nA) Option A\nB) Option B\nC) Option C\nD) Option D\n✅ Correct Answer: X\nOnly provide the quiz — no explanation or extra text.`;
    }
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const aiText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No reply received";
    console.log("[Gemini Response]", { aiText });
    res.status(200).json({ reply: aiText });
  } catch (error) {
    let status = error.response?.status;
    let errorMsg = error.response?.data || error.message;
    console.error("Gemini API error:", errorMsg);
    if (status === 429) {
      return res
        .status(429)
        .json({
          error: "Gemini API rate limit exceeded. Please try again later.",
        });
    }
    res.status(500).json({ error: "AI service is unavailable" });
  }
};
