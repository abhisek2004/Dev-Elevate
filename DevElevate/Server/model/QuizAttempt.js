import mongoose from "mongoose";

const quizAttemptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        userAnswer: String,
        isCorrect: Boolean,
      },
    ],
    score: {
      type: Number,
      default: 0,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    timeTaken: {
      type: Number, // in seconds
      default: 0,
    },
    isGenerated: {
      type: Boolean,
      default: false, // true if quiz is just generated but not actually attempted
    },
  },
  { timestamps: true }
);

// Index for faster queries
quizAttemptSchema.index({ userId: 1, quizId: 1 });

const QuizAttempt = mongoose.model("QuizAttempt", quizAttemptSchema);
export default QuizAttempt;