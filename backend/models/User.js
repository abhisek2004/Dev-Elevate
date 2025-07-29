import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  // Basic user information
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't include password in query results by default
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  avatar: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters'],
    default: ''
  },
  
  // Social links (basic)
  socialLinks: {
    linkedin: {
      type: String,
      default: ''
    },
    github: {
      type: String,
      default: ''
    },
    twitter: {
      type: String,
      default: ''
    },
    website: {
      type: String,
      default: ''
    }
  },

  // GitHub Integration Data
  githubIntegration: {
    isConnected: {
      type: Boolean,
      default: false
    },
    username: {
      type: String,
      default: null
    },
    accessToken: {
      type: String,
      default: null,
      select: false // Don't include in query results
    },
    profile: {
      id: Number,
      login: String,
      name: String,
      avatar_url: String,
      bio: String,
      company: String,
      location: String,
      email: String,
      blog: String,
      public_repos: Number,
      public_gists: Number,
      followers: Number,
      following: Number,
      created_at: Date,
      updated_at: Date
    },
    repositories: [{
      id: Number,
      name: String,
      full_name: String,
      description: String,
      html_url: String,
      clone_url: String,
      language: String,
      languages: mongoose.Schema.Types.Mixed, // Object containing language stats
      stargazers_count: Number,
      watchers_count: Number,
      forks_count: Number,
      open_issues_count: Number,
      created_at: Date,
      updated_at: Date,
      pushed_at: Date,
      size: Number,
      topics: [String],
      visibility: String,
      default_branch: String
    }],
    stats: {
      totalCommits: {
        type: Number,
        default: 0
      },
      totalPRs: {
        type: Number,
        default: 0
      },
      totalIssues: {
        type: Number,
        default: 0
      },
      contributionGraph: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
      },
      topLanguages: [{
        name: String,
        percentage: Number,
        color: String,
        bytes: Number
      }],
      recentActivity: [{
        type: String, // 'push', 'pull_request', 'issues', etc.
        repo: String,
        action: String,
        created_at: Date,
        url: String
      }]
    },
    lastSynced: {
      type: Date,
      default: null
    }
  },

  // LinkedIn Integration Data
  linkedinIntegration: {
    isConnected: {
      type: Boolean,
      default: false
    },
    profileUrl: {
      type: String,
      default: null
    },
    profile: {
      name: String,
      headline: String,
      profilePicture: String,
      location: String,
      industry: String,
      summary: String,
      connectionCount: String,
      profileViews: String
    },
    experience: [{
      title: String,
      company: String,
      companyLogo: String,
      location: String,
      startDate: String,
      endDate: String,
      duration: String,
      description: String,
      employmentType: String, // Full-time, Part-time, Contract, etc.
      skills: [String]
    }],
    education: [{
      institution: String,
      degree: String,
      fieldOfStudy: String,
      startDate: String,
      endDate: String,
      grade: String,
      activities: String,
      description: String
    }],
    skills: [{
      name: String,
      endorsements: Number,
      endorsedBy: [String]
    }],
    certifications: [{
      name: String,
      issuingOrganization: String,
      issueDate: String,
      expirationDate: String,
      credentialId: String,
      credentialUrl: String,
      skills: [String]
    }],
    languages: [{
      name: String,
      proficiency: String // Native, Professional, Limited Working, Elementary
    }],
    lastSynced: {
      type: Date,
      default: null
    }
  },

  // User progress and learning data
  progress: {
    level: {
      type: String,
      default: 'Beginner'
    },
    totalPoints: {
      type: Number,
      default: 0
    },
    streak: {
      type: Number,
      default: 0
    },
    coursesEnrolled: [{
      courseId: String,
      courseName: String,
      progress: Number,
      enrolledAt: Date,
      lastAccessed: Date
    }],
    completedModules: {
      type: Number,
      default: 0
    },
    badges: [{
      name: String,
      description: String,
      iconUrl: String,
      earnedAt: Date
    }]
  },

  // Account settings
  settings: {
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'light'
    },
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      push: {
        type: Boolean,
        default: true
      },
      weekly_digest: {
        type: Boolean,
        default: true
      },
      course_updates: {
        type: Boolean,
        default: true
      }
    },
    privacy: {
      showProfile: {
        type: Boolean,
        default: true
      },
      showProgress: {
        type: Boolean,
        default: true
      },
      showGithubStats: {
        type: Boolean,
        default: true
      },
      showLinkedinInfo: {
        type: Boolean,
        default: true
      }
    }
  },

  // Account metadata
  joinDate: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  lastActive: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  versionKey: false
});

// Indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ 'githubIntegration.username': 1 });
userSchema.index({ 'githubIntegration.isConnected': 1 });
userSchema.index({ 'linkedinIntegration.isConnected': 1 });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS) || 12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to get public profile data
userSchema.methods.getPublicProfile = function() {
  const user = this.toObject();
  delete user.password;
  delete user.githubIntegration.accessToken;
  return user;
};

// Method to check if GitHub data needs refresh
userSchema.methods.shouldRefreshGitHubData = function() {
  if (!this.githubIntegration.isConnected || !this.githubIntegration.lastSynced) {
    return true;
  }
  
  const lastSynced = new Date(this.githubIntegration.lastSynced);
  const now = new Date();
  const hoursSinceLastSync = (now - lastSynced) / (1000 * 60 * 60);
  
  return hoursSinceLastSync >= 24; // Refresh every 24 hours
};

// Method to check if LinkedIn data needs refresh
userSchema.methods.shouldRefreshLinkedInData = function() {
  if (!this.linkedinIntegration.isConnected || !this.linkedinIntegration.lastSynced) {
    return true;
  }
  
  const lastSynced = new Date(this.linkedinIntegration.lastSynced);
  const now = new Date();
  const daysSinceLastSync = (now - lastSynced) / (1000 * 60 * 60 * 24);
  
  return daysSinceLastSync >= 7; // Refresh weekly
};

// Static method to find users with similar GitHub stats
userSchema.statics.findGitHubTwins = async function(userId, stats = {}) {
  const { topLanguages = [], totalRepos = 0, totalCommits = 0 } = stats;
  
  const pipeline = [
    {
      $match: {
        _id: { $ne: new mongoose.Types.ObjectId(userId) },
        'githubIntegration.isConnected': true,
        'settings.privacy.showGithubStats': true
      }
    },
    {
      $addFields: {
        similarityScore: {
          $add: [
            // Language similarity (0-40 points)
            {
              $multiply: [
                {
                  $size: {
                    $setIntersection: [
                      { $map: { input: '$githubIntegration.stats.topLanguages', as: 'lang', in: '$$lang.name' } },
                      topLanguages.map(lang => lang.name)
                    ]
                  }
                },
                10
              ]
            },
            // Repository count similarity (0-30 points)
            {
              $subtract: [
                30,
                {
                  $min: [
                    30,
                    {
                      $abs: {
                        $subtract: ['$githubIntegration.profile.public_repos', totalRepos]
                      }
                    }
                  ]
                }
              ]
            },
            // Commit count similarity (0-30 points)
            {
              $subtract: [
                30,
                {
                  $min: [
                    30,
                    {
                      $divide: [
                        {
                          $abs: {
                            $subtract: ['$githubIntegration.stats.totalCommits', totalCommits]
                          }
                        },
                        100
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      }
    },
    {
      $match: {
        similarityScore: { $gte: 20 } // Minimum similarity threshold
      }
    },
    {
      $sort: { similarityScore: -1 }
    },
    {
      $limit: 10
    },
    {
      $project: {
        name: 1,
        avatar: 1,
        'githubIntegration.username': 1,
        'githubIntegration.profile.public_repos': 1,
        'githubIntegration.stats.topLanguages': 1,
        'githubIntegration.stats.totalCommits': 1,
        similarityScore: 1
      }
    }
  ];
  
  return this.aggregate(pipeline);
};

const User = mongoose.model('User', userSchema);

export default User;
