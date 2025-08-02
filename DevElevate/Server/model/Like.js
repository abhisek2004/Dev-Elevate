import mongoose, { Schema } from "mongoose";


const LikeSchema = new Schema({
    news: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "News",
    },
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    },
    likedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, 
{timestamps: true})

export const Like = mongoose.model("Like", LikeSchema);