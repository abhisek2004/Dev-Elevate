import express from "express";
const router = express.Router();

import {
  registerUser,
  loginUser,
  currentStreak,
  logout,
  feedback,
  getDashboardStats,
  updateUserPoints,
  updateLearningProgress,
  updateCompletedGoals,
  completeModule,
} from "../controller/userController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

router.post("/auth/signup", registerUser);
router.post("/auth/login", loginUser);
router.get("/logout", authenticateToken, logout);

router.post("/feedback", authenticateToken, feedback);

// Dashboard stats
router.get("/dashboard-stats", authenticateToken, getDashboardStats);

// Update functions
router.post("/update-points", authenticateToken, updateUserPoints);
router.post(
  "/update-learning-progress",
  authenticateToken,
  updateLearningProgress
);
router.post("/update-completed-goals", authenticateToken, updateCompletedGoals);
router.post("/complete-module", authenticateToken, completeModule);

router.get("/", authenticateToken, currentStreak);

export default router;
