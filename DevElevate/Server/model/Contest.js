import mongoose from "mongoose";

const contestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    problems: {
      type: [String], // Now storing string IDs to match Problem.id field
      default: [],
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    prizes: [
      {
        type: String,
      },
    ],
    ratingChanges: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        oldRating: {
          type: Number,
        },
        newRating: {
          type: Number,
        },
        change: {
          type: Number,
        },
      },
    ],
    status: {
      type: String,
      enum: ["upcoming", "running", "finished"],
      default: "upcoming",
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },
    duration: {
      type: Number, // duration in minutes
      required: true,
    },
    maxParticipants: {
      type: Number,
      default: null, // null means unlimited
    },
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rules: [
      {
        type: String,
      },
    ],
    tags: [
      {
        type: String,
      },
    ],
    problemStats: [
      {
        problemId: String,
        submissions: { type: Number, default: 0 },
        accepted: { type: Number, default: 0 },
      },
    ],
    previousRanks: {
      type: Map,
      of: Number,
      default: {},
    },
    isFinalized: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Indexes for efficient querying
contestSchema.index({ startTime: 1 });
contestSchema.index({ endTime: 1 });
contestSchema.index({ status: 1 });
contestSchema.index({ difficulty: 1 });

// Virtual property to calculate contest duration
contestSchema.virtual("durationHours").get(function () {
  return (this.endTime - this.startTime) / (1000 * 60 * 60);
});

// Method to check if contest is currently running
contestSchema.methods.isRunning = function () {
  const now = new Date();
  return now >= this.startTime && now <= this.endTime;
};

// Method to get contest status based on current time
contestSchema.methods.getCurrentStatus = function () {
  const now = new Date();
  if (now < this.startTime) return "upcoming";
  if (now > this.endTime) return "finished";
  return "running";
};

const Contest = mongoose.model("Contest", contestSchema);
export default Contest;
