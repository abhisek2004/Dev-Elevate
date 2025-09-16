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
  const { state } = useAuth();
  const location = useLocation();
  const { isAuthenticated, user } = state;
  const [loading, setLoading] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
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
  }, []);

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

  if ((maintenanceMode && requireAuth) && user?.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center text-white bg-gray-900">
        <h1 className="mb-4 text-4xl font-bold">🚧 Site Under Maintenance 🚧</h1>
        <p className="mb-6 text-gray-400">We’ll be back soon. Please check later.</p>
        <button
          onClick={() => navigate("/")} // goes back to previous page
          className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
