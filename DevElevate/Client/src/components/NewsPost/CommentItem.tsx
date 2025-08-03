import React, { useState } from "react";
import axios from "axios";
import { FiMoreVertical } from "react-icons/fi";
import ConfirmDelete from "./ConfirmDelete";
import { toast } from "sonner";

interface CommentItemProps {
  comment: {
    _id: string;
    content: string;
    news: string,
    user?: {
      _id?: string;
      email?: string;
      username?:string;
    };
  };

  blogId: string;
  fetchComments: () => void;
  depth?: number;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  blogId,
  fetchComments,
}) => {
  const depth = 0;
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  console.log("news id: ", blogId)

  const handleUpdate = async () => {
    if (!editText.trim()) return toast.error("Comment cannot be empty!");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/comments/update-comment/${
          comment._id
        }`,
        { updatedContent: editText },
        { withCredentials: true }
      );
      console.log("response: ", res);
      toast.success("Comment updated");
      setIsEditing(false);
      fetchComments();
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update comment");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/comments/delete-comment/${
          comment._id
        }`,
        {},
        { withCredentials: true }
      );
      toast.success("Comment deleted");
      fetchComments();
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete comment");
    } finally {
      setShowDeleteModal(false);
    }
  };

  return (
    <div
      className={`border border-teal-200 p-4 rounded-lg shadow-sm relative mt-4 ${
        depth > 0 ? "ml-8 border-l-4 border-teal-300" : ""
      }`}
    >
      {/* 3-dot menu */}
      <div className="absolute top-2 right-2">
        <button onClick={() => setMenuOpen((prev) => !prev)}>
          <FiMoreVertical />
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white shadow rounded z-10 text-sm border">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                setIsEditing(true);
                setMenuOpen(false);
              }}
            >
              ✏️ Edit
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
              onClick={() => {
                setShowDeleteModal(true);
                setMenuOpen(false);
              }}
            >
              🗑️ Delete
            </button>
          </div>
        )}
      </div>

      {/* Avatar & Username */}
      <div className="flex items-center gap-3 mb-2">
        <span className="font-bold text-teal-800">
          {comment.user?.email || "Anonymous"}
        </span>
      </div>

      {isEditing ? (
        <>
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <div className="mt-2 flex gap-2">
            <button
              className="px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
              onClick={handleUpdate}
            >
              Save
            </button>
            <button
              className="px-3 py-1 bg-gray-300 rounded"
              onClick={() => {
                setIsEditing(false);
                setEditText(comment.content);
              }}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-800 dark:text-white mb-2 whitespace-pre-wrap">
          {comment.content}
        </p>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDelete
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this comment?"
      />
    </div>
  );
};

export default CommentItem;
