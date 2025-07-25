import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false, // Password is optional for OAuth users
    },
    provider: {
      type: String,
      enum: ["google", "manual"],
      default: "manual",
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
