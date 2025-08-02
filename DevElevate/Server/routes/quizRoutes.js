import express from "express";
import {
  createQuiz,
  getAllQuizzes,
  
  deleteQuiz,
  updateQuizInfo,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  getQuizById,
} from "../controller/quizController.js";
import { authenticateToken, requireAdmin } from "../middleware/authMiddleware.js";
import {  getAllSubmissionsDetailed } from "../controller/submissionController.js";
const router = express.Router();

// All routes are protected and admin-only
router.use(authenticateToken, requireAdmin);

// Quiz-level routes
router.post("/", createQuiz);
router.get("/", getAllQuizzes);
// router.get("/:quizId",getQuizById)
router.put("/:id", updateQuizInfo);
router.delete("/:id", deleteQuiz);

// Question-level routes
router.post("/:quizId/questions", addQuestion);
router.put("/:quizId/questions/:questionId", updateQuestion);
router.delete("/:quizId/questions/:questionId", deleteQuestion);
router.get("/submissions",getAllSubmissionsDetailed)
router.get("/:quizId",getQuizById)
export default router;
