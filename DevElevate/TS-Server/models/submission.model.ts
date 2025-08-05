import mongoose, { Document, Model, Schema, Types } from "mongoose";
import {IUser} from "./user.model"
export interface IAnswer {
  questionId: Types.ObjectId;
  givenAnswer: string;
  output?: string;
}

export interface ISubmission extends Document {
  userId: Types.ObjectId | IUser; // <-- fix: allow populated user
  quizId: Types.ObjectId;
  answers: IAnswer[];
  score: number;
  submittedAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const answerSchema = new mongoose.Schema<IAnswer>(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    givenAnswer: {
      type: String,
      required: true,
    },
    output: {
      type: String,
    },
  },
  { _id: false }
);

const submissionSchema: Schema<ISubmission> = new mongoose.Schema(
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

export const Submission: Model<ISubmission> = mongoose.model<ISubmission>(
  "Submission",
  submissionSchema
);
