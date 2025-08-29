// routes/hackathonRoutes.js
import express from "express";
const router = express.Router();

import {
  createHackathon,
  listHackathons,
  getHackathon,
  registerToHackathon,
  createTeam,
  joinTeam,
  submitProject,
  getLeaderboard,
  voteSubmission,
  unvoteSubmission,
} from "../controller/hackathonController.js";

import { authenticateToken } from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorize.js";
import { contentRateLimit, readRateLimit } from "../middleware/rateLimitMiddleware.js";

// Public routes
router.get("/", readRateLimit, listHackathons); // GET /api/v1/hackathons
router.get("/:id", readRateLimit, getHackathon); // GET /api/v1/hackathons/:id

// User routes (require authentication)
router.post("/:id/register", contentRateLimit, authenticateToken, registerToHackathon); // POST /api/v1/hackathons/:id/register
router.post("/:id/create-team", contentRateLimit, authenticateToken, createTeam); // POST /api/v1/hackathons/:id/create-team
router.post("/:id/join-team", contentRateLimit, authenticateToken, joinTeam); // POST /api/v1/hackathons/:id/join-team
router.post("/:id/submit", contentRateLimit, authenticateToken, submitProject); // POST /api/v1/hackathons/:id/submit
router.get("/:id/leaderboard", readRateLimit, getLeaderboard); // GET /api/v1/hackathons/:id/leaderboard
router.post("/vote", contentRateLimit, authenticateToken, voteSubmission); // POST /api/v1/hackathons/vote
router.post("/unvote", contentRateLimit, authenticateToken, unvoteSubmission); // POST /api/v1/hackathons/unvote

// Admin routes (require admin role)
router.post("/create", contentRateLimit, authenticateToken, authorize("admin"), createHackathon); // POST /api/v1/hackathons/create

export default router;
