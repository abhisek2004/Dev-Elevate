// models/Submission.js
import mongoose from 'mongoose';

const testResultSchema = new mongoose.Schema({
  testCaseId: {
    type: String,
    required: true
  },
  input: {
    type: String,
    required: true
  },
  expectedOutput: {
    type: String,
    required: true
  },
  actualOutput: {
    type: String,
    default: ''
  },
  passed: {
    type: Boolean,
    required: true
  },
  runtime: {
    type: Number,
    default: 0
  },
  memory: {
    type: Number,
    default: 0
  },
  error: {
    type: String,
    default: null
  }
});

const submissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem',
    required: true
  },
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true,
    enum: ['python', 'javascript', 'java', 'cpp', 'c']
  },
  results: [testResultSchema],
  passed: {
    type: Boolean,
    required: true
  },
  runtime: {
    type: Number,
    default: 0
  },
  memory: {
    type: Number,
    default: 0
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  executionTime: {
    type: Number, // Time taken to execute all test cases
    default: 0
  }
});

// Index for efficient querying
submissionSchema.index({ userId: 1, submittedAt: -1 });
submissionSchema.index({ problemId: 1, submittedAt: -1 });
submissionSchema.index({ passed: 1, submittedAt: -1 });

// Virtual for success rate calculation
submissionSchema.virtual('successRate').get(function () {
  if (this.results.length === 0) return 0;
  const passedCount = this.results.filter(r => r.passed).length;
  return Math.round((passedCount / this.results.length) * 100);
});

// Ensure virtual fields are serialized
submissionSchema.set('toJSON', { virtuals: true });
submissionSchema.set('toObject', { virtuals: true });

export const Submission = mongoose.model('Submission', submissionSchema);
