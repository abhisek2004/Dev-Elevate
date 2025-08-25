// ��� User.js - Mongoose model for User
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
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
    // Coding platform fields
    problemsSolved: {
      type: Number,
      default: 0
    },
    totalSubmissions: {
      type: Number,
      default: 0
    },
    codingRank: {
      type: String,
      enum: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'],
      default: 'Bronze'
    },
    preferredLanguages: [{
      type: String,
      enum: ['python', 'javascript', 'java', 'cpp', 'c']
    }]
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("User", userSchema);
export default user;
