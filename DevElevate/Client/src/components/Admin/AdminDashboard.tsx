import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useGlobalState } from "../../contexts/GlobalContext";
import {
  Users,
  BookOpen,
  FileText,
  Newspaper,
  BarChart3,
  Settings,
  MessageCircle,
  Activity,
  Database,
  Shield,
} from "lucide-react";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import Overview from "./Overview";
import UserManagement from "./UserManagement";
import ContentManagement from "./ContentManagement";
import Community from "./Community";
import NewsUpdates from "./NewsUpdates";
import QuizManagement from "./QuizManagement";
import Analytics from "./Analytics";
import SystemLogs from "./SystemLogs";
import SystemSettings from "./SystemSettings";
import Feedback from "./Feedback";
import { CiLogout } from "react-icons/ci";

const AdminDashboard: React.FC = () => {
  const { state: authState, logout } = useAuth();
  const { state: globalState, dispatch } = useGlobalState();
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: BarChart3,
      path: "/admin/overview",
    },
    {
      id: "users",
      label: "User Management",
      icon: Users,
      path: "/admin/users",
    },
    {
      id: "content",
      label: "Content Management",
      icon: FileText,
      path: "/admin/content",
    },
    {
      id: "community",
      label: "Community",
      icon: MessageCircle,
      path: "/admin/community",
    },
    {
      id: "news",
      label: "News & Updates",
      icon: Newspaper,
      path: "/admin/news",
    },
    {
      id: "quizzes",
      label: "Quiz Management",
      icon: BookOpen,
      path: "/admin/quizzes",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: Activity,
      path: "/admin/analytics",
    },
    {
      id: "logs",
      label: "System Logs",
      icon: Database,
      path: "/admin/logs",
    },
    {
      id: "settings",
      label: "System Settings",
      icon: Settings,
      path: "/admin/settings",
    },
    {
      id: "feedback",
      label: "Feedback",
      icon: Shield,
      path: "/admin/feedback",
    },
  ];

  // Check if user is admin - using authState instead of globalState
  if (!authState.user?.role || authState.user.role !== "admin") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <Shield className="mx-auto mb-4 w-16 h-16 text-red-500" />
          <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            You don't have permission to access the admin dashboard.
          </p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className={`min-h-screen ${
        globalState.darkMode ? "bg-gray-900" : "bg-gray-50"
      } transition-colors duration-200`}
    >
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1
            className={`text-3xl font-bold ${
              globalState.darkMode ? "text-white" : "text-gray-900"
            } mb-2`}
          >
            Admin Dashboard
          </h1>
          <p
            className={`text-lg ${
              globalState.darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Comprehensive platform management and analytics
          </p>

          {/* Controls */}
          <div className="flex flex-col justify-start items-start mt-4 space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => dispatch({ type: "TOGGLE_DARK_MODE" })}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                globalState.darkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              }`}
            >
              {globalState.darkMode ? "☀ Light" : "🌙 Dark"}
            </button>
            <button
              onClick={handleLogout}
              className="flex gap-3 justify-center items-center px-5 py-2 text-red-700 bg-red-50 rounded-lg transition-all hover:bg-red-500 hover:text-white"
            >
              <CiLogout size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation - Mobile Responsive */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = location.pathname === tab.path;
              return (
                <button
                  key={tab.id}
                  onClick={() => navigate(tab.path)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                    isActive
                      ? "bg-blue-500 text-white shadow-lg"
                      : globalState.darkMode
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          <Routes>
            <Route
              path="/"
              element={
                <Overview
                  courses={[]}
                  newsArticles={[]}
                  feedback={[]}
                  onAddCourse={() => {}}
                  onAddNews={() => {}}
                  onExportData={() => {}}
                />
              }
            />
            <Route
              path="/overview"
              element={
                <Overview
                  courses={[]}
                  newsArticles={[]}
                  feedback={[]}
                  onAddCourse={() => {}}
                  onAddNews={() => {}}
                  onExportData={() => {}}
                />
              }
            />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/content" element={<ContentManagement />} />
            <Route path="/community" element={<Community />} />
            <Route path="/news" element={<NewsUpdates />} />
            <Route path="/quizzes" element={<QuizManagement />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/logs" element={<SystemLogs />} />
            <Route path="/settings" element={<SystemSettings />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;