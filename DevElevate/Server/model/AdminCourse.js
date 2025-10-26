import mongoose from "mongoose";

const adminCourseSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: [
        "Web Development",
        "Programming",
        "Data Science",
        "Mobile Development",
        "Design",
        "DevOps",
        "Database",
        "Cloud Computing",
        "AI/ML",
        "Cybersecurity",
        "Other"
      ]
    },
    type: {
      type: String,
      required: true,
      enum: ["Tutorial", "Project", "Course", "Workshop", "Bootcamp", "Other"]
    },
    videoId: {
      type: String,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: true
    },
    creator: {
      type: String,
      required: true
    },
    courseImage: {
      type: String,
      required: true
    },
    creatorImage: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    // Auto-populated from YouTube or manual entry
    duration: {
      type: String,
      default: "0h 0m"
    },
    students: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5
    },
    // Admin who uploaded (OPTIONAL - not required until you implement admin auth)
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: false  // ✅ Changed to false
    },
    // Status
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { 
    timestamps: true 
  }
);

// Index for faster queries
adminCourseSchema.index({ category: 1, isActive: 1 });
adminCourseSchema.index({ title: 'text', creator: 'text', description: 'text' });

const AdminCourse = mongoose.model("AdminCourse", adminCourseSchema);

export default AdminCourse;