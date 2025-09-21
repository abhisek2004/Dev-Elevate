import express from "express";
import {
  getContestsByStatus,
  getUserStats,
  getContestById,
  registerForContest,
  getContestProblems,
  submitSolution,
  getContestLeaderboard,
  getContestProblem,
  runContestProblem,
  getContestResults,
  getContestRating,
} from "../controller/contestController.js";
import { authenticateToken as protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getContestsByStatus);

// Protected routes

router.get("/user-stats", protect, getUserStats);
router.get("/user/rating", protect, getContestRating);
router.get("/:id", protect, getContestById);
router.get("/:id/problems", protect, getContestProblems);
router.get("/:id/leaderboard", protect, getContestLeaderboard);
router.get("/:contestId/problems/:problemId", protect, getContestProblem);
router.get("/:contestId/results", protect, getContestResults);
router.post("/register/:id", protect, registerForContest);
router.post("/:id/submit", protect, submitSolution);
router.post("/:contestId/problems/:problemId/run", protect, runContestProblem);

export default router;
