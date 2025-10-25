import express from "express";
const router = express.Router();
import { requireAdmin } from "../middleware/authMiddleware.js";
import { 
  createCourse, 
  deleteCourse, 
  editCourse, 
  getAllCourses,
  getYouTubeCourses 
} from "../controller/courseController.js";

console.log('📌 Course routes loading...');
console.log('   getYouTubeCourses function:', typeof getYouTubeCourses);

// ✅ PUBLIC ROUTES - MUST BE FIRST (before parameterized routes)
router.get("/youtube", (req, res, next) => {
  console.log('🎯 YouTube route hit!');
  getYouTubeCourses(req, res, next);
});

// ✅ ADMIN ROUTES
router.post("/", requireAdmin, createCourse);
router.get("/", requireAdmin, getAllCourses);
router.delete("/:courseId", requireAdmin, deleteCourse);
router.post("/:courseId/module/:moduleId", requireAdmin, editCourse);

console.log('✅ Course routes loaded successfully');

export default router;