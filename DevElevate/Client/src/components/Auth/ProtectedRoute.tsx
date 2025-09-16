import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { baseUrl } from "../../config/routes";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
  redirectTo?: string;
}
interface SystemSettings {
  siteName: string;
  maintenanceMode: boolean;
  registrationEnabled: boolean;
  emailNotifications: boolean;
  maxUsersPerCourse: number;
  sessionTimeout: number;
}

interface ApiResponse {
  success: boolean;
  settings: SystemSettings;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  requireAdmin = false,
  redirectTo = "/login",
}) => {
  const { state, logout } = useAuth();
  const location = useLocation();
  const { isAuthenticated, user } = state;
  const [loading, setLoading] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    

    const checkAuthAndSettings = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const res = await axios.get<ApiResponse>(
          `${baseUrl}/api/v1/admin/system-settings`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMaintenanceMode(res.data.settings?.maintenanceMode || false);
      } catch (error) {
        console.error("Error fetching system settings:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndSettings();
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Not logged in → redirect to login
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (loading) return <p>Loading...</p>;
  if (
    !requireAdmin &&
    user?.role === "admin" &&
    location.pathname !== "/admin"
  ) {
    return <Navigate to="/admin" replace />;
  }

  // Non-admin accessing admin route → redirect to home (/)
  if (requireAdmin && user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  if (maintenanceMode && requireAuth && user?.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center text-white bg-gray-900 space-y-6">
        {/* Smaller image */}
        <img
          src="https://thumbs.dreamstime.com/b/thin-line-style-under-maintenance-message-banner-100071034.jpg"
          alt="under-maintenance"
          className="w-80 h-auto rounded-lg shadow-lg" 
        />

        <p className="text-gray-400">We’ll be back soon. Please check later.</p>

        {/* Countdown */}
        <div className="text-3xl font-bold text-yellow-400">
          ⏳ {formatTime(timeLeft)}
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="px-6 py-2 font-semibold text-black bg-red-400 rounded-md hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
