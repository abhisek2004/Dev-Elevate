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

router.post("/auth/signup", registerUser);
router.post("/auth/verify-otp", verifySignupOtp);
router.post("/auth/login", loginUser);
router.get("/logout", authenticateToken, logout);
router.post("/auth/google", googleUser);
router.post("/feedback", authenticateToken, feedback);
router.get("/user/streak",authenticateToken,currentStreak)

router.get("/latest-news",latestNews)



export default router;
