import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    courseTitle: {
      type: String,
      required: true,
      trim: true,
    },
    subTitle: { type: String, trim: true },
    description: { type: String },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'], // If not needed, just keep type: String
    },
    modules: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "LearningModule"
    }],
    tags: [String],
    coursePrice: {
      type: Number,
      default: 0
    },
    courseThumbnail: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    }
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
