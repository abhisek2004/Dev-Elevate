// ��� User.js - Mongoose model for User
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      default: "",
    },
    socialLinks: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
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
    },
    streakEndDate: {
      type: Date,
    },
    rating: {
      type: Number,
      default: 1500,
    },
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("User", userSchema);
export default user;
