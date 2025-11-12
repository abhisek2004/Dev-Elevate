import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import {
  generateAssessment,
  submitAssessment,
  getAssessmentHistory,
  getLatestAssessmentSummary,
} from "../controller/assessmentController.js";

const router = express.Router();

router.post("/generate", authenticateToken, generateAssessment);
router.post("/submit", authenticateToken, submitAssessment);
router.get("/history", authenticateToken, getAssessmentHistory);
router.get("/latest", authenticateToken, getLatestAssessmentSummary);

export default router;

