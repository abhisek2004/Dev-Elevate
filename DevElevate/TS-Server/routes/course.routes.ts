import { Router } from "express";
import { googleUser, loginUser, registerUser } from "../controllers/user.controller";
import { createCourse, deleteCourse, editCourse, getAllCourses } from "../controllers/course.controller";

const router = Router()

// Create a new course
router.post("/", createCourse);

// Get all courses
router.get("/", getAllCourses);

// Delete a specific course
router.delete("/:courseId", deleteCourse);

// Edit a module inside a specific course
router.post("/:courseId/module/:moduleId", editCourse);

export default router