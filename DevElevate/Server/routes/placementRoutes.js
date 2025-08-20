import express from 'express';
import {
    getJobOpportunities,
    getJobById,
    applyToJob,
    getUserApplications,
    createInterviewSession,
    getInterviewSessions,
    updateInterviewSession,
    getResources,
    downloadResource,
    startAIMockInterview,
    fetchExternalJobs
} from '../controller/placementController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Job Opportunities Routes
router.get('/jobs', getJobOpportunities);
router.get('/jobs/:id', getJobById);
router.post('/jobs/:jobId/apply', authenticateToken, applyToJob);
router.get('/users/:userId/applications', authenticateToken, getUserApplications);

// Interview Sessions Routes
router.post('/interviews', authenticateToken, createInterviewSession);
router.get('/interviews', authenticateToken, getInterviewSessions);
router.put('/interviews/:id', authenticateToken, updateInterviewSession);
router.post('/interviews/ai-mock', authenticateToken, startAIMockInterview);

// Resources Routes
router.get('/resources', getResources);
router.post('/resources/:id/download', authenticateToken, downloadResource);

// External Job APIs
router.get('/external-jobs', fetchExternalJobs);

export default router;
