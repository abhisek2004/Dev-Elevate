import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,
    courseTitle: {
      type: String,
      required: true,
    },
    subTitle: { type: String },
    description: { type: String },
    dificulty: {
      type: String,
    },
    modules:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "LearningModule"
    },
    tags: [String],
    coursePrice: {
      type: Number,
    },
    courseThumbnail: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    createdAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;