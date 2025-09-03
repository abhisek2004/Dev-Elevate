import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/analytics";

// ✅ Attach JWT from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
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
export const fetchTotalUsers = () => safeGet<{ totalUsers: number }>(`${API_URL}/total-users`);
export const fetchActiveUsers = (period: string = "week") =>
  safeGet<{ activeUsers: number }>(`${API_URL}/active-users?period=${period}`);
export const fetchSessions = () => safeGet<{ totalSessions: number }>(`${API_URL}/sessions`);
export const fetchModulesCompleted = () =>
  safeGet<{ modulesCompleted: number }>(`${API_URL}/modules-completed`);
export const fetchQuizAttempts = () => safeGet<{ quizAttempts: number }>(`${API_URL}/quiz-attempts`);
export const fetchFeedback = () => safeGet<{ feedbackCount: number }>(`${API_URL}/feedback`);

