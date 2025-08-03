import { Schema } from "mongoose";
import mongoose from "mongoose";

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true,
    },
    news: {
        type: Schema.Types.ObjectId,
        ref: 'News',
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    isEdited:{
        type: Boolean,
        default: false,
    }
})

export const Comment = mongoose.model('Comment', commentSchema);