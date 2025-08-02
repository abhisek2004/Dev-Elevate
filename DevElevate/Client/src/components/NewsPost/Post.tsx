import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "sonner";
import ConfirmDelete from "./ConfirmDelete";
import Comment from "./Comment";

interface Post {
  _id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  tags: string[];
  author: {
    _id: string;
    username: string;
    avatar?: string;
  };
  comments: {
    _id: string;
    content: string;
    createdAt: string;
    user: {
      _id: string;
      name: string;
      avatar?: string;
    };
  }[];
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
}

interface PostResponse {
  success: boolean;
  message: string;
  news: Post;
}

const Post: React.FC = () => {
  const { newsId } = useParams<{ newsId: string }>();
  const [blog, setBlog] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const navigate = useNavigate();
  const { state } = useAuth();
  const { isLoading, isAuthenticated } = state;
  console.log("state from post", state);
  const user = state.user;
  console.log("user from post", user);
  const token = state.sessionToken;

  console.log(newsId, "blogId from params");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get<PostResponse>(
          `${import.meta.env.VITE_API_URL}/api/news/get-news-by-id/${newsId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status !== 200) {
          throw new Error("Failed to fetch blog post");
        }
        console.log(response.data);
        setBlog(response.data.news);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [newsId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || !token || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!blog) {
    return (
      <div className="text-center text-red-600 font-semibold py-12">
        Blog post not found.
      </div>
    );
  }

  const { title, content, createdAt, author, tags = [] } = blog;
  const isAuthor = user.id === author._id ? true : false;
  console.log("is author", isAuthor);
  console.log("blog: ", blog)

  const handleDeletePost = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/delete-news-post`,
        { postId: newsId },
        { withCredentials: true }
      );

      console.log("Post deleted successfully", res.data);
      toast.success("Post deleted successfully!");
      navigate("/news");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <main className="min-h-screen px-4 sm:px-8 md:px-16 py-12 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <article className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg dark:bg-gray-800 transition-colors duration-300">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-blue-700 dark:text-blue-400 mb-6">
          {title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={author?.avatar || "https://www.gravatar.com/avatar/?d=mp"}
            alt="Author"
            className="w-12 h-12 rounded-full border object-cover"
          />
          <div className="p-2">
            <p className="text-md font-medium">{author?.username}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none leading-relaxed mb-12"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {isAuthor && (
          <div className="flex gap-4 flex-wrap justify-end mb-12">
            <a
              href={`/edit-blog/${newsId}`}
              className="inline-flex items-center px-4 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded transition"
            >
              ✏️ Edit
            </a>
            <button
              onClick={() => setDeleteModal(true)}
              className="inline-flex items-center px-4 py-2 text-sm font-semibold bg-red-600 hover:bg-red-700 text-white rounded transition"
            >
              🗑️ Delete
            </button>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={() => navigate("/news")}
            className="inline-flex items-center px-6 py-3 rounded-full text-white bg-blue-600 hover:bg-blue-700 shadow-md transition"
          >
            ← Back to all posts
          </button>
        </div>

        <ConfirmDelete
          isOpen={deleteModal}
          onClose={() => setDeleteModal(false)}
          onConfirm={handleDeletePost}
          message="Are you sure you want to delete this post?"
        />

        {/* Comments Section */}
        <Comment blogId={blog._id}/>
      </article>
    </main>
  );
};

export default Post;
