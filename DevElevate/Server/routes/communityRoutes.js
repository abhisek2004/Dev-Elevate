import express from 'express';
import {
    postQuestion, getQuestions, postAnswer, getAnswers,
    deleteQuestion, markAsResolved, acceptAnswer
} from '../controller/communityController.js';

import { authenticateToken, requireAdmin } from '../middleware/authMiddleware.js';
import { contentRateLimit, readRateLimit } from '../middleware/rateLimitMiddleware.js';

const router = express.Router();

// Community User Routes
router.post('/questions', contentRateLimit, authenticateToken, postQuestion);
router.get('/questions', readRateLimit, authenticateToken, getQuestions);
router.post('/questions/:id/answers', contentRateLimit, authenticateToken, postAnswer);
router.get('/questions/:id/answers', readRateLimit, authenticateToken, getAnswers);

// Community Admin Routes
router.delete('/questions/:id', authenticateToken, requireAdmin, deleteQuestion);
router.patch('/questions/:id/mark-as-resolved', authenticateToken, requireAdmin, markAsResolved);
router.patch('/questions/answers/:answerId/accept', authenticateToken, requireAdmin, acceptAnswer);

export default router;