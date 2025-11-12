import express from "express";
import {
  createInterviewExperience,
  getInterviewExperiences,
} from "../controller/interviewExperienceController.js";

const router = express.Router();

router.post("/", createInterviewExperience);
router.get("/", getInterviewExperiences);

export default router;
