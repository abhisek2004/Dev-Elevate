import express from 'express';
import { analyzeCareer } from '../controller/counselor.controller.js'; // Note: 'controller', not 'controllers'

const router = express.Router();

router.post('/analyze', analyzeCareer);

export default router;