import {asyncHandler} from '../utils/asyncHandler.js';
import {Comment} from "../model/Comment.js"
import {News} from '../model/NewsModel.js';


const createComment = asyncHandler(async(req, res)=>{
    const {newsId} = req.params;
    const {content} = req.body;

    if(!newsId){
return res.status(404).json({message: 'News ID is required'})    }

    if(!content || content.trim() === ""){
        return res.status(400).json({error: "content is necessary"})
    }

    const comment = await Comment.create({
        content,
        news: newsId,
        user: req.user._id,
    })

    if(!comment){
        return res.status(500).json({ error: 'Failed to create comment' });

    }

    await News.findByIdAndUpdate(newsId, {
        $push: { comments: comment._id },
        $inc: { commentCount: 1 }
    });

    return res.status(201).json({
        message: 'Comment created successfully',
        comment,
    });
})


const updateComment = asyncHandler(async(req, res)=>{
    const {commentId} = req.params;
    const {updatedComment} = req.body;

    if(!commentId){
        return res.json({ error: 'Comment ID is required' }, {status: 400});
    }

    if(!updatedComment || !updatedComment.trim() === ""){
        return res.json({ error: 'Comment content is required' }, {status: 400});
    }

    const commentExists = await Comment.findById(commentId);
    if(!commentExists){
        return res.json({ error: 'Comment not found' }, {status: 404});
    }

    if(commentExists.user.toString() !== req.user._id.toString()){
        return res.json({ error: 'You are not authorized to update this comment' }, {status: 403});
    }

    const comment = await Comment.findByIdAndUpdate(commentId, {
        content: updatedComment,
        isEdited: true,
    }, { new: true });

    if(!comment){
        return res.json({ error: 'Failed to update comment' }, {status: 500});
    }

    return res.status(200).json({
        message: 'Comment updated successfully',
        comment,
    });
});


const deleteComment = asyncHandler(async(req, res)=>{
    const {commentId} = req.params;

    if(!commentId){
        return res.json({ error: 'Comment ID is required' }, {status: 400});
    }

    const commentExists = await Comment.findById(commentId);
    if(!commentExists){
        return res.json({ error: 'Comment not found' }, {status: 404});
    }

    if(commentExists.user.toString() !== req.user._id.toString()){
        return res.json({ error: 'You are not authorized to delete this comment' }, {status: 403});
    }

    await Comment.findByIdAndDelete(commentId);
    
    await News.findByIdAndUpdate(commentExists.news, {
        $pull: { comments: commentId },
        $inc: { commentCount: -1 }
    });

    return res.status(200).json({
        message: 'Comment deleted successfully',
    });
});

const getCommentsByNews = asyncHandler(async(req, res)=>{
    const {newsId} = req.params;

    if(!newsId){
        return res.status(400).json({error: "News id is required"})
    }

    const comments = await Comment.find({ news: newsId })
        .populate('user', 'username email avatar')
        .sort({ createdAt: -1 });
    if(!comments || comments.length === 0){
return res.status(404).json({message: "No comments found for this post:"})
    }

    return res.status(200).json({
        message: 'Comments retrieved successfully',
        comments,
    });
});


export {
    createComment,
    updateComment,
    deleteComment,
    getCommentsByNews,
}