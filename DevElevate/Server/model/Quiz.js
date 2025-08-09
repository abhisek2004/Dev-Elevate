import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
          type: String,
          enum: ["MCQ", "Code"],
          required: true,
        },
    questions: [
      {
        
        questionText: {
          type: String,
          required: true,
        },
        options: [String], // Only for MCQ
        correctAnswer: String, // Only for MCQ
        expectedOutput: String, // Only for Code
      },
    ],
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
    },
    topic: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
