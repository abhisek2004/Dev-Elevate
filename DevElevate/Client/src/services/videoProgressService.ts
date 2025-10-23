// frontend/src/services/videoProgressService.ts
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/v1` : "http://localhost:5000/api/v1";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // ✅ Send cookies with requests (important!)
});

// Add token to requests with better debugging
api.interceptors.request.use(
  (config) => {
    // ✅ FIXED: Get token from devElevateAuth.sessionToken
    let token = null;
    
    // First, try to get token from devElevateAuth
    const devElevateAuth = localStorage.getItem("devElevateAuth");
    if (devElevateAuth) {
      try {
        const authData = JSON.parse(devElevateAuth);
        // ✅ The token is stored as 'sessionToken' in devElevateAuth
        token = authData.sessionToken || authData.token || authData.accessToken || authData.authToken;
      } catch (e) {
        console.error("❌ Failed to parse devElevateAuth:", e);
      }
    }
    
    // Fallback to other possible token locations
    if (!token) {
      token = 
        localStorage.getItem("token") || 
        localStorage.getItem("authToken") ||
        localStorage.getItem("accessToken") ||
        sessionStorage.getItem("token");
    }
    
    console.log("🔍 Checking for token...");
    console.log("📦 devElevateAuth found:", devElevateAuth ? "✅ Yes" : "❌ No");
    console.log("🔑 sessionToken extracted:", token ? "✅ Yes" : "❌ No");
    
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
      console.log("✅ Authorization header set with Bearer token");
    } else {
      console.warn("⚠️ WARNING: No authentication token found!");
      console.warn("   Please make sure you're logged in");
    }
    
    console.log("📡 Making request to:", config.baseURL + config.url);
    return config;
  },
  (error) => {
    console.error("❌ Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    console.log("✅ Response received:", response.status);
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.error("🔴 401 Unauthorized - Token might be invalid or expired");
      console.error("Response:", error.response.data);
    }
    console.error("❌ API Error:", error.message);
    return Promise.reject(error);
  }
);

// Types
interface VideoProgressResponse {
  success: boolean;
  data?: {
    progressPercentage: number;
    currentTime: number;
    duration: number;
  };
  message?: string;
}

interface ContinueLearningResponse {
  success: boolean;
  data?: Array<{
    videoId: string;
    progressPercentage: number;
    videoTitle: string;
    courseName: string;
  }>;
  message?: string;
}

interface SavedVideoResponse {
  success: boolean;
  data?: Array<{
    videoId: string;
    courseId: string;
    videoTitle: string;
    courseName: string;
  }>;
  message?: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: unknown;
}

// Video Progress API
export const updateVideoProgress = async (
  videoId: string,
  courseId: string,
  currentTime: number,
  duration: number
): Promise<ApiResponse> => {
  try {
    const response = await api.post("/video/progress", {
      videoId,
      courseId,
      currentTime,
      duration,
    });
    return response.data as ApiResponse;
  } catch (error) {
    console.error("Failed to update video progress:", error);
    throw error;
  }
};

export const getVideoProgress = async (videoId: string): Promise<VideoProgressResponse> => {
  try {
    const response = await api.get(`/video/progress/${videoId}`);
    return response.data as VideoProgressResponse;
  } catch (error) {
    console.error("Failed to get video progress:", error);
    throw error;
  }
};

export const getContinueLearning = async (): Promise<ContinueLearningResponse> => {
  try {
    const response = await api.get("/video/continue-learning");
    return response.data as ContinueLearningResponse;
  } catch (error) {
    console.error("Failed to get continue learning:", error);
    throw error;
  }
};

export const getCourseProgress = async (courseId: string): Promise<ApiResponse> => {
  try {
    const response = await api.get(`/video/course-progress/${courseId}`);
    return response.data as ApiResponse;
  } catch (error) {
    console.error("Failed to get course progress:", error);
    throw error;
  }
};

// Saved Videos API
export const saveVideo = async (
  videoId: string,
  courseId: string,
  videoTitle: string,
  courseName: string
): Promise<ApiResponse> => {
  try {
    const response = await api.post("/video/saved", {
      videoId,
      courseId,
      videoTitle,
      courseName,
    });
    return response.data as ApiResponse;
  } catch (error) {
    console.error("Failed to save video:", error);
    throw error;
  }
};

export const unsaveVideo = async (videoId: string): Promise<ApiResponse> => {
  try {
    const response = await api.delete(`/video/saved/${videoId}`);
    return response.data as ApiResponse;
  } catch (error) {
    console.error("Failed to unsave video:", error);
    throw error;
  }
};

export const getSavedVideos = async (): Promise<SavedVideoResponse> => {
  try {
    const response = await api.get("/video/saved");
    return response.data as SavedVideoResponse;
  } catch (error) {
    console.error("Failed to get saved videos:", error);
    throw error;
  }
};

export const checkIfVideoSaved = async (videoId: string): Promise<ApiResponse> => {
  try {
    const response = await api.get(`/video/saved/check/${videoId}`);
    return response.data as ApiResponse;
  } catch (error) {
    console.error("Failed to check if video is saved:", error);
    throw error;
  }
};