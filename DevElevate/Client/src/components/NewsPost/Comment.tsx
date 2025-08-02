"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentItem from "./CommentItem";
import { useAuth } from "../../contexts/AuthContext";

interface CommentType {
  _id: string;
  content: string;
  news: string; // 🔁 was newsId
  user?: {
    _id?: string;
    email?: string;
    username?: string;
  };
  isEdited: boolean;
}


interface GetCommentsResponse {
  message: string;
  comments: CommentType[];
}

interface AddCommentResponse {
  message: string;
  comment: CommentType;
}

interface Props {
  blogId: string;
}

const Comments: React.FC<Props> = ({ blogId }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newComment, setNewComment] = useState("");
  const { state } = useAuth();
  const user = state.user;

  if (!user) {
    return <div>User not logged in or smthn</div>;
  }

  const fetchComments = async () => {
    try {
      const res = await axios.get<GetCommentsResponse>(
        `http://localhost:4000/api/comments/get-comments-on-news/${blogId}`
      );
      setComments(res.data.comments || []);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch comments");
      console.error("Error fetching comments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await axios.post<AddCommentResponse>(
        `http://localhost:4000/api/comments/create-comment/${blogId}`,
        {
          content: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${state.sessionToken}`,
          },
        }
      );

      const addedComment = res.data.comment;
      setComments((prev) => [addedComment, ...prev]);
      setNewComment("");
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  useEffect(() => {
    if (blogId) fetchComments();
  }, [blogId]);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 space-y-6 border dark:border-neutral-800">
      <h2 className="text-xl font-semibold">Comments</h2>

      {/* Comment input box */}
      <div className="space-y-2">
        <textarea
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 text-sm text-gray-800 dark:text-white p-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          rows={3}
        />
        <button
          onClick={handleAddComment}
          className="bg-gray-800 dark:bg-white text-white dark:text-black px-4 py-2 rounded-md font-medium hover:opacity-90 transition"
        >
          Post Comment
        </button>
      </div>

      {/* Comments list */}
      <div className="divide-y divide-gray-200 dark:divide-neutral-800">
        {loading ? (
          <p className="text-sm text-gray-500">Loading comments...</p>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-gray-500">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              blogId={blogId}
              fetchComments={fetchComments}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
