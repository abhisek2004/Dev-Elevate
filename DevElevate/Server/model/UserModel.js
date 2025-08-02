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
    isSubscribed: {
      type: Boolean,
      default: true,
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
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("User", userSchema);
export default user;
