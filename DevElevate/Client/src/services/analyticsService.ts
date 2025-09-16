import axios from "axios";

import { baseUrl } from "../config/routes";

// ✅ Attach JWT from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  return {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true, 
  };
};
// ✅ Generic GET with error handling
const safeGet = async <T>(url: string): Promise<T> => {
  try {
    const res = await axios.get<T>(url, getAuthHeader());
    return res.data;
  } catch (err: any) {
    console.error(`❌ Error fetching ${url}:`, err.response?.data || err.message);
    throw err.response?.data || { message: "Server error" };
  }
};

// 📊 API Methods
export const fetchTotalUsers = () => safeGet<{ totalUsers: number }>(`${baseUrl}/api/v1/admin/analytics/total-users`);
export const fetchActiveUsers = (period: string = "week") =>
  safeGet<{ activeUsers: number }>(`${baseUrl}/api/v1/admin/analytics/active-users?period=${period}`);
export const fetchSessions = () => safeGet<{ totalSessions: number }>(`${baseUrl}/api/v1/admin/analytics/sessions`);
export const fetchModulesCompleted = () =>
  safeGet<{ modulesCompleted: number }>(`${baseUrl}/api/v1/admin/analytics/modules-completed`);
export const fetchQuizAttempts = () => safeGet<{ quizAttempts: number }>(`${baseUrl}/api/v1/admin/analytics/quiz-attempts`);
export const fetchFeedback = () => safeGet<{ feedbackCount: number }>(`${baseUrl}/api/v1/admin/analytics/feedback`);

// 📈 Enhanced Analytics Methods
export const fetchUserGrowth = (period: string = "month", months: number = 6) =>
  safeGet<{ userGrowth: Array<{ month: string; users: number; active: number }> }>(
    `${baseUrl}/api/v1/admin/analytics/user-growth?period=${period}&months=${months}`
  );

export const fetchActivityLogs = (limit: number = 50, type?: string) =>
  safeGet<{ activities: Array<{ id: number; user: string; action: string; time: string; type: string }> }>(
    `${baseUrl}/api/v1/admin/analytics/activity-logs?limit=${limit}${type ? `&type=${type}` : ''}`
  );

export const fetchUsageStats = () => safeGet<{
  totalUsers: number;
  totalQuizzes: number;
  totalFeedback: number;
  averageSessionDuration: number;
  popularModules: Array<{ name: string; users: number }>;
  deviceTypes: Array<{ device: string; percentage: number }>;
}>(`${baseUrl}/api/v1/admin/analytics/usage-stats`);

export const exportAnalytics = (format: string = "json", dataType: string = "overview", startDate?: string, endDate?: string) => {
  const params = new URLSearchParams({
    format,
    dataType,
    ...(startDate && { startDate }),
    ...(endDate && { endDate })
  });
  return safeGet<any>(`${baseUrl}/api/v1/admin/analytics/export?${params}`);
};

// 🔄 New Advanced Analytics Methods
export const fetchUserActivityInsights = (params: {
  startDate?: string;
  endDate?: string;
  userType?: string;
  activityType?: string;
  limit?: number;
}) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) searchParams.append(key, value.toString());
  });
  return safeGet<{
    users: Array<{
      username: string;
      email: string;
      role: string;
      createdAt: string;
      lastLogin?: string;
    }>;
    metrics: {
      totalUsers: number;
      activeUsersLast7Days: number;
      activeUsersLast30Days: number;
      engagementRate7Days: number;
      engagementRate30Days: number;
    };
    activityTypeStats: Array<{
      type: string;
      count: number;
    }>;
    filters: {
      startDate?: string;
      endDate?: string;
      userType?: string;
      activityType?: string;
    };
  }>(`${baseUrl}/api/v1/admin/analytics/user-activity-insights?${searchParams}`);
};

export const fetchUserGrowthTrends = (params: {
  startDate?: string;
  endDate?: string;
  interval?: 'day' | 'week' | 'month';
}) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) searchParams.append(key, value.toString());
  });
  return safeGet<{
    trends: Array<{
      period: string;
      newUsers: number;
      activeUsers: number;
      totalUsers: number;
    }>;
    interval: string;
    dateRange: {
      start: string;
      end: string;
    };
  }>(`${baseUrl}/api/v1/admin/analytics/user-growth-trends?${searchParams}`);
};

export const fetchPlatformOverview = (dateRange: 'all' | 'week' | 'month' | 'quarter' | 'year' = 'all') =>
  safeGet<{
    overview: {
      totalUsers: number;
      adminUsers: number;
      regularUsers: number;
      totalQuizzes: number;
      totalFeedback: number;
      dateRange: string;
    };
    userEngagement: {
      highly_active: number;
      moderately_active: number;
      less_active: number;
    };
    popularModules: Array<{
      name: string;
      completions: number;
      engagement: string;
    }>;
    performanceMetrics: {
      averageQuizScore: string;
      averageCompletionRate: string;
      averageSessionDuration: number;
      userRetentionRate: string;
    };
    platformStats: {
      devices: Array<{
        type: string;
        users: number;
        percentage: number;
      }>;
      browsers: Array<{
        name: string;
        percentage: number;
      }>;
    };
  }>(`${baseUrl}/api/v1/admin/analytics/platform-overview?dateRange=${dateRange}`);

// 📥 Download utilities
export const downloadAnalyticsData = async (format: 'csv' | 'json' | 'excel', dataType: string, startDate?: string, endDate?: string) => {
  try {
    const params = new URLSearchParams({
      format,
      dataType,
      ...(startDate && { startDate }),
      ...(endDate && { endDate })
    });
    
    const response = await fetch(`${baseUrl}/api/v1/admin/analytics/export?${params}`, getAuthHeader());
    
    if (!response.ok) {
      throw new Error('Export failed');
    }
    
    const filename = `analytics-${dataType}-${new Date().toISOString().split('T')[0]}.${format === 'excel' ? 'json' : format}`;
    
    if (format === 'csv') {
      const csvData = await response.text();
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      const jsonData = await response.json();
      const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    }
    
    return { success: true, filename };
  } catch (error) {
    console.error('Download failed:', error);
    throw error;
  }
};

