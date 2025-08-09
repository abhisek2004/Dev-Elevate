import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
    content: { type: String, required: true },
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
    accepted: { type: Boolean, default: false }
});

answerSchema.index({ questionId: 1 });

const Answer = mongoose.model("Answer", answerSchema);
export default Answer;