import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useGlobalState, User } from "../../contexts/GlobalContext";
import StatsCards from "./StatsCards";
import ProgressWidget from "./ProgressWidget";
import NewsWidget from "./NewsWidget";
import QuickActions from "./QuickActions";
import StreakCalendar from "./StreakCalendar";
import DailyGoals from "./DailyGoals";
import QuizHistory from "../Quiz/QuizHistory";
import { baseUrl } from "../../config/routes";

const Dashboard: React.FC = () => {
  const { state: authState } = useAuth();
  const { state, dispatch } = useGlobalState();

  useEffect(() => {
    // Initialize user if not exists
    if (!state.user) {
      const defaultUser: User = {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        joinDate: new Date().toISOString(),
        streak: 0,
        totalPoints: 0,
        level: "Intermediate",
      };
      dispatch({ type: "SET_USER", payload: defaultUser });
    }

    // Fetch streak data from backend
    const fetchStreakData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/v1/user/streak`, {
          headers: {
            Authorization: `Bearer ${authState.sessionToken}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          // ✅ Build a complete safe User object
          const safeUser: User = {
            id: state.user?.id ?? authState.user?.id ?? "temp-id",
            name: state.user?.name ?? authState.user?.name ?? "New User",
            email: state.user?.email ?? authState.user?.email ?? "unknown@example.com",
            joinDate: state.user?.joinDate ?? new Date().toISOString(),
            streak: data.currentStreakData?.currentStreak ?? 0,
            totalPoints: state.user?.totalPoints ?? 0,
            level: state.user?.level ?? "Beginner",
          };

          dispatch({
            type: "SET_USER",
            payload: safeUser,
          });

          // Convert streak data for StreakCalendar
          const streakData: Record<string, boolean> = {};
          data.currentStreakData?.dayStreak?.forEach(
            (visit: { dateOfVisiting: string | number | Date }) => {
              const date = new Date(visit.dateOfVisiting)
                .toISOString()
                .split("T")[0];
              streakData[date] = true;
            }
          );

          dispatch({ type: "HYDRATE_STATE", payload: { streakData } });
        }
      } catch (error) {
        console.error("Error fetching streak data:", error);
      }
    };

    if (authState.isAuthenticated && authState.sessionToken) {
      fetchStreakData();
    }
  }, [authState.isAuthenticated, authState.sessionToken, dispatch, state.user]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        state.darkMode ? "bg-gray-900" : "bg-gray-50"
      } transition-colors duration-200`}
    >
      <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-10">
          <h1
            className={`text-4xl font-extrabold tracking-tight mb-3 ${
              state.darkMode ? "text-white" : "text-gray-900"
            }`}
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
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            <ProgressWidget />
            <NewsWidget />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <QuickActions />
            <QuizHistory />
            <DailyGoals />
            <StreakCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
