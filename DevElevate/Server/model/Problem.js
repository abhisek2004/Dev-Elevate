import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  examples: [
    {
      input: {
        type: String,
        required: true,
      },
      output: {
        type: String,
        required: true,
      },
      explanation: {
        type: String,
      },
    },
  ],
  constraints: {
    type: [String],
    default: [],
  },
  testCases: [
    {
      id: {
        type: String,
        required: true,
      },
      input: {
        type: String,
        required: true,
      },
      expectedOutput: {
        type: String,
        required: true,
      },
      hidden: {
        type: Boolean,
        default: false,
      },
    },
  ],
  acceptance: {
    type: Number,
  },
  submissions: {
    type: Number,
  },
  starterCode: {
    type: Map,
    of: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
