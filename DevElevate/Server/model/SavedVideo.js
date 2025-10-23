// models/SavedVideo.js
import mongoose from "mongoose"; 

const savedVideoSchema = new mongoose.Schema(
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
        videoTitle: { // ✅ ADDED: Store video title
            type: String,
            required: false,
        },
        courseName: { // ✅ ADDED: Store course name
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

// ✅ FIXED: Updated index to use videoId instead of video
savedVideoSchema.index({ user: 1, videoId: 1 }, { unique: true });

export default mongoose.model("SavedVideo", savedVideoSchema);