// services/adminCourseService.ts
import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/v1`;

// Types
export interface CourseData {
  category: string;
  type: string;
  videoId: string;
  title: string;
  creator: string;
  courseImage: string;
  creatorImage: string;
  link: string;
  description: string;
  duration?: string;
  students?: number;
  rating?: number;
}

export interface Course extends CourseData {
  _id: string;
  uploadedBy?: {
    _id: string;
    name: string;
    email: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface CourseStats {
  totalCourses: number;
  categories: number;
  categoryCounts: Array<{
    _id: string;
    count: number;
  }>;
}

export interface YouTubeDetailsResponse {
  videoId: string;
  title: string;
  creator: string;
  courseImage: string;
  creatorImage: string;
  link: string;
  description: string;
  duration: string;
  students: number;
  rating: number;
  category: string;
  type: string;
}

// Fetch YouTube details for auto-populate
export const fetchYouTubeDetails = async (
  videoId: string, 
  category: string, 
  type: string
): Promise<ApiResponse<YouTubeDetailsResponse>> => {
  const response = await axios.post<ApiResponse<YouTubeDetailsResponse>>(
    `${API_BASE_URL}/admin-courses/fetch-youtube`,
    { videoId, category, type },
    { withCredentials: true }
  );
  return response.data;
};

// Create a new admin course
export const createAdminCourse = async (
  courseData: CourseData
): Promise<ApiResponse<Course>> => {
  const response = await axios.post<ApiResponse<Course>>(
    `${API_BASE_URL}/admin-courses`,
    courseData,
    { withCredentials: true }
  );
  return response.data;
};

// Get all admin courses (public - no auth required)
export const getAllAdminCourses = async (
  search?: string, 
  category?: string
): Promise<ApiResponse<Course[]>> => {
  const params: Record<string, string> = {};
  if (search) params.search = search;
  if (category && category !== 'All') params.category = category;

  const response = await axios.get<ApiResponse<Course[]>>(
    `${API_BASE_URL}/admin-courses`, 
    { params }
  );
  return response.data;
};

// Get admin course statistics
export const getAdminCourseStats = async (): Promise<ApiResponse<CourseStats>> => {
  const response = await axios.get<ApiResponse<CourseStats>>(
    `${API_BASE_URL}/admin-courses/stats`
  );
  return response.data;
};

// Update admin course
export const updateAdminCourse = async (
  courseId: string, 
  updates: Partial<CourseData>
): Promise<ApiResponse<Course>> => {
  const response = await axios.put<ApiResponse<Course>>(
    `${API_BASE_URL}/admin-courses/${courseId}`,
    updates,
    { withCredentials: true }
  );
  return response.data;
};

// Delete admin course
export const deleteAdminCourse = async (
  courseId: string
): Promise<ApiResponse<{ message: string }>> => {
  const response = await axios.delete<ApiResponse<{ message: string }>>(
    `${API_BASE_URL}/admin-courses/${courseId}`,
    { withCredentials: true }
  );
  return response.data;
};