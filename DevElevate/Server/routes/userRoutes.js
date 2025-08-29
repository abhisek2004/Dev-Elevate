import express from "express";
const router = express.Router();

import {
  registerUser,
  verifySignupOtp,
  loginUser,
  currentStreak,
  logout,
  feedback,
  googleUser,
  latestNews,
} from "../controller/userController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { authRateLimit, otpRateLimit, feedbackRateLimit, readRateLimit } from "../middleware/rateLimitMiddleware.js";

router.post("/auth/signup", authRateLimit, registerUser);
router.post("/auth/verify-otp", otpRateLimit, verifySignupOtp);
router.post("/auth/login", authRateLimit, loginUser);
router.get("/logout", authenticateToken, logout);
router.post("/auth/google", authRateLimit, googleUser);
router.post("/feedback", feedbackRateLimit, authenticateToken, feedback);
router.get("/user/streak", readRateLimit, authenticateToken, currentStreak)

router.get("/latest-news", readRateLimit, latestNews)



export default router;
