import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeCareer = async (req, res, next) => {
    const { skills } = req.body;

    if (!skills || skills.trim() === "") {
        return res.status(400).json({ error: "Skills list cannot be empty." });
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

        const prompt = `
            You are an expert AI Career Counselor for the tech industry.
            Based on the following skills: "${skills}", analyze the current job market.
            Provide the top 3 most suitable career paths.
            For each path, provide the job title and a percentage match score representing how well the skills align with the role.
            Respond ONLY with a valid JSON array of objects. Each object must have a "role" key and a "match" key.
            Do not include any text, explanation, or markdown formatting like \`\`\`json.
            Example format: [{"role": "Frontend Developer", "match": "90%"}, {"role": "Data Analyst", "match": "75%"}]
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();

        // Clean the text to ensure it's valid JSON
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        // Parse the JSON string into an actual JSON object
        const jsonResponse = JSON.parse(cleanedText);

        res.status(200).json(jsonResponse);

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        next(error); // Pass error to your global error handler
    }
};