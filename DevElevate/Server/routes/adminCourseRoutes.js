import express from "express";
const router = express.Router();
import { authenticateToken, requireAdmin } from "../middleware/authMiddleware.js";
import { 
  createAdminCourse,
  getAllAdminCourses,
  getAdminCourse,
  updateAdminCourse,
  deleteAdminCourse,
  fetchYouTubeDetails,
  getAdminCourseStats
} from "../controller/adminCourseController.js";


// ✅ PUBLIC ROUTES - No authentication required (for users to view courses)
router.get("/stats", getAdminCourseStats);  // Must be BEFORE /:courseId
router.get("/", getAllAdminCourses);
router.get("/:courseId", getAdminCourse);

// ✅ ADMIN PROTECTED ROUTES - Require authentication + admin role
// Note: authenticateToken sets req.user, then requireAdmin checks req.user.role
router.post("/fetch-youtube", authenticateToken, requireAdmin, fetchYouTubeDetails);
router.post("/", authenticateToken, requireAdmin, createAdminCourse);
router.put("/:courseId", authenticateToken, requireAdmin, updateAdminCourse);
router.delete("/:courseId", authenticateToken, requireAdmin, deleteAdminCourse);

export default router;