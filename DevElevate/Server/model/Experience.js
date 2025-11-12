import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    designation: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    likedMost: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    howHelped: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    feedback: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    canShow: {
      type: Boolean,
      default: true,
    },
    displayPreference: {
      type: String,
      enum: ["nameAndDesignation", "nameOnly", "anonymous"],
      default: "anonymous",
    },
    isApproved: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Index for efficient queries
experienceSchema.index({ isApproved: 1, canShow: 1, createdAt: -1 });

const Experience = mongoose.model("Experience", experienceSchema);

export default Experience;
