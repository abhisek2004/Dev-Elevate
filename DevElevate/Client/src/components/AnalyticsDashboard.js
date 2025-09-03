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

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

const AnalyticsDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalSessions: 0,
    modulesCompleted: 0,
    quizAttempts: 0,
    feedbackCount: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [users, active, sessions, modules, quiz, feedback] = await Promise.all([
          fetchTotalUsers(),
          fetchActiveUsers(),
          fetchSessions(),
          fetchModulesCompleted(),
          fetchQuizAttempts(),
          fetchFeedback(),
        ]);

        setStats({
          totalUsers: users.totalUsers,
          activeUsers: active.activeUsers,
          totalSessions: sessions.totalSessions,
          modulesCompleted: modules.modulesCompleted,
          quizAttempts: quiz.quizAttempts,
          feedbackCount: feedback.feedbackCount,
        });
      } catch (err) {
        console.error("Error loading analytics:", err);
      }
    };

    loadData();
  }, []);

  // Dummy transformed data for charts
  const weeklySignupsData = [
    { day: "Mon", users: Math.floor(stats.totalUsers / 7) },
    { day: "Tue", users: Math.floor(stats.totalUsers / 6) },
    { day: "Wed", users: Math.floor(stats.totalUsers / 5) },
    { day: "Thu", users: Math.floor(stats.totalUsers / 4) },
    { day: "Fri", users: Math.floor(stats.totalUsers / 3) },
    { day: "Sat", users: Math.floor(stats.totalUsers / 2) },
    { day: "Sun", users: stats.totalUsers },
  ];

  const pieData = [
    { name: "Modules Completed", value: stats.modulesCompleted },
    { name: "Quiz Attempts", value: stats.quizAttempts },
    { name: "Feedback", value: stats.feedbackCount },
  ];

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">📊 Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-gray-800 p-4 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Weekly Signups</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklySignupsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-gray-800 p-4 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Learning Sessions</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={[
                { name: "Start", sessions: 0 },
                { name: "Now", sessions: stats.totalSessions },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sessions" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-gray-800 p-4 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Engagement Breakdown</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                fill="#8884d8"
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
