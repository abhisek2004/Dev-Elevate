import React, { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "sonner";
import Input from "./Input.tsx";
import Select from "./Select.tsx";
import RTE from "./RTE.tsx";

interface PostProps {
  title?: string;
  slug?: string;
  content?: string;
  published?: boolean;
  tags?: string[];
}

interface FormInputs {
  title: string;
  slug: string;
  content: string;
  status: "active" | "inactive";
  tags: string[] | string;
}

interface PostResponse {
  success: boolean;
  message: string;
  news: {
    _id: string;
    title: string;
    slug: string;
    content: string;
    published: boolean;
    tags: string[];
    createdAt: string;
    updatedAt: string;
  };
}

interface AddPostProps {
  post?: PostProps;
}

const AddPost: React.FC<AddPostProps> = ({ post }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { state } = useAuth();
  const user = state.user;
  const token = state.sessionToken;
  console.log("token: ", token)

  const { register, handleSubmit, watch, setValue, control } =
    useForm<FormInputs>({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.published ? "active" : "inactive",
        tags: post?.tags || [],
      },
    });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      setIsSubmitting(true);
      if (!user || !token) {
        alert("You must be logged in to add a post.");
        return;
      }

      const processedTags =
        typeof data.tags === "string"
          ? data.tags.split(",").map((tag) => tag.trim())
          : data.tags;

      const response = await axios.post<PostResponse>(
        `${import.meta.env.VITE_API_URL}/api/news/create-news-post`,
        {
          title: data.title,
          slug: data.slug,
          content: data.content,
          published: data.status === "active",
          tags: processedTags,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      toast.success("Post created successfully!");
      navigate(`/news/${response.data.news._id}`);
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const slugTransform = useCallback((value: string) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title" && typeof value.title === "string") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue, slugTransform]);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-2xl shadow-md p-6 sm:p-8 space-y-8 transition-colors duration-300">
        <h1 className="text-4xl font-bold text-blue-600 dark:text-white flex items-center gap-2">
          📝 {post ? "Update Blog Post" : "Create Blog Post"}
        </h1>

        {/* Post Details */}
        <div>
          <h2 className="text-2xl font-bold text-indigo-500 dark:text-white mb-4">
            Post Details
          </h2>
          <Input
            label="Title"
            placeholder="Enter post title"
            className="mb-4 mt-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug"
            placeholder="Auto-generated or custom slug"
            className="mb-4 mt-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            {...register("slug", { required: true })}
            onInput={(e) =>
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              })
            }
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-indigo-500 dark:text-white mb-2">
            🖋️ Content
          </h2>
          <RTE name="content" control={control} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-black dark:text-white  mb-2">
            📦 Publishing Info
          </h2>
          <Input
            label="Tags (comma separated)"
            placeholder="eg. AI, WebDev, Cloud"
            className="mb-4 mt-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            {...register("tags", {
              validate: (value) => {
                if (typeof value === "string") {
                  return value.split(",").length <= 5 || "Max 5 tags allowed";
                }
                return true;
              },
            })}
          />
          <div className="mt-4">
            <Select
              label="Status"
              options={["active", "inactive"]}
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              {...register("status", { required: true })}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          onClick={handleSubmit(onSubmit)}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 
        text-white font-semibold py-2 px-4 rounded-xl shadow-xl transition-all duration-300 
        flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              Uploading...
            </>
          ) : post ? (
            "Update Post"
          ) : (
            <>
              🚀 <span>Submit Post</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddPost;
