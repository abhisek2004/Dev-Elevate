import React, { useState } from "react";
import { useGlobalState } from "../../contexts/GlobalContext";
import { useAuth } from "../../contexts/AuthContext";
import {
  Newspaper,
  Plus,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  X,
} from "lucide-react";

type NewsArticle = {
  id: string;
  title: string;
  content: string;
  category: string;
  status: string;
  author: string;
  publishDate: string;
  views: number;
};

type AddNewsModalProps = {
  onClose: () => void;
  onAdd: (newsData: {
    title: string;
    content: string;
    category: string;
    status: string;
  }) => void;
  darkMode: boolean;
};

const NewsUpdates: React.FC = () => {
  const { state: globalState } = useGlobalState();
  const { state: authState } = useAuth();
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [showAddNews, setShowAddNews] = useState(false);

  const addNewsArticle = (
    newsData: Omit<NewsArticle, "id" | "author" | "publishDate" | "views">
  ) => {
    const newArticle = {
      id: Date.now().toString(),
      ...newsData,
      author: authState.user?.name || "Admin",
      publishDate: new Date().toISOString(),
      views: 0,
    };
    const updatedNews = [...newsArticles, newArticle];
    setNewsArticles(updatedNews);
    setShowAddNews(false);
  };

  const deleteNewsArticle = (articleId: string) => {
    const updatedNews = newsArticles.filter(
      (article) => article.id !== articleId
    );
    setNewsArticles(updatedNews);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3
          className={`text-xl font-semibold ${
            globalState.darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          News & Updates Management
        </h3>
        <button
          onClick={() => setShowAddNews(true)}
          className="flex items-center px-4 py-2 space-x-2 text-white bg-blue-500 rounded-lg transition-colors hover:bg-blue-600"
        >
          <Plus className="w-4 h-4" />
          <span>Add News</span>
        </button>
      </div>

      {/* News Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div
          className={`${
            globalState.darkMode ? "bg-gray-800" : "bg-white"
          } p-4 rounded-lg border`}
        >
          <div className="flex items-center space-x-2">
            <Newspaper className="w-5 h-5 text-blue-500" />
            <span
              className={`text-sm ${
                globalState.darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Total Articles
            </span>
          </div>
          <p
            className={`text-2xl font-bold ${
              globalState.darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {newsArticles.length}
          </p>
        </div>
        <div
          className={`${
            globalState.darkMode ? "bg-gray-800" : "bg-white"
          } p-4 rounded-lg border`}
        >
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span
              className={`text-sm ${
                globalState.darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Published
            </span>
          </div>
          <p
            className={`text-2xl font-bold ${
              globalState.darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {newsArticles.filter((a) => a.status === "published").length}
          </p>
        </div>
        <div
          className={`${
            globalState.darkMode ? "bg-gray-800" : "bg-white"
          } p-4 rounded-lg border`}
        >
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-yellow-500" />
            <span
              className={`text-sm ${
                globalState.darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Draft
            </span>
          </div>
          <p
            className={`text-2xl font-bold ${
              globalState.darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {newsArticles.filter((a) => a.status === "draft").length}
          </p>
        </div>
        <div
          className={`${
            globalState.darkMode ? "bg-gray-800" : "bg-white"
          } p-4 rounded-lg border`}
        >
          <div className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-purple-500" />
            <span
              className={`text-sm ${
                globalState.darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Total Views
            </span>
          </div>
          <p
            className={`text-2xl font-bold ${
              globalState.darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {newsArticles.reduce((sum, article) => sum + article.views, 0)}
          </p>
        </div>
      </div>

      {/* News Articles */}
      <div
        className={`${
          globalState.darkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        } rounded-xl border shadow-sm overflow-hidden`}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead
              className={`${
                globalState.darkMode ? "bg-gray-700" : "bg-gray-50"
              }`}
            >
              <tr>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    globalState.darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Article
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    globalState.darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Category
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    globalState.darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Status
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    globalState.darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Views
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    globalState.darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Date
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    globalState.darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody
              className={`divide-y ${
                globalState.darkMode ? "divide-gray-700" : "divide-gray-200"
              }`}
            >
              {newsArticles.map((article) => (
                <tr
                  key={article.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4">
                    <div>
                      <div
                        className={`text-sm font-medium ${
                          globalState.darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {article.title}
                      </div>
                      <div
                        className={`text-sm ${
                          globalState.darkMode
                            ? "text-gray-400"
                            : "text-gray-500"
                        }`}
                      >
                        By {article.author}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        article.category === "announcement"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          : article.category === "maintenance"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
                      }`}
                    >
                      {article.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        article.status === "published"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                      }`}
                    >
                      {article.status}
                    </span>
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      globalState.darkMode ? "text-gray-300" : "text-gray-900"
                    }`}
                  >
                    {article.views}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      globalState.darkMode ? "text-gray-300" : "text-gray-900"
                    }`}
                  >
                    {new Date(article.publishDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        title="View Article"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-900"
                        title="Edit Article"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteNewsArticle(article.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete Article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add News Modal */}
      {showAddNews && (
        <AddNewsModal
          onClose={() => setShowAddNews(false)}
          onAdd={addNewsArticle}
          darkMode={globalState.darkMode}
        />
      )}
    </div>
  );
};

// Add News Modal Component
const AddNewsModal: React.FC<AddNewsModalProps> = ({
  onClose,
  onAdd,
  darkMode,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "announcement",
    status: "published",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50">
      <div
        className={`${
          darkMode ? "bg-gray-800" : "bg-white"
        } rounded-xl p-6 w-full max-w-md mx-4`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3
            className={`text-lg font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Add News Article
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className={`w-full px-3 py-2 rounded-lg border ${
                darkMode
                  ? "text-white bg-gray-700 border-gray-600"
                  : "text-gray-900 bg-white border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Content
            </label>
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              rows={3}
              className={`w-full px-3 py-2 rounded-lg border ${
                darkMode
                  ? "text-white bg-gray-700 border-gray-600"
                  : "text-gray-900 bg-white border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className={`w-full px-3 py-2 rounded-lg border ${
                darkMode
                  ? "text-white bg-gray-700 border-gray-600"
                  : "text-gray-900 bg-white border-gray-300"
              }`}
            >
              <option value="announcement">Announcement</option>
              <option value="maintenance">Maintenance</option>
              <option value="news">News</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.status === "published"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.checked ? "published" : "draft",
                })
              }
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label
              className={`text-sm ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Publish immediately
            </label>
          </div>

          <div className="flex pt-4 space-x-3">
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-white bg-blue-500 rounded-lg transition-colors hover:bg-blue-600"
            >
              Add News
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-white bg-gray-500 rounded-lg transition-colors hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsUpdates;