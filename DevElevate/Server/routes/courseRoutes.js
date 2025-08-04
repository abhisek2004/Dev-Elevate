import express from "express";
const router = express.Router();
import { requireAdmin } from "../middleware/authMiddleware.js";
import { createCourse, deleteCourse, editCourse, getAllCourses } from"../controller/courseController.js"



// Create a new course
router.post("/", requireAdmin, createCourse);

// Get all courses
router.get("/", requireAdmin, getAllCourses);

// Delete a specific course
router.delete("/:courseId", requireAdmin, deleteCourse);

// Edit a module inside a specific course
router.post("/:courseId/module/:moduleId", requireAdmin, editCourse);

export default router;
