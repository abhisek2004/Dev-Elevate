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

// ✅ PUBLIC ROUTES - MUST BE FIRST (before parameterized routes)
router.get("/youtube", (req, res, next) => {
  getYouTubeCourses(req, res, next);
});

// ✅ ADMIN ROUTES
router.post("/", requireAdmin, createCourse);
router.get("/", requireAdmin, getAllCourses);
router.delete("/:courseId", requireAdmin, deleteCourse);
router.post("/:courseId/module/:moduleId", requireAdmin, editCourse);

export default router;