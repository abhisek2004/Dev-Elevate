import mongoose, { Document, Model, Schema, Types } from "mongoose";

export type FeedbackStatus = "Pending" | "Reviewed";

export interface IFeedback extends Document {
  userId: Types.ObjectId;
  message: string;
  status: FeedbackStatus;
  submittedAt: Date;
}

const feedbackSchema: Schema<IFeedback> = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: [true, "Please enter feedback message"],
    },
    status: {
      type: String,
      enum: ["Pending", "Reviewed"],
      default: "Pending",
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: false }
);

export const Feedback: Model<IFeedback> = mongoose.model<IFeedback>("Feedback", feedbackSchema);
