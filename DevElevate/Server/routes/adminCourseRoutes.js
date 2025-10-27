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

console.log('📌 Admin Course routes loading...');

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

console.log('✅ Admin Course routes loaded successfully');
console.log('   GET  /api/v1/admin-courses');
console.log('   GET  /api/v1/admin-courses/stats');
console.log('   GET  /api/v1/admin-courses/:courseId');
console.log('   POST /api/v1/admin-courses (Admin only)');
console.log('   POST /api/v1/admin-courses/fetch-youtube (Admin only)');
console.log('   PUT  /api/v1/admin-courses/:courseId (Admin only)');
console.log('   DELETE /api/v1/admin-courses/:courseId (Admin only)');

export default router;