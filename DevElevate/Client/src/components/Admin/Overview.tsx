import React from "react";
import { useGlobalState } from "../../contexts/GlobalContext";
import { useAuth } from "../../contexts/AuthContext";
import {
  Users,
  BookOpen,
  Target,
  Newspaper,
  TrendingUp,
  Plus,
  Download,
} from "lucide-react";

type Course = {
  id: string;
  title: string;
  description: string;
  modules: number;
  enrolled: number;
  completion: number;
  difficulty: string;
  duration: string;
  instructor: string;
  status: string;
  createdAt: string;
};

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

interface OverviewProps {
  courses: Course[];
  newsArticles: NewsArticle[];
  feedback: any[];
  onAddCourse: () => void;
  onAddNews: () => void;
  onExportData: () => void;
}

const Overview: React.FC<OverviewProps> = ({
  courses,
  newsArticles,
  feedback,
  onAddCourse,
  onAddNews,
  onExportData,
}) => {
  const { state: globalState } = useGlobalState();
  const { state: authState } = useAuth();

  const stats = [
    {
      title: "Total Users",
      value: authState.users.length,
      change: "+12%",
      icon: Users,
      color: "blue",
    },
    {
      title: "Active Courses",
      value: courses.filter((c) => c.status === "active").length,
      change: "+5%",
      icon: BookOpen,
      color: "green",
    },
    {
      title: "Total Enrollments",
      value: courses.reduce((sum, course) => sum + course.enrolled, 0),
      change: "+8%",
      icon: Target,
      color: "purple",
    },
    {
      title: "News Articles",
      value: newsArticles.length,
      change: "+15%",
      icon: Newspaper,
      color: "orange",
    },
    {
      title: "Feedback",
      value: feedback.length,
      change: "+12%",
      icon: Target,
      color: "yellow",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`${
                globalState.darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p
                    className={`text-sm ${
                      globalState.darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {stat.title}
                  </p>
                  <p
                    className={`text-3xl font-bold ${
                      globalState.darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {stat.value}
                  </p>
                  <p className="flex items-center mt-1 text-sm text-green-500">
                    <TrendingUp className="mr-1 w-3 h-3" />
                    {stat.change}
                  </p>
                </div>
                <div
                  className={`p-4 rounded-xl bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div
        className={`${
          globalState.darkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        } rounded-xl p-6 border shadow-sm`}
      >
        <h3
          className={`text-xl font-semibold mb-4 ${
            globalState.darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <button
            onClick={onAddCourse}
            className="flex items-center p-4 space-x-3 text-white bg-blue-500 rounded-lg transition-colors hover:bg-blue-600"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Course</span>
          </button>
          <button
            onClick={onAddNews}
            className="flex items-center p-4 space-x-3 text-white bg-green-500 rounded-lg transition-colors hover:bg-green-600"
          >
            <Newspaper className="w-5 h-5" />
            <span>Publish News</span>
          </button>
          <button
            onClick={onExportData}
            className="flex items-center p-4 space-x-3 text-white bg-purple-500 rounded-lg transition-colors hover:bg-purple-600"
          >
            <Download className="w-5 h-5" />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div
        className={`${
          globalState.darkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        } rounded-xl p-6 border shadow-sm`}
      >
        <h3
          className={`text-xl font-semibold mb-4 ${
            globalState.darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Recent Activity
        </h3>
        <div className="space-y-4">
          {[
            {
              action: "New user registered",
              user: "john@example.com",
              time: "2 minutes ago",
              type: "user",
            },
            {
              action: "Course completed",
              user: "jane@example.com",
              time: "15 minutes ago",
              type: "course",
            },
            {
              action: "Assignment submitted",
              user: "bob@example.com",
              time: "1 hour ago",
              type: "assignment",
            },
            {
              action: "New course created",
              user: "admin@example.com",
              time: "2 hours ago",
              type: "admin",
            },
            {
              action: "News article published",
              user: "admin@example.com",
              time: "3 hours ago",
              type: "news",
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    activity.type === "user"
                      ? "bg-blue-500"
                      : activity.type === "course"
                      ? "bg-green-500"
                      : activity.type === "assignment"
                      ? "bg-yellow-500"
                      : activity.type === "admin"
                      ? "bg-purple-500"
                      : "bg-orange-500"
                  }`}
                ></div>
                <div>
                  <p
                    className={`font-medium ${
                      globalState.darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {activity.action}
                  </p>
                  <p
                    className={`text-sm ${
                      globalState.darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {activity.user}
                  </p>
                </div>
              </div>
              <span
                className={`text-sm ${
                  globalState.darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div
          className={`${
            globalState.darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } rounded-xl p-6 border shadow-sm`}
        >
          <h3
            className={`text-xl font-semibold mb-4 ${
              globalState.darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            System Health
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span
                className={
                  globalState.darkMode ? "text-gray-300" : "text-gray-700"
                }
              >
                Server Status
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-500">Online</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span
                className={
                  globalState.darkMode ? "text-gray-300" : "text-gray-700"
                }
              >
                Database
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-500">Connected</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span
                className={
                  globalState.darkMode ? "text-gray-300" : "text-gray-700"
                }
              >
                API Status
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-500">Operational</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${
            globalState.darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } rounded-xl p-6 border shadow-sm`}
        >
          <h3
            className={`text-xl font-semibold mb-4 ${
              globalState.darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Platform Metrics
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span
                className={
                  globalState.darkMode ? "text-gray-300" : "text-gray-700"
                }
              >
                Uptime
              </span>
              <span
                className={`font-medium ${
                  globalState.darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                99.9%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span
                className={
                  globalState.darkMode ? "text-gray-300" : "text-gray-700"
                }
              >
                Response Time
              </span>
              <span
                className={`font-medium ${
                  globalState.darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                120ms
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span
                className={
                  globalState.darkMode ? "text-gray-300" : "text-gray-700"
                }
              >
                Active Sessions
              </span>
              <span
                className={`font-medium ${
                  globalState.darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                1,247
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;