import express from "express";
import { getAIReply } from "../controller/aiController.js";
import { aiRateLimit } from "../middleware/rateLimitMiddleware.js";
const router = express.Router();

router.post("/gemini", aiRateLimit, getAIReply);

export default router;
