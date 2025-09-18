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
        console.log("Total Users Response:", totalUsersRes.totalUsers
);
        
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
  console.log(stats);
  

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
const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"];
  return (
<div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-gray-950 to-black">
  {/* Title */}
  <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 drop-shadow-lg">
    📊 Analytics Dashboard
  </h2>

  {/* Overview Stats */}
  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[
      { label: "Total Users", value: stats.totalUsers },
      { label: "Active Users (7 days)", value: stats.activeUsers },
      { label: "Total Sessions", value: stats.sessions },
      { label: "Modules Completed", value: stats.modulesCompleted },
      { label: "Quiz Attempts", value: stats.quizAttempts },
      { label: "Feedback Submitted", value: stats.feedbackCount },
    ].map((item, idx) => (
      <div
        key={idx}
        className="relative overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20 p-6 rounded-2xl shadow-lg hover:scale-105 hover:shadow-cyan-500/20 transition-all duration-500"
      >
        {/* Glow background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-fuchsia-500/10 to-purple-500/10 opacity-70 pointer-events-none" />
        <p className="text-sm font-medium text-gray-300 relative">{item.label}</p>
        <p className="text-4xl font-extrabold text-white mt-2 relative">
          {item.value}
        </p>
      </div>
    ))}
  </div>

  {/* Charts Section */}
  <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
    {/* Bar Chart */}
    <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-6 rounded-2xl shadow-lg hover:shadow-blue-500/30 transition">
      <h3 className="text-lg font-semibold mb-4 text-cyan-400">User Overview</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={barData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(20,20,40,0.9)",
              border: "1px solid #0ff",
              borderRadius: "12px",
              color: "#fff",
            }}
          />
          <Legend />
          <Bar dataKey="total" fill="url(#barBlue)" radius={[6, 6, 0, 0]} />
          <Bar dataKey="active" fill="url(#barGreen)" radius={[6, 6, 0, 0]} />
          <defs>
            <linearGradient id="barBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.8} />
            </linearGradient>
            <linearGradient id="barGreen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#15803d" stopOpacity={0.8} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>

    {/* Line Chart */}
    <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-6 rounded-2xl shadow-lg hover:shadow-cyan-400/30 transition">
      <h3 className="text-lg font-semibold mb-4 text-cyan-400">Learning Progress</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={lineData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(20,20,40,0.9)",
              border: "1px solid #0ff",
              borderRadius: "12px",
              color: "#fff",
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#06b6d4"
            strokeWidth={3}
            dot={{ r: 5, fill: "#f0f" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>

    {/* Pie Chart */}
    <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-6 rounded-2xl shadow-lg hover:shadow-purple-500/30 transition">
      <h3 className="text-lg font-semibold mb-4 text-purple-400">Distribution</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={85}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={["#06b6d4", "#f0f", "#3b82f6", "#a78bfa"][index % 4]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(20,20,40,0.9)",
              border: "1px solid #a78bfa",
              borderRadius: "12px",
              color: "#fff",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
</div>

  );
};

export default AnalyticsDashboard;




