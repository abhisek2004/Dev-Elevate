import express from "express";
const router = express.Router();

import {
  registerUser,
  loginUser,
  currentStreak,
  logout,
  feedback,
} from "../controller/userController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

router.post("/auth/signup", registerUser);
router.post("/auth/login", loginUser);
router.get("/logout", authenticateToken, logout);

router.post("/feedback", authenticateToken, feedback);




router.get("/", authenticateToken, currentStreak);

export default router;
