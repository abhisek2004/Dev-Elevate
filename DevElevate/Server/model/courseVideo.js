
import mongoose from "mongoose";

const courseVideoSchema = new mongoose.Schema(
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
    category: {
      type: String,
      required: true,
      enum: ["Design", "Web Development", "Frontend", "Backend", "Full Stack"],
    },
    instructor: {
      name: String,
      avatar: String,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    duration: {
      type: String, // e.g., "12h 30m"
      required: true,
    },
    totalDurationMinutes: {
      type: Number, // Duration in minutes for calculations
      required: true,
    },
    enrolledStudents: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    videos: [
      {
        videoId: String,
        title: String,
        duration: String,
        order: Number,
      },
    ],
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const courseVideo = mongoose.model("CourseVideo", courseVideoSchema);
export default courseVideo;