import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
    {
        id: mongoose.Schema.Types.ObjectId,
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
        moduleTitle: {
            type: String,
        },
        videoUrl: {
            type: String,
        },
        resourceLinks: {
            type: String,
        },
        duration: {
            type: String
        },
    }, { timestamps: true }
);

const LearningModule = mongoose.model("LearningModule", moduleSchema);

export default LearningModule;