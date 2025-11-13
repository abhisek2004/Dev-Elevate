import mongoose from "mongoose";

const interviewExperienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  position: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
    trim: true,
    maxlength: 100,
  },
  rounds: {
    type: Number,
    required: true,
    min: 1,
  },
  level: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  result: {
    type: String,
    enum: ["selected", "rejected", "pending"],
    required: true,
  },
  tags: {
    type: [String], // e.g., ["Arrays", "System Design", "Behavioral"]
    default: [],
  },
  preview: {
    type: String,
    required: true,
    trim: true,
  },
  tips: {
    type: [String],
    default: [],
  },
});

const InterviewExperience = mongoose.model(
  "InterviewExperience",
  interviewExperienceSchema
);
export default InterviewExperience;
