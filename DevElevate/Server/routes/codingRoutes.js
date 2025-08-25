import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import {
    executeCode,
    submitSolution,
    getProblems,
    getProblemById,
    createProblem,
    updateProblem,
    deleteProblem,
    getSubmissions,
    getLeaderboard,
    getUserStats
} from '../controller/codingController.js';

const router = express.Router();

// Public routes
router.get('/problems', getProblems);
router.get('/problems/:id', getProblemById);
router.get('/leaderboard', getLeaderboard);

// Protected routes
router.post('/execute', authenticateToken, executeCode);
router.post('/submit', authenticateToken, submitSolution);
router.get('/submissions', authenticateToken, getSubmissions);
router.get('/stats', authenticateToken, getUserStats);

// Admin routes (protected)
router.post('/problems', authenticateToken, createProblem);
router.put('/problems/:id', authenticateToken, updateProblem);
router.delete('/problems/:id', authenticateToken, deleteProblem);

export default router;
