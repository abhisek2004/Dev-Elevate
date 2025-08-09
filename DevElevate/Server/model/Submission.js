// models/Submission.js
import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId, // references a question's _id
    required: true,
  },
  givenAnswer: {
    type: String,
    required: true,
  },
  output: {
    type: String, // optional, for code-based question outputs
  },
});

const submissionSchema = new mongoose.Schema(
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
    answers: {
      type: [answerSchema],
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Submission = mongoose.model("Submission", submissionSchema);
export default Submission;
