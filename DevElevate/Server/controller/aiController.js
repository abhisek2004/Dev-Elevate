import axios from "axios";
import dotenv from "dotenv";
import Quiz from "../model/Quiz.js";
import QuizAttempt from "../model/QuizAttempt.js";
dotenv.config();

// Existing getAIReply function...
export const getAIReply = async (req, res) => {
  const { message, category } = req.body;
  if (!message) return res.status(400).json({ error: "No input provided" });
  try {
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
      return res.status(429).json({
        error: "Gemini API rate limit exceeded. Please try again later.",
      });
    }
    res.status(500).json({ error: "AI service is unavailable" });
  }
};

// NEW FUNCTION: Generate AI Quiz
export const generateAIQuiz = async (req, res) => {
  try {
    const { topic, difficulty, type, questionCount } = req.body;
    const userId = req.user.id;

    if (!topic || !difficulty || !type || !questionCount) {
      return res.status(400).json({ 
        message: "Missing required fields: topic, difficulty, type, questionCount" 
      });
    }

    // Build prompt based on quiz type
    let prompt = "";
    
    if (type === "MCQ") {
      prompt = `Generate ${questionCount} multiple choice questions about "${topic}" at ${difficulty} difficulty level.

IMPORTANT: Return ONLY a valid JSON object with this exact structure (no markdown, no code blocks, no extra text):
{
  "questions": [
    {
      "questionText": "Question here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option A"
    }
  ]
}

Requirements:
- Generate exactly ${questionCount} questions
- Each question must have exactly 4 options
- Questions should be challenging and test deep understanding
- correctAnswer must be one of the options exactly as written
- Return ONLY the JSON object, nothing else`;
    } else if (type === "Code") {
      prompt = `Generate ${questionCount} coding problems about "${topic}" at ${difficulty} difficulty level.

IMPORTANT: Return ONLY a valid JSON object with this exact structure (no markdown, no code blocks, no extra text):
{
  "questions": [
    {
      "questionText": "Problem statement with requirements",
      "expectedOutput": "Expected output or solution approach"
    }
  ]
}

Requirements:
- Generate exactly ${questionCount} coding problems
- Each problem should include clear input/output requirements
- Problems should be at ${difficulty} level
- Include expectedOutput for validation
- Return ONLY the JSON object, nothing else`;
    }

    // Call Gemini API
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

    const aiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!aiText) {
      return res.status(500).json({ message: "Failed to generate quiz content" });
    }

    // Parse the AI response
    let parsedQuestions;
    try {
      // Remove markdown code blocks if present
      const cleanedText = aiText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      
      parsedQuestions = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      console.log("AI Response:", aiText);
      return res.status(500).json({ 
        message: "Failed to parse AI generated questions",
        debug: aiText 
      });
    }

    // Validate and format questions
    const questions = parsedQuestions.questions.map(q => {
      if (type === "MCQ") {
        return {
          questionText: q.questionText,
          options: q.options,
          correctAnswer: q.correctAnswer
        };
      } else {
        return {
          questionText: q.questionText,
          expectedOutput: q.expectedOutput
        };
      }
    });

    // Create quiz in database
    const quiz = new Quiz({
      title: `${topic} - ${difficulty} (AI Generated)`,
      topic,
      difficulty,
      type,
      questions,
      createdBy: userId,
      isAIGenerated: true
    });

    await quiz.save();

    // Automatically create an attempt entry so it shows in user's AI generated section
    const quizAttempt = new QuizAttempt({
      userId,
      quizId: quiz._id,
      answers: [], // Empty initially
      score: 0,
      totalQuestions: questions.length,
      timeTaken: 0,
      isGenerated: true, // Flag to show it's just generated, not actually attempted
      createdAt: new Date()
    });

    await quizAttempt.save();

    res.status(201).json({ 
      message: "AI Quiz generated successfully", 
      quiz: {
        _id: quiz._id,
        title: quiz.title,
        topic: quiz.topic,
        difficulty: quiz.difficulty,
        type: quiz.type,
        questionCount: questions.length,
        isAIGenerated: true
      }
    });

  } catch (error) {
    console.error("Error generating AI quiz:", error);
    
    if (error.response?.status === 429) {
      return res.status(429).json({
        message: "AI service rate limit exceeded. Please try again later.",
      });
    }
    
    res.status(500).json({ 
      message: "Failed to generate AI quiz",
      error: error.message 
    });
  }
};