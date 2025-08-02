//  User.js - Mongoose model for User
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
      required: true,
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
    // New fields for dashboard stats
    totalPoints: {
      type: Number,
      default: 0,
    },
    completedGoals: {
      type: Number,
      default: 0,
    },
    learningProgress: {
      dsa: {
        completed: { type: Number, default: 0 },
        total: { type: Number, default: 12 }
      },
      java: {
        completed: { type: Number, default: 0 },
        total: { type: Number, default: 10 }
      },
      mern: {
        completed: { type: Number, default: 0 },
        total: { type: Number, default: 15 }
      },
      aiml: {
        completed: { type: Number, default: 0 },
        total: { type: Number, default: 18 }
      }
    }
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("User", userSchema);
export default user;
