import mongoose from "mongoose";

const { Schema, Types } = mongoose;

const resourceSchema = new Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String },
    type: {
      type: String,
      enum: ["article", "course", "video", "project", "documentation", "other"],
      default: "article",
    },
    focusAreas: [{ type: String }],
  },
  { _id: false }
);

const questionSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
    prompt: { type: String, required: true },
    type: {
      type: String,
      enum: ["mcq", "short_answer"],
      default: "mcq",
    },
    options: [{ type: String }],
    correctAnswer: { type: String },
    explanation: { type: String },
    category: { type: String },
  },
  { _id: false }
);

const responseSchema = new Schema(
  {
    questionId: { type: Schema.Types.ObjectId, required: true },
    userAnswer: { type: String, required: true },
    isCorrect: { type: Boolean, default: false },
    feedback: { type: String },
    scoreAwarded: { type: Number, default: 0 },
  },
  { _id: false }
);

const roadmapSchema = new Schema(
  {
    focus: { type: String },
    summary: { type: String },
    actionItems: [{ type: String }],
  },
  { _id: false }
);

const skillAssessmentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    track: {
      type: String,
      enum: [
        "dsa",
        "web-development",
        "machine-learning",
        "data-science",
        "cloud-devops",
      ],
      required: true,
    },
    questionCount: { type: Number, required: true },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Intermediate",
    },
    questions: [questionSchema],
    responses: [responseSchema],
    score: { type: Number, min: 0, max: 100, default: 0 },
    accuracy: { type: Number, min: 0, max: 100, default: 0 },
    skillLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    improvementAreas: [{ type: String }],
    recommendedResources: [resourceSchema],
    roadmapRecommendations: roadmapSchema,
    status: {
      type: String,
      enum: ["generated", "completed"],
      default: "generated",
    },
    timeTaken: {
      type: Number,
      min: 0,
    },
    generatedAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

skillAssessmentSchema.index({ userId: 1, createdAt: -1 });

const SkillAssessment = mongoose.model(
  "SkillAssessment",
  skillAssessmentSchema
);

export default SkillAssessment;

