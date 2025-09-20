import mongoose from "mongoose";

const testResultSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true,
  },
  expectedOutput: {
    type: String,
    required: true,
  },
  actualOutput: {
    type: String,
  },
  status: {
    type: String,
    enum: [
      "Accepted",
      "Wrong Answer",
      "Time Limit Exceeded",
      "Compilation Error",
      "Runtime Error",
      "Judge Error",
      "Unknown Error",
    ],
    default: "Unknown Error",
  },
  executionTime: {
    type: Number, // in milliseconds
    default: 0,
  },
  memory: {
    type: Number, // in kilobytes
    default: 0,
  },
  passed: {
    type: Boolean,
    default: false,
  },
});

const contestSubmissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    contestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contest",
      required: true,
    },
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Accepted",
        "Wrong Answer",
        "Time Limit Exceeded",
        "Compilation Error",
        "Runtime Error",
        "Judge Error",
        "Unknown Error",
      ],
      default: "Unknown Error",
    },
    testResults: [testResultSchema],
    executionTime: {
      type: Number, // max time across all test cases
      default: 0,
    },
    memory: {
      type: Number, // max memory across all test cases
      default: 0,
    },
    points: {
      type: Number,
      default: 0,
    },
    penalty: {
      type: Number, // penalty in milliseconds
      default: 0,
    },
    attempts: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

// Create indexes for efficient querying
contestSubmissionSchema.index({ userId: 1, contestId: 1, problemId: 1 });
contestSubmissionSchema.index({ contestId: 1, status: 1 });
contestSubmissionSchema.index({ contestId: 1, createdAt: 1 });

const ContestSubmission = mongoose.model(
  "ContestSubmission",
  contestSubmissionSchema
);
export default ContestSubmission;
