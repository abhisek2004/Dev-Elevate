import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { getDashboardData } from "../controller/dashboardController.js";

const router = express.Router();

// Get all dashboard data
router.get("/", authenticateToken, getDashboardData);

export default router;
