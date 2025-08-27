// models/HackathonSubmission.js
import mongoose from "mongoose";

const repoStatsSchema = new mongoose.Schema({
  stars: {
    type: Number,
    default: 0,
  },
  forks: {
    type: Number,
    default: 0,
  },
  commits: {
    type: Number,
    default: 0,
  },
  contributors: {
    type: Number,
    default: 0,
  },
  size: {
    type: Number,
    default: 0, // Repository size in KB
  },
  language: {
    type: String, // Primary language
  },
  lastUpdated: {
    type: Date,
  },
});

const voteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  votedAt: {
    type: Date,
    default: Date.now,
  },
});

const hackathonSubmissionSchema = new mongoose.Schema(
  {
    hackathonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hackathon",
      required: true,
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      // References team within hackathon, not a separate Team model
    },
    participationType: {
      type: String,
      enum: ["individual", "team"],
      required: true,
    },
    projectTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    projectDescription: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    repositoryUrl: {
      type: String,
      required: true,
      validate: {
        validator: function(url) {
          return /^https:\/\/github\.com\/[\w\-\.]+\/[\w\-\.]+\/?$/.test(url);
        },
        message: 'Please provide a valid GitHub repository URL'
      },
    },
    liveDemoUrl: {
      type: String,
      validate: {
        validator: function(url) {
          if (!url) return true; // Optional field
          return /^https?:\/\/.+/.test(url);
        },
        message: 'Please provide a valid demo URL'
      },
    },
    techStack: [{
      type: String,
      required: true,
      trim: true,
    }],
    features: [{
      type: String,
      trim: true,
    }],
    challenges: {
      type: String,
      maxlength: 500,
    },
    learnings: {
      type: String,
      maxlength: 500,
    },
    repoStats: repoStatsSchema,
    readmeContent: {
      type: String, // Extracted README content for display
    },
    screenshots: [{
      url: String,
      caption: String,
    }],
    videoDemo: {
      type: String, // YouTube/Vimeo URL
    },
    votes: [voteSchema],
    totalVotes: {
      type: Number,
      default: 0,
    },
    judgeScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    finalRank: {
      type: Number,
    },
    isDisqualified: {
      type: Boolean,
      default: false,
    },
    disqualificationReason: {
      type: String,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    lastUpdatedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["draft", "submitted", "under_review", "approved", "rejected"],
      default: "submitted",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
hackathonSubmissionSchema.index({ hackathonId: 1, totalVotes: -1 });
hackathonSubmissionSchema.index({ hackathonId: 1, submittedAt: 1 });
hackathonSubmissionSchema.index({ submittedBy: 1 });
hackathonSubmissionSchema.index({ teamId: 1 });

// Compound index for leaderboard queries
hackathonSubmissionSchema.index({ 
  hackathonId: 1, 
  totalVotes: -1, 
  judgeScore: -1, 
  submittedAt: 1 
});

// Middleware to update totalVotes whenever votes array changes
hackathonSubmissionSchema.pre('save', function(next) {
  if (this.isModified('votes')) {
    this.totalVotes = this.votes.length;
  }
  this.lastUpdatedAt = new Date();
  next();
});

// Prevent duplicate votes from same user
hackathonSubmissionSchema.methods.addVote = function(userId) {
  const existingVote = this.votes.find(vote => 
    vote.user.toString() === userId.toString()
  );
  
  if (existingVote) {
    throw new Error('User has already voted for this submission');
  }
  
  this.votes.push({ user: userId });
  return this.save();
};

// Remove vote from user
hackathonSubmissionSchema.methods.removeVote = function(userId) {
  this.votes = this.votes.filter(vote => 
    vote.user.toString() !== userId.toString()
  );
  return this.save();
};

const HackathonSubmission = mongoose.model("HackathonSubmission", hackathonSubmissionSchema);
export default HackathonSubmission;
