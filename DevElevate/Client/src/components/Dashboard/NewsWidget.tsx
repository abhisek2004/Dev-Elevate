import React, { useEffect, useState } from "react";
import {
  ExternalLink,
  Calendar,
  ArrowRight,
  List,
  LayoutGrid,
  Loader2,
} from "lucide-react";
import { useGlobalState } from "../../contexts/GlobalContext";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Define Post interface
interface Post {
  _id: string;
  title: string;
  content: string;
  category?: string;
  createdAt: string;
  publishDate?: string;
}

interface newsResponse {
  success: boolean;
  message: string;
  news: Post[];
}

const NewsWidget: React.FC = () => {
  const { state } = useGlobalState();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  // const [articles, setArticles] = useState<Post[]>([
  //   {
  //     _id: "1",
  //     title: "Sample News Article",
  //     content: "This is a sample news article content.",
  //     category: "tech",
  //     createdAt: new Date().toISOString(),
  //     publishDate: new Date().toISOString(),
  //   },
  // ]);
  const [latestNews, setLatestNews] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "tech":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "jobs":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "internships":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "events":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  // to fetch latest news posts from backend and display them

  useEffect(() => {
    const fetchNewsPosts = async () => {
      try {
        const response = await axios.get<newsResponse>(
          `${import.meta.env.VITE_API_URL}/api/news/get-all-news`
        );
        const posts = response.data?.news ?? [];
        const sorted = posts.sort(
          (a: Post, b: Post) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setLatestNews(sorted.slice(0, 3));
      } catch (error) {
        console.error("Error fetching news posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsPosts();
  }, []);

  const handleClick = () => {
    navigate("/news");
  };
  // console.log(articles);

  return (
    <div
      className={`${
        state.darkMode
          ? "bg-gray-900 border-gray-700"
          : "bg-white border-gray-200"
      } rounded-xl p-6 border shadow-sm transition-colors duration-200`}
    >
      <div className="flex items-center justify-between mb-6">
        <h3
          className={`text-2xl font-semibold tracking-tight ${
            state.darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Tech News Feed
        </h3>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("list")}
            className={`p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${
              viewMode === "list" ? "bg-gray-300 dark:bg-gray-700" : ""
            }`}
          >
            <List className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode("card")}
            className={`p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${
              viewMode === "card" ? "bg-gray-300 dark:bg-gray-700" : ""
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
            onClick={handleClick}
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin w-6 h-6 text-blue-500" />
        </div>
      ) : (
        <div
          className={
            viewMode === "card"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              : "space-y-4"
          }
        >
          {latestNews.map((item) => (
            <div
              key={item._id}
              className={`rounded-xl p-4 border transition-all duration-200 ${
                state.darkMode
                  ? "bg-gray-800 border-gray-700 hover:border-blue-500 hover:shadow-md"
                  : "bg-white border-gray-200 hover:border-blue-300 hover:shadow"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-xs px-2 py-1 rounded-full font-semibold ${getCategoryColor(
                    item.category || "general"
                  )}`}
                >
                  {item.category || "General"}
                </span>
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {item.publishDate
                      ? format(new Date(item.publishDate), "MMM dd")
                      : format(new Date(item.createdAt), "MMM dd")}
                  </span>
                </div>
              </div>

              <h4
                className={`text-base font-semibold mb-2 leading-tight ${
                  state.darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {item.title}
              </h4>

              <div
                className={`text-sm mb-3 ${
                  state.darkMode ? "text-gray-400" : "text-gray-700"
                }`}
                dangerouslySetInnerHTML={{
                  __html:
                    item.content.length > 100
                      ? item.content.slice(0, 100) + "..."
                      : item.content,
                }}
              />

              <button
                onClick={() => navigate(`/news/${item._id}`)}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                <span>Read More</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="mt-6 p-4 bg-indigo-700 dark:bg-blue-900 rounded-lg text-white text-md dark:text-blue-200 flex justify-between items-center">
        <span>Want to add your own posts?</span>
        <button
          onClick={() => navigate("/news/add-post")}
          className="ml-2 dark:text-white text-white hover:text-blue-100  font-medium underline"
        >
          Get started here →
        </button>
      </div>
    </div>
  );
};

export default NewsWidget;
