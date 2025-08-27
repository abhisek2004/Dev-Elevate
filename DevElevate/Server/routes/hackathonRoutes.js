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

// Public routes
router.get("/", listHackathons); // GET /api/v1/hackathons
router.get("/:id", getHackathon); // GET /api/v1/hackathons/:id

// User routes (require authentication)
router.post("/:id/register", authenticateToken, registerToHackathon); // POST /api/v1/hackathons/:id/register
router.post("/:id/create-team", authenticateToken, createTeam); // POST /api/v1/hackathons/:id/create-team
router.post("/:id/join-team", authenticateToken, joinTeam); // POST /api/v1/hackathons/:id/join-team
router.post("/:id/submit", authenticateToken, submitProject); // POST /api/v1/hackathons/:id/submit
router.get("/:id/leaderboard", getLeaderboard); // GET /api/v1/hackathons/:id/leaderboard
router.post("/vote", authenticateToken, voteSubmission); // POST /api/v1/hackathons/vote
router.post("/unvote", authenticateToken, unvoteSubmission); // POST /api/v1/hackathons/unvote

// Admin routes (require admin role)
router.post("/create", authenticateToken, authorize("admin"), createHackathon); // POST /api/v1/hackathons/create

export default router;
