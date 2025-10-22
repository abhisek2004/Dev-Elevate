// routes/videoProgressRoutes.js
import express from "express";
const router = express.Router();

import {
  updateVideoProgress,
  getVideoProgress,
  getContinueLearning,
  getCourseProgress,
  saveVideo,
  unsaveVideo,
  getSavedVideos,
  checkIfVideoSaved,
} from "../controller/videoProgressController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

// All routes require authentication
// Progress tracking routes
router.post("/progress", authenticateToken, updateVideoProgress);
router.get("/progress/:videoId", authenticateToken, getVideoProgress);
router.get("/continue-learning", authenticateToken, getContinueLearning);
router.get("/course-progress/:courseId", authenticateToken, getCourseProgress);

// Saved videos routes
router.post("/saved", authenticateToken, saveVideo);
router.delete("/saved/:videoId", authenticateToken, unsaveVideo);
router.get("/saved", authenticateToken, getSavedVideos);
router.get("/saved/check/:videoId", authenticateToken, checkIfVideoSaved);

export default router;