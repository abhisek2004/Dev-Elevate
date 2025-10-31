import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    topicId: {
      type: String,
      required: true,
      index: true,
    },
    topicName: {
      type: String,
      required: true,
    },
    isAiGenerated: {  // ✅ ADD THIS FIELD
      type: Boolean,
      default: false,
    },
    tags: [{
      type: String,
      trim: true,
    }],
    isPublic: {
      type: Boolean,
      default: false,
    },
    files: [{
      originalFileName: {
        type: String,
        required: true,
      },
      fileUrl: {
        type: String,
        required: true,
      },
      fileType: {
        type: String,
        required: true,
        enum: ['pdf', 'docx', 'doc'],
      },
      fileSize: {
        type: Number,
        required: true,
      },
      uploadedAt: {
        type: Date,
        default: Date.now,
      },
    }],
    views: {
      type: Number,
      default: 0,
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create compound indexes for efficient queries
notesSchema.index({ userId: 1, topicId: 1 });
notesSchema.index({ isPublic: 1, topicId: 1 });
notesSchema.index({ createdAt: -1 });

// Virtual for like count
notesSchema.virtual('likeCount').get(function() {
  return this.likes ? this.likes.length : 0;
});

const Notes = mongoose.model("Notes", notesSchema);

export default Notes;