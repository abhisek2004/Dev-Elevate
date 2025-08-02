import React from "react";
import AddPost from "./AddPost";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface PostProps {
  title: string;
  slug: string;
  content: string;
  published: boolean;
  tags: string[];
}

const UpdatePost: React.FC = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<PostProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get<{ success: boolean; news: PostProps }>(
          `${import.meta.env.VITE_API_URL}/api/get-news-by-id/${postId}`
        );
        setPost(response.data.news);
      } catch (error) {
        console.error("Error fetching post:", error);
        toast.error("Failed to load post for editing.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh] text-indigo-600">
        <Loader2 className="animate-spin w-6 h-6 mr-2" />
        Loading post details...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center text-red-500 font-semibold mt-8">
        Post not found or failed to load.
      </div>
    );
  }

  return <AddPost post={post} />;
};

export default UpdatePost;
