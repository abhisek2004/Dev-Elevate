import express from "express";
import {
  getUserQuizzes,
  getQuizForAttempt,
  submitQuizAttempt,
  getUserQuizAttempts
} from "../controller/userQuizController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get all available quizzes
router.get("/", getUserQuizzes);

// Get user's quiz attempts
router.get("/attempts", getUserQuizAttempts);

// Get specific quiz for attempting
router.get("/:quizId", getQuizForAttempt);

// Submit quiz attempt
router.post("/:quizId/submit", submitQuizAttempt);

export default router;