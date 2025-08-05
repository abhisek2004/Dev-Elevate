import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  dayStreak: Types.ObjectId[]; // references VisitingWebsite documents
  currentStreak: number;
  longestStreak: number;
  streakStartDate?: Date | null;
  streakEndDate?: Date | null;
  comparePassword?: (password: string) => Promise<boolean>;
  // other methods if any
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    dayStreak: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VisitingWebsite",
      },
    ],

    currentStreak: {
      type: Number,
      default: 0,
    },
    longestStreak: {
      type: Number,
      default: 0,
    },
    streakStartDate: {
      type: Date,
      default: null,
    },
    streakEndDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
