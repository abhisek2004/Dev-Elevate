import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], default: [] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    isResolved: { type: Boolean, default: false },
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
});

questionSchema.index({ tags: 1 });

const Question = mongoose.model('Question', questionSchema);
export default Question;