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
  googleUser,
} from "../controller/userController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

router.route("/signup").post(registerUser);

router.post("/auth/signup", registerUser);
router.post("/auth/login", loginUser);
router.get("/logout", authenticateToken, logout);
router.post("/auth/google", googleUser);
router.post("/feedback", authenticateToken, feedback);
router.get("/user/streak",authenticateToken,currentStreak)



router.route("/login").post(loginUser);
export default router;
