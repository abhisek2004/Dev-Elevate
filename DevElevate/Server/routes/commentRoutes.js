import { Router } from "express";
import {
    createComment,
    updateComment,
    deleteComment,
    getCommentsByNews
} from '../controller/commentController.js'
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();


router.route("/create-comment/:newsId").post(authenticateToken, createComment)
router.route("/update-comment/:commentId").post(authenticateToken, updateComment)
router.route("/delete-comment/:commentId").post(authenticateToken,deleteComment)
router.route("/get-comments-on-news/:newsId").get(getCommentsByNews)

export default router