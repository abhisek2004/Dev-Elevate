import { Router } from "express";
import { currentStreak, feedback, logout } from "../controllers/user.controller";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router()
router.get("/logout", authenticateToken, logout)
router.post("/feedback", authenticateToken, feedback);
router.get("/user/streak", authenticateToken, currentStreak)
export default router