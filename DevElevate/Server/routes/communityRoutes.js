import express from 'express';
import {
    postQuestion, getQuestions, postAnswer, getAnswers,
    deleteQuestion, markAsResolved, acceptAnswer
} from '../controller/communityController.js';

import { authenticateToken, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Community User Routes
router.post('/questions', authenticateToken, postQuestion);
router.get('/questions', authenticateToken, getQuestions);
router.post('/questions/:id/answers', authenticateToken, postAnswer);
router.get('/questions/:id/answers', authenticateToken, getAnswers);

// Community Admin Routes
router.delete('/questions/:id', authenticateToken, requireAdmin, deleteQuestion);
router.patch('/questions/:id/mark-as-resolved', authenticateToken, requireAdmin, markAsResolved);
router.patch('/questions/answers/:answerId/accept', authenticateToken, requireAdmin, acceptAnswer);

export default router;