import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { getAIReply, generateAIQuiz, generateAINote } from "../controller/aiController.js";
const router = express.Router();

// Existing route for general AI chat
router.post("/gemini", getAIReply);

// New route for AI quiz generation (requires authentication)
router.post("/generate-quiz", authenticateToken, generateAIQuiz);
// NEW: Generate AI notes
router.post("/generate-note", authenticateToken, generateAINote);

export default router;