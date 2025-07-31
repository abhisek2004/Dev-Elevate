// src/utils/gemini.ts

export const generateGeminiResponse = async (
  message: string,
  selectedCategory: string
): Promise<string> => {
  try {
    const prompt =
      selectedCategory.toLowerCase() === "quiz"
        ? `
You are Study Buddy, an AI mentor specializing in DSA quizzes.

Generate **6 deep-level MCQ (multiple choice questions)** based on the topic: "${message}".  
Make sure the questions test strong understanding, not just definitions.  
Each question should have 4 options and clearly mark the **correct answer**.

Format:
1. Question text  
   A) Option A  
   B) Option B  
   C) Option C  
   D) Option D  
   ✅ Correct Answer: X

Only provide the quiz — no explanation or extra text.
        `
        : `
You are Study Buddy, an AI mentor who gives concise, clear, and structured answers for ${selectedCategory} questions.

Respond using Markdown with the following format:

## 📌 Summary  
Brief 1-line summary of the concept.

## Key Concepts
- Important point 1
- Important point 2

## 💡 Example

\`\`\`ts
// Relevant code or example here
\`\`\`

## ✅ Conclusion  
Wrap up with a useful tip or reminder.

User: ${message}
`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${
        import.meta.env.VITE_GEMINI_API_KEY
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await res.json();

    const responseText =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    return responseText;
  } catch (error) {
    console.error("Error fetching Gemini response:", error);
    return "Something went wrong. Please try again.";
  }
};
