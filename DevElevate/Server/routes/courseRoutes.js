import express from "express";
import { createCourse, editCourse, deleteCourse, getAllCourses } from "../controller/courseController.js";
import { requireAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(requireAdmin, createCourse);
router.route("/").get(requireAdmin, getAllCourses);
router.route("/:courseId").delete(requireAdmin, deleteCourse);
router.route("/:courseId/module/:moduleId").post(requireAdmin, editCourse);

export default router;