import express from "express";
import {
  submitExperience,
  getApprovedExperiences,
  getAllExperiences,
  approveExperience,
} from "../controller/experienceController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorize.js";

const router = express.Router();

// Public routes
router.post("/submit", submitExperience);
router.get("/approved", getApprovedExperiences);

// Admin-only routes
router.get("/all", authenticateToken, authorize("admin"), getAllExperiences);
router.patch("/:id/approve", authenticateToken, authorize("admin"), approveExperience);

export default router;
