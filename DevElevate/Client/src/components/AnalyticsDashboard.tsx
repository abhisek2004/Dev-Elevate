import React, { useEffect, useState } from "react";
import {
  getTotalUsers,
  getActiveUsers,
  getSessions,
  getModulesCompleted,
  getQuizAttempts,
  getFeedback,
} from "../services/analyticsService";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AnalyticsDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>({
    totalUsers: 0,
    activeUsers: 0,
    sessions: 0,
    modulesCompleted: 0,
    quizAttempts: 0,
    feedbackCount: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const totalUsers = await getTotalUsers();
      const activeUsers = await getActiveUsers();
      const sessions = await getSessions();
      const modulesCompleted = await getModulesCompleted();
      const quizAttempts = await getQuizAttempts();
      const feedback = await getFeedback();

      setStats({
        totalUsers: totalUsers.totalUsers,
        activeUsers: activeUsers.activeUsers,
        sessions: sessions.totalSessions,
        modulesCompleted: modulesCompleted.modulesCompleted,
        quizAttempts: quizAttempts.quizAttempts,
        feedbackCount: feedback.feedbackCount,
      });
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Analytics Dashboard</h2>

      <p><b>Total Users:</b> {stats.totalUsers}</p>
      <p><b>Active Users (last 7 days):</b> {stats.activeUsers}</p>
      <p><b>Total Sessions:</b> {stats.sessions}</p>
      <p><b>Modules Completed:</b> {stats.modulesCompleted}</p>
      <p><b>Quiz Attempts:</b> {stats.quizAttempts}</p>
      <p><b>Feedback Submitted:</b> {stats.feedbackCount}</p>

      {/* Example Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={[{ name: "Users", total: stats.totalUsers, active: stats.activeUsers }]}>
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
  );
};

export default AnalyticsDashboard;


