import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface ICourse extends Document {
  courseTitle: string;
  subTitle?: string;
  description?: string;
  dificulty?: string;
  modules?: Types.ObjectId;
  tags: string[];
  coursePrice?: number;
  courseThumbnail?: string;
  createdBy?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const courseSchema: Schema<ICourse> = new mongoose.Schema(
  {
    courseTitle: {
      type: String,
      required: [true, "Please enter the course title"],
    },
    subTitle: {
      type: String,
    },
    description: {
      type: String,
    },
    dificulty: {
      type: String,
    },
    modules: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LearningModule",
    },
    tags: {
      type: [String],
      default: [],
    },
    coursePrice: {
      type: Number,
    },
    courseThumbnail: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    createdAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Course: Model<ICourse> = mongoose.model<ICourse>("Course", courseSchema);
