import express from 'express';
import { fetchTechFeedArticles } from '../controller/newsAggregator.js';
const router=express.Router();
router.get('/techfeed/latest', fetchTechFeedArticles);
export default router;