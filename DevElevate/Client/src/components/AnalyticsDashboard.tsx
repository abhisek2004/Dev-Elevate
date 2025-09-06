import React, { useEffect, useState } from "react";
import {
  fetchTotalUsers,
  fetchActiveUsers,
  fetchSessions,
  fetchModulesCompleted,
  fetchQuizAttempts,
  fetchFeedback,
} from "../services/analyticsService";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Stats = {
  totalUsers: number;
  activeUsers: number;
  sessions: number;
  modulesCompleted: number;
  quizAttempts: number;
  feedbackCount: number;
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

const AnalyticsDashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    activeUsers: 0,
    sessions: 0,
    modulesCompleted: 0,
    quizAttempts: 0,
    feedbackCount: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalUsersRes = await fetchTotalUsers();
        const activeUsersRes = await fetchActiveUsers("week");
        const sessionsRes = await fetchSessions();
        const modulesRes = await fetchModulesCompleted();
        const quizRes = await fetchQuizAttempts();
        const feedbackRes = await fetchFeedback();

        setStats({
          totalUsers: totalUsersRes.totalUsers,
          activeUsers: activeUsersRes.activeUsers,
          sessions: sessionsRes.totalSessions,
          modulesCompleted: modulesRes.modulesCompleted,
          quizAttempts: quizRes.quizAttempts,
          feedbackCount: feedbackRes.feedbackCount,
        });
      } catch (err) {
        console.error("❌ Error fetching analytics data:", err);
      }
    };

    fetchData();
  }, []);

  // Chart datasets
  const barData = [
    { name: "Users", total: stats.totalUsers, active: stats.activeUsers },
    { name: "Sessions", total: stats.sessions },
  ];

  const lineData = [
    { name: "Modules Completed", value: stats.modulesCompleted },
    { name: "Quiz Attempts", value: stats.quizAttempts },
  ];

  const pieData = [
    { name: "Users", value: stats.totalUsers },
    { name: "Active Users", value: stats.activeUsers },
    { name: "Sessions", value: stats.sessions },
    { name: "Feedback", value: stats.feedbackCount },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Analytics Dashboard</h2>

      {/* Overview */}
      <div style={{ marginBottom: "20px" }}>
        <p><b>Total Users:</b> {stats.totalUsers}</p>
        <p><b>Active Users (last 7 days):</b> {stats.activeUsers}</p>
        <p><b>Total Sessions:</b> {stats.sessions}</p>
        <p><b>Modules Completed:</b> {stats.modulesCompleted}</p>
        <p><b>Quiz Attempts:</b> {stats.quizAttempts}</p>
        <p><b>Feedback Submitted:</b> {stats.feedbackCount}</p>
      </div>

      {/* Charts Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
        {/* Bar Chart */}
        <div style={{ background: "#fff", padding: "15px", borderRadius: "8px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
          <h3>User Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#8884d8" />
              <Bar dataKey="active" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div style={{ background: "#fff", padding: "15px", borderRadius: "8px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
          <h3>Learning Progress</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div style={{ background: "#fff", padding: "15px", borderRadius: "8px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
          <h3>Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;




