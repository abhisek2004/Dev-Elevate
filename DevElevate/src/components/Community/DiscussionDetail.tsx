

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockDiscussionPosts, Comment } from '../../utils/mockDiscussionData';
import { Tag, MessageSquare, ArrowLeft } from 'lucide-react';

const DiscussionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = mockDiscussionPosts.find((p) => p.id === id);

  const [newComment, setNewComment] = useState('');
  
  // In a real app, you'd likely have a global state or context to update comments.
  // For this mock, we'll just simulate adding a comment locally.
  const [comments, setComments] = useState<Comment[]>(post?.comments || []);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === '') return;

    const newCommentObject: Comment = {
      id: `comment-${Date.now()}`,
      author: 'You (Preview)', // In a real app, this would be the logged-in user
      timestamp: new Date().toISOString(),
      content: newComment,
    };

    setComments([...comments, newCommentObject]);
    setNewComment('');
  };

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800">Post not found</h2>
        <p className="text-gray-500 mt-2">
          The discussion you are looking for does not exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/discussions')}
          className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Discussions
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate('/discussions')}
        className="inline-flex items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-blue-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to all discussions
      </button>

      {/* Main Post Card */}
      <div className="bg-white rounded-lg shadow-md p-8">
        {/* Post Title */}
        <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>

        {/* Post Metadata */}
        <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mt-3 text-sm text-gray-500">
          <span>Posted by <span className="font-semibold text-gray-700">{post.author}</span></span>
          <span>on {new Date(post.timestamp).toLocaleDateString()}</span>
          <span className="flex items-center gap-x-1">
            <MessageSquare className="w-4 h-4" /> {comments.length}
          </span>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2 border-b border-gray-200 pb-6">
          {post.tags.map((tag) => (
            <span key={tag} className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
              <Tag className="w-3 h-3 mr-1.5" />
              {tag}
            </span>
          ))}
        </div>

        {/* Post Content */}
        <div className="prose max-w-none prose-gray mt-6 text-gray-800 leading-relaxed">
            <p>{post.content}</p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments ({comments.length})</h2>
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-x-4">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div> {/* Avatar Placeholder */}
              <div className="flex-1 bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-800">{comment.author}</span>
                  <span className="text-xs text-gray-500">{new Date(comment.timestamp).toLocaleDateString()}</span>
                </div>
                <p className="mt-2 text-gray-700">{comment.content}</p>
              </div>
            </div>
          ))}

          {comments.length === 0 && (
            <div className="text-center py-10 bg-white rounded-lg border border-dashed">
                <p className="text-gray-500">Be the first to leave a comment!</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Comment Form */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900">Leave a Comment</h3>
        <form onSubmit={handleCommentSubmit} className="mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment here..."
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            rows={4}
          ></textarea>
          <div className="text-right mt-4">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DiscussionDetail;