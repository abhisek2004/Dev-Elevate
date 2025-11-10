// routes/adminRoutes.js
import express from "express";
import rateLimit from "express-rate-limit";
import {
  addUser,
  createAdminLog,
  deleteUserById,
  getAdminLogs,
  getAllUserRegister,
  getAdminStats,
  getActiveUsers,
  updateUserById,
} from "../controller/adminController.js";
import { authenticateToken, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Rate limiting middleware for sensitive admin endpoints
const adminReadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  skip: (req) => req.user?.role === "admin", // Skip rate limiting for admin users
});

const adminWriteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // more restrictive for write operations
  message: "Too many write requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.user?.role === "admin",
});

// ✅ Create a system log
router.post("/system-log", adminWriteLimiter, authenticateToken, createAdminLog);

// ✅ Get all system logs
router.get("/system-logs", adminReadLimiter, authenticateToken, requireAdmin, getAdminLogs);

// ✅ Add a new user
router.post("/add-user", adminWriteLimiter, authenticateToken, requireAdmin, addUser);

// ✅ Get all registered users
router.get("/all-users", adminReadLimiter, authenticateToken, requireAdmin, getAllUserRegister);

// ✅ Delete user by ID (better to pass ID in URL param)
router.delete("/delete-user/:id", adminWriteLimiter, authenticateToken, requireAdmin, deleteUserById);

// ✅ Get dashboard statistics
router.get("/stats", adminReadLimiter, authenticateToken, requireAdmin, getAdminStats);

// ✅ Get active users
router.get("/users/active", adminReadLimiter, authenticateToken, requireAdmin, getActiveUsers);

// ✅ Update user by ID
router.put("/users/:id", adminWriteLimiter, authenticateToken, requireAdmin, updateUserById);

export default router;

