import axios from "axios";

const API_URL = "/api/analytics"; // Adjust if backend is on another host

// ✅ Add JWT from localStorage (assuming you save it after login)
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const fetchTotalUsers = async () => {
  const res = await axios.get(`${API_URL}/total-users`, getAuthHeader());
  return res.data;
};

export const fetchActiveUsers = async (period = "week") => {
  const res = await axios.get(`${API_URL}/active-users?period=${period}`, getAuthHeader());
  return res.data;
};

export const fetchSessions = async () => {
  const res = await axios.get(`${API_URL}/sessions`, getAuthHeader());
  return res.data;
};

export const fetchModulesCompleted = async () => {
  const res = await axios.get(`${API_URL}/modules-completed`, getAuthHeader());
  return res.data;
};

export const fetchQuizAttempts = async () => {
  const res = await axios.get(`${API_URL}/quiz-attempts`, getAuthHeader());
  return res.data;
};

export const fetchFeedback = async () => {
  const res = await axios.get(`${API_URL}/feedback`, getAuthHeader());
  return res.data;
};
