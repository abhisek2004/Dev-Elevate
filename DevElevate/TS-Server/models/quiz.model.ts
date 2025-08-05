import mongoose, { Schema, Document, Types } from "mongoose";
 
export interface IQuestion {
  questionText: string;
  options?: string[];
  correctAnswer?: string;
  expectedOutput?: string;
}

interface IQuestionDocument extends IQuestion, Document {}

export interface IQuiz extends Document {
  title: string;
  type: "MCQ" | "Code";
  difficulty?: "Easy" | "Medium" | "Hard";
  topic?: string;
  createdBy?: Types.ObjectId;
  questions: Types.DocumentArray<IQuestionDocument>;
}

const QuestionSchema = new Schema<IQuestionDocument>({
  questionText: { type: String, required: true },
  options: [String], // For MCQ only
  correctAnswer: String, // For MCQ only
  expectedOutput: String, // For Code only
});

const QuizSchema = new Schema<IQuiz>({
  title: { type: String, required: true },
  type: { type: String, enum: ["MCQ", "Code"], required: true },
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"] },
  topic: String,
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  questions: [QuestionSchema], // <-- IMPORTANT: Array of subdocuments
});

export const Quiz = mongoose.model<IQuiz>("Quiz", QuizSchema);


