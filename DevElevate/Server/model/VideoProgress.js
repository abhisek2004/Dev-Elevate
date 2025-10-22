// models/VideoProgress.js
import mongoose from "mongoose"; 

const videoProgressSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        videoId: { // ✅ MODIFIED: Changed from "video" to "videoId" (string)
            type: String,
            required: true,
        },
        courseId: { // ✅ MODIFIED: Changed from "course" to "courseId" (string)
            type: String,
            required: true,
        },
        currentTime: {
            type: Number, // Current playback position in seconds
            default: 0,
        },
        duration: {
            type: Number, // Total video duration in seconds
            required: true,
        },
        progressPercentage: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
        lastWatchedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

// ✅ FIXED: Updated index to use videoId instead of video
videoProgressSchema.index({ user: 1, videoId: 1 }, { unique: true });

export default mongoose.model("VideoProgress", videoProgressSchema);