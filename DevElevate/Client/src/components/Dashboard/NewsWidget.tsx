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

const NewsWidget: React.FC = () => {
  const { state } = useGlobalState();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          "https://newsdata.io/api/1/latest?apikey=pub_435a52c41f174309b4357800e29821d0&category=technology,business&language=en&country=in"
        );
        const data = await res.json();

        if (data.results) {
        setArticles(data.results.slice(0, 9)); // ✅ limit to 9
      }
      } catch (err) {
        console.error("Failed to fetch news", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      business: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      technology: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      sports: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      health: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    };
    return colors[category?.toLowerCase()] || "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  };

  const handleClick = () => {
    navigate("/news");
  };

  return (
    <div
      data-aos="fade-up"
      data-aos-delay="120"
      className={`${
        state.darkMode
          ? "bg-gray-800 border-gray-700"
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
            className="flex items-center gap-1 text-blue-500 hover:text-blue-600 text-sm font-medium"
            onClick={handleClick}
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin w-6 h-6 text-blue-500" />
        </div>
      ) : (
        <div
          className={
            viewMode === "card"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              : "space-y-4 "
          }
        >
          {articles.map((item, index) => (
            <div
              key={item.article_id ?? index}
              data-aos="fade-up"
              data-aos-delay={`${index * 100}`}
              className={`border rounded-lg overflow-hidden ${
                state.darkMode ? "bg-gray-900" : "bg-white"
              } ${
                viewMode === "card"
                  ? "hover:shadow-md transition duration-300"
                  : "flex items-start gap-4 p-3"
              }`}
            >
              {item.image_url && (
                <img
                  src={item.image_url || "https://via.placeholder.com/300x200?text=No+Image"}
                  alt="thumbnail"
                  className={`${
                    viewMode === "card"
                      ? "w-full h-28 object-cover"
                      : "w-28 h-20 rounded-md object-cover"
                  }`}
                />
              )}

              <div className={`${viewMode === "card" ? "p-4" : "flex-1"}`}>
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-semibold ${getCategoryColor(
                      item.category?.[0]
                    )}`}
                  >
                    {item.category?.[0] || "General"}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {item.pubDate
                        ? format(new Date(item.pubDate), "MMM dd")
                        : ""}
                    </span>
                  </div>
                </div>
                <h4
                  className={`text-sm font-semibold mb-1 ${
                    state.darkMode ? "text-white" : "text-gray-800"
                  }`}
                >

                  {item.title}
                </h4>
                <p
                  className={`text-xs ${
                    state.darkMode ? "text-gray-400" : "text-gray-600"
                  } mb-2`}
                >
                  {item.description?.slice(0, 100)}...
                </p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-500 hover:text-blue-600 text-xs font-medium"
                >
                  <span>Read More</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsWidget;
