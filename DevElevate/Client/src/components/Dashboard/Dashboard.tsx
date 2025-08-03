import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useGlobalState } from "../../contexts/GlobalContext";
import StatsCards from "./StatsCards";
import ProgressWidget from "./ProgressWidget";
import NewsWidget from "./NewsWidget";
import QuickActions from "./QuickActions";
import StreakCalendar from "./StreakCalendar";
import DailyGoals from "./DailyGoals";
import axiosInstance from "../../utils/axiosinstance";

// Type for dashboard stats response
interface DashboardStatsResponse {
  success: boolean;
  data: {
    totalPoints: number;
    currentStreak: number;
    completedGoals: number;
    learningProgress: {
      dsa: { completed: number; total: number };
      java: { completed: number; total: number };
      mern: { completed: number; total: number };
      aiml: { completed: number; total: number };
    };
    totalModulesCompleted: number;
  };
}

const Dashboard: React.FC = () => {
  const { state, dispatch } = useGlobalState();
  const { state: authState } = useAuth();

  // Function to fetch and update dashboard stats
  const fetchStats = async () => {
    try {
      const res = await axiosInstance.get("/dashboard-stats");
      const data = res.data as DashboardStatsResponse;
      if (data.success) {
        dispatch({ type: "SET_DASHBOARD_STATS", payload: data.data });
      }
    } catch (err) {
      console.error("Failed to fetch dashboard stats:", err);
    }
  };

  useEffect(() => {
    // Fetch dashboard stats from backend
    if (authState.sessionToken) {
      fetchStats();
    }
    // Initialize sample news items
    if (state.newsItems.length === 0) {
      const sampleNews = [
        {
          id: "1",
          title: "React 18.3 Released with New Features",
          summary:
            "Latest React version brings performance improvements and new hooks",
          url: "#",
          publishDate: new Date().toISOString(),
          category: "tech" as const,
        },
        {
          id: "2",
          title: "Google Summer Internship 2024",
          summary: "Applications open for software engineering internships",
          url: "#",
          publishDate: new Date().toISOString(),
          category: "internships" as const,
        },
        {
          id: "3",
          title: "AI/ML Engineer Positions at Microsoft",
          summary: "Multiple openings for machine learning specialists",
          url: "#",
          publishDate: new Date().toISOString(),
          category: "jobs" as const,
        },
      ];
      dispatch({ type: "UPDATE_NEWS", payload: sampleNews });
    }
  }, [authState.sessionToken, state.newsItems.length, dispatch]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300  ${
        state.darkMode ? "bg-gray-900" : "bg-gray-50"
      } transition-colors duration-200`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome Section */}
        <div className="mb-10">
          <h1
            className={`text-4xl font-extrabold tracking-tight mb-3 ${
              state.darkMode ? "text-white" : "text-gray-900"
            } `}
          >
            Welcome back, {authState.user?.name || "Developer"}! 👋
          </h1>
          <p
            className={`text-lg sm:text-xl font-medium leading-relaxed ${
              state.darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Ready to continue your learning journey?
          </p>
        </div>

        {/* Stats Cards */}
        <StatsCards />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <ProgressWidget />
            <DailyGoals />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <QuickActions />
            <NewsWidget />
            <StreakCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the refresh function so other components can use it
export const refreshDashboardStats = async () => {
  try {
    const res = await axiosInstance.get("/dashboard-stats");
    const data = res.data as DashboardStatsResponse;
    if (data.success) {
      // This will be called from other components that need to refresh stats
      return data.data;
    }
  } catch (err) {
    console.error("Failed to refresh dashboard stats:", err);
  }
};

export default Dashboard;
