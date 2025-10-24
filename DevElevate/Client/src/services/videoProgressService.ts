// frontend/src/services/videoProgressService.ts
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api/v1` 
  : "http://localhost:5000/api/v1";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// ✅ IMPROVED: Better token extraction
api.interceptors.request.use(
  (config) => {
    let token = null;
    
    const devElevateAuth = localStorage.getItem("devElevateAuth");
    if (devElevateAuth) {
      try {
        const authData = JSON.parse(devElevateAuth);
        token = authData.sessionToken || authData.token || authData.accessToken || authData.authToken;
      } catch (e) {
        console.error("❌ Failed to parse devElevateAuth:", e);
      }
    }
    
    if (!token) {
      token = 
        localStorage.getItem("token") || 
        localStorage.getItem("authToken") ||
        localStorage.getItem("accessToken") ||
        sessionStorage.getItem("token");
    }
    
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("🔴 401 Unauthorized - Token might be invalid or expired");
    }
    return Promise.reject(error);
  }
);

// ✅ IMPROVED: Better TypeScript types
interface VideoProgressData {
  progressPercentage: number;
  currentTime: number;
  duration: number;
  isCompleted: boolean;
  lastWatchedAt: string;
}

interface VideoProgressResponse {
  success: boolean;
  data?: VideoProgressData | null;
  message?: string;
}

interface ContinueLearningItem {
  videoId: string;
  courseId: string;
  progressPercentage: number;
  currentTime: number;
  duration: number;
  videoTitle?: string;
  courseName?: string;
  lastWatchedAt: string;
}

interface ContinueLearningResponse {
  success: boolean;
  data?: ContinueLearningItem[];
  message?: string;
}

interface SavedVideoItem {
  videoId: string;
  courseId: string;
  videoTitle: string;
  courseName: string;
  createdAt: string;
}

interface SavedVideoResponse {
  success: boolean;
  data?: SavedVideoItem[];
  message?: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: unknown;
}

interface YouTubeCourse {
  title: string;
  creator: string;
  courseImage: string;
  creatorImage: string;
  link: string;
  description: string;
  videoId: string;
  category?: string;
  duration?: string;
  students?: number;
  rating?: number;
  progress?: number;
  courseId?: string;
}

interface YouTubeCoursesResponse {
  success: boolean;
  data?: YouTubeCourse[];
  message?: string;
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

// YouTube Courses API
export const getYouTubeCourses = async (
  search?: string,
  category?: string,
  maxResults: number = 12
): Promise<YouTubeCoursesResponse> => {
  try {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category && category !== 'All') params.append('category', category);
    params.append('maxResults', maxResults.toString());

    const response = await api.get(`/courses/youtube?${params.toString()}`);
    return response.data as YouTubeCoursesResponse;
  } catch (error) {
    console.error("Failed to fetch YouTube courses:", error);
    throw error;
  }
};

// ✅ Export types for use in components
export type {
  VideoProgressData,
  VideoProgressResponse,
  ContinueLearningItem,
  ContinueLearningResponse,
  SavedVideoItem,
  SavedVideoResponse,
  YouTubeCourse,
  YouTubeCoursesResponse,
  ApiResponse
};