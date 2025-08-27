// models/Hackathon.js
import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
    trim: true,
  },
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  inviteCode: {
    type: String,
    required: true,
    unique: true,
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

const prizeSchema = new mongoose.Schema({
  position: {
    type: String,
    required: true, // "1st", "2nd", "3rd", etc.
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  value: {
    type: String, // e.g., "$1000", "Trophy + Certificate"
  },
});

const hackathonSchema = new mongoose.Schema(
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
    theme: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    registrationDeadline: {
      type: Date,
      required: true,
    },
    maxTeamSize: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    minTeamSize: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    prizes: [prizeSchema],
    rules: [{
      type: String,
      required: true,
    }],
    judgingCriteria: [{
      type: String,
      required: true,
    }],
    status: {
      type: String,
      enum: ["upcoming", "active", "judging", "ended"],
      default: "upcoming",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    allowIndividualParticipation: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participants: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      registeredAt: {
        type: Date,
        default: Date.now,
      },
      participationType: {
        type: String,
        enum: ["individual", "team"],
        required: true,
      },
    }],
    teams: [teamSchema],
    totalParticipants: {
      type: Number,
      default: 0,
    },
    totalTeams: {
      type: Number,
      default: 0,
    },
    bannerImage: {
      type: String, // URL to banner image
    },
    tags: [{
      type: String,
      trim: true,
    }],
    submissionCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
hackathonSchema.index({ status: 1, isPublished: 1 });
hackathonSchema.index({ startDate: 1, endDate: 1 });
hackathonSchema.index({ createdBy: 1 });

// Middleware to update status based on dates
hackathonSchema.pre('find', function() {
  const now = new Date();
  this.updateMany(
    {
      startDate: { $lte: now },
      endDate: { $gte: now },
      status: 'upcoming'
    },
    { status: 'active' }
  );
  
  this.updateMany(
    {
      endDate: { $lt: now },
      status: { $in: ['upcoming', 'active'] }
    },
    { status: 'ended' }
  );
});

const Hackathon = mongoose.model("Hackathon", hackathonSchema);
export default Hackathon;
