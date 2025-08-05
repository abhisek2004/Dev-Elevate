import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface ILearningModule extends Document {
  courseId?: Types.ObjectId;
  moduleTitle?: string;
  videoUrl?: string;
  resourceLinks?: string;
  duration?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const moduleSchema: Schema<ILearningModule> = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    moduleTitle: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
    resourceLinks: {
      type: String,
    },
    duration: {
      type: String,
    },
  },
  { timestamps: true }
);

export const LearningModule: Model<ILearningModule> = mongoose.model<ILearningModule>(
  "LearningModule",
  moduleSchema
);
