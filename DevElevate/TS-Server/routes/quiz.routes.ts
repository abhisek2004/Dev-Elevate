import { Router } from "express";
import { addQuestion, createQuiz, deleteQuestion, deleteQuiz, getAllQuizzes, getQuizById, updateQuestion, updateQuizInfo } from "../controllers/quiz.controller";
import { getAllSubmissionsDetailed } from "../controllers/submission.controller";

const router = Router()
router.post("/", createQuiz);
router.get("/", getAllQuizzes);

router.put("/:id", updateQuizInfo);
router.delete("/:id", deleteQuiz);

// Question-level routes
router.post("/:quizId/questions", addQuestion);
router.put("/:quizId/questions/:questionId", updateQuestion);
router.delete("/:quizId/questions/:questionId", deleteQuestion);
router.get("/submissions", getAllSubmissionsDetailed)
router.get("/:quizId", getQuizById)


export default router