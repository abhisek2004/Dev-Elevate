// routes/adminFeedbackRoutes.js
import express from 'express';
import { getAllFeedbacks, updateFeedbackStatus,  deleteFeedback} from '../controller/feedbackController.js';

const router = express.Router();

router.get('/feedback/all',getAllFeedbacks);
router.patch('/feedback/:id/reviewed',updateFeedbackStatus);
router.delete('/feedback/:id', deleteFeedback);

export default router;
