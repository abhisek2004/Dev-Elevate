import express from "express";
import { getAIReply, generateAIQuiz } from "../controller/aiController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Existing route for general AI chat
router.post("/gemini", getAIReply);

// New route for AI quiz generation (requires authentication)
router.post("/generate-quiz", authenticateToken, generateAIQuiz);

export default router;