// --- RAG + Ollama response ---
const fetchOllamaRAGResponse = async (
  query: string,
  category: string
): Promise<string> => {
  try {
    const prompt = `
You are Study Buddy, an AI mentor specializing in ${category} topics.

User Question:
"${query}"

Respond clearly in Markdown. Be concise, insightful, and beginner-friendly.
`;

    const res = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama2", // Adjust if you're using another Ollama model
        prompt: prompt.trim(),
      }),
    });

    const data = await res.json();
    return data?.response?.trim() || "No response from Ollama.";
  } catch (error) {
    console.error("Ollama RAG Error:", error);
    return "Something went wrong while fetching RAG response.";
  }
};

// --- Gemini quiz generation ---
const fetchGeminiQuizResponse = async (topic: string): Promise<string> => {
  const prompt = `
You are Study Buddy, an AI mentor specializing in DSA quizzes.

Generate **6 deep-level MCQs** on: "${topic}"  
Each question should test conceptual understanding.  
Include 4 options per question and **clearly mark the correct answer**.

Format:
1. Question  
   A) Option A  
   B) Option B  
   C) Option C  
   D) Option D  
   ✅ Correct Answer: X

Only provide the quiz — no extra explanations.
`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
        import.meta.env.VITE_GEMINI_API_KEY
      }`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No quiz generated.";
  } catch (error) {
    console.error("Gemini Quiz Error:", error);
    return "Error while generating quiz.";
  }
};

// --- Master response router ---
export const generateChatbotResponse = async (
  message: string,
  selectedCategory: string
): Promise<string> => {
  const category = selectedCategory.toLowerCase();

  if (category === "quiz") {
    return await fetchGeminiQuizResponse(message);
  }

  return await fetchOllamaRAGResponse(message, category);
};
