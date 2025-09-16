import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Code2, 
  TrendingUp, 
  Activity, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Search,
  Filter,
  Download,
  Upload,
  Settings,
  Shield,
  Database,
  BarChart3,
  PieChart,
  Calendar,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPie, Cell, AreaChart, Area } from 'recharts';
import * as analyticsService from '../../../services/analyticsService';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  // Analytics state
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalSessions: 0,
    modulesCompleted: 0,
    quizAttempts: 0,
    feedbackCount: 0,
  });
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analyticsError, setAnalyticsError] = useState('');
  const [analyticsPeriod, setAnalyticsPeriod] = useState('week');
  const [chartType, setChartType] = useState('bar');
  const [userGrowthData, setUserGrowthData] = useState([
    { month: 'Jan', users: 8500, active: 2100 },
    { month: 'Feb', users: 9200, active: 2450 },
    { month: 'Mar', users: 10100, active: 2800 },
    { month: 'Apr', users: 11200, active: 3100 },
    { month: 'May', users: 12000, active: 3350 },
    { month: 'Jun', users: 12547, active: 3456 },
  ]);
  // Fetch analytics data
  useEffect(() => {
    if (activeTab !== 'analytics') return;
    setAnalyticsLoading(true);
    setAnalyticsError('');
    Promise.all([
      analyticsService.fetchTotalUsers(),
      analyticsService.fetchActiveUsers(analyticsPeriod),
      analyticsService.fetchSessions(),
      analyticsService.fetchModulesCompleted(),
      analyticsService.fetchQuizAttempts(),
      analyticsService.fetchFeedback(),
      analyticsService.fetchUserGrowth('month', 6),
    ])
      .then(([totalUsers, activeUsers, totalSessions, modulesCompleted, quizAttempts, feedback, userGrowth]) => {
        setAnalytics({
          totalUsers: totalUsers.totalUsers,
          activeUsers: activeUsers.activeUsers,
          totalSessions: totalSessions.totalSessions,
          modulesCompleted: modulesCompleted.modulesCompleted,
          quizAttempts: quizAttempts.quizAttempts,
          feedbackCount: feedback.feedbackCount,
        });
        setUserGrowthData(userGrowth.userGrowth);
      })
      .catch((err) => {
        setAnalyticsError('Failed to load analytics data.');
      })
      .finally(() => setAnalyticsLoading(false));
  }, [activeTab, analyticsPeriod]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for admin dashboard
  const stats = {
    totalUsers: 12547,
    activeUsers: 3456,
    totalProblems: 1234,
    submissions: 45678
  };

  const recentActivity = [
    { id: '1', user: 'john_doe', action: 'Solved Two Sum', time: '2 minutes ago', type: 'solve' },
    { id: '2', user: 'jane_smith', action: 'Submitted contest entry', time: '5 minutes ago', type: 'submit' },
    { id: '3', user: 'mike_wilson', action: 'Created new account', time: '10 minutes ago', type: 'register' },
    { id: '4', user: 'sarah_jones', action: 'Won weekly contest', time: '1 hour ago', type: 'win' },
  ];

  const submissionData = [
    { language: 'Python', count: 15420, color: '#3776AB' },
    { language: 'JavaScript', count: 12350, color: '#F7DF1E' },
    { language: 'Java', count: 9870, color: '#ED8B00' },
    { language: 'C++', count: 7650, color: '#00599C' },
    { language: 'C', count: 4320, color: '#A8B9CC' },
  ];

  const problemsData = [
    { difficulty: 'Easy', count: 456, color: '#10B981' },
    { difficulty: 'Medium', count: 567, color: '#F59E0B' },
    { difficulty: 'Hard', count: 211, color: '#EF4444' },
  ];

  const recentUsers = [
    { id: '1', username: 'alex_coder', email: 'alex@example.com', joined: '2024-01-20', status: 'active', solved: 23 },
    { id: '2', username: 'maria_dev', email: 'maria@example.com', joined: '2024-01-19', status: 'active', solved: 45 },
    { id: '3', username: 'john_algo', email: 'john@example.com', joined: '2024-01-18', status: 'inactive', solved: 12 },
    { id: '4', username: 'lisa_code', email: 'lisa@example.com', joined: '2024-01-17', status: 'active', solved: 67 },
  ];

  const recentProblems = [
    { id: '1', title: 'Binary Tree Traversal', difficulty: 'Medium', category: 'Trees', created: '2024-01-20', submissions: 234 },
    { id: '2', title: 'Dynamic Programming Basics', difficulty: 'Hard', category: 'DP', created: '2024-01-19', submissions: 156 },
    { id: '3', title: 'Array Manipulation', difficulty: 'Easy', category: 'Arrays', created: '2024-01-18', submissions: 445 },
    { id: '4', title: 'Graph Algorithms', difficulty: 'Hard', category: 'Graphs', created: '2024-01-17', submissions: 89 },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'problems', label: 'Problems', icon: Code2 },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-400/20 text-green-400';
      case 'inactive': return 'bg-gray-400/20 text-gray-400';
      default: return 'bg-gray-400/20 text-gray-400';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-400/20 text-green-400';
      case 'Medium': return 'bg-yellow-400/20 text-yellow-400';
      case 'Hard': return 'bg-red-400/20 text-red-400';
      default: return 'bg-gray-400/20 text-gray-400';
    }
  };

  // Export functions
  const exportToCSV = () => {
    const csvData = [
      ['Metric', 'Value', 'Period'],
      ['Total Users', analytics.totalUsers, analyticsPeriod],
      ['Active Users', analytics.activeUsers, analyticsPeriod],
      ['Total Sessions', analytics.totalSessions, analyticsPeriod],
      ['Modules Completed', analytics.modulesCompleted, analyticsPeriod],
      ['Quiz Attempts', analytics.quizAttempts, analyticsPeriod],
      ['Feedback Count', analytics.feedbackCount, analyticsPeriod],
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `analytics-${analyticsPeriod}-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToExcel = () => {
    // For now, just call CSV export - in a real implementation, you'd use a library like xlsx
    exportToCSV();
    alert('Excel export uses CSV format for now. Install xlsx library for proper Excel support.');
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
              <p className="text-xl text-gray-400">Manage your coding platform</p>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCreateModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-electric-400 to-neon-500 text-white rounded-lg hover:from-electric-500 hover:to-neon-600 transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
                <span>Create Problem</span>
              </motion.button>
              <Shield className="w-8 h-8 text-electric-400" />
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</div>
                <div className="text-gray-400">Total Users</div>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
            <div className="mt-2 text-sm text-green-400">↑ 12.3% from last month</div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">{stats.activeUsers.toLocaleString()}</div>
                <div className="text-gray-400">Active Users</div>
              </div>
              <Activity className="w-8 h-8 text-green-400" />
            </div>
            <div className="mt-2 text-sm text-green-400">↑ 8.7% from last month</div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">{stats.totalProblems.toLocaleString()}</div>
                <div className="text-gray-400">Total Problems</div>
              </div>
              <Code2 className="w-8 h-8 text-purple-400" />
            </div>
            <div className="mt-2 text-sm text-green-400">↑ 5.2% from last month</div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">{stats.submissions.toLocaleString()}</div>
                <div className="text-gray-400">Total Submissions</div>
              </div>
              <TrendingUp className="w-8 h-8 text-electric-400" />
            </div>
            <div className="mt-2 text-sm text-green-400">↑ 15.6% from last month</div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="bg-gray-800 rounded-lg mb-8 border border-gray-700">
          <nav className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-electric-400 border-b-2 border-electric-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* User Growth Chart */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">User Growth</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Line type="monotone" dataKey="users" stroke="#00D4FF" strokeWidth={3} dot={{ fill: '#00D4FF', strokeWidth: 2, r: 6 }} />
                    <Line type="monotone" dataKey="active" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Recent Activity */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3 p-3 bg-gray-750 rounded-lg"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === 'solve' ? 'bg-green-400/20' :
                        activity.type === 'submit' ? 'bg-blue-400/20' :
                        activity.type === 'register' ? 'bg-purple-400/20' : 'bg-yellow-400/20'
                      }`}>
                        <div className={`w-3 h-3 rounded-full ${
                          activity.type === 'solve' ? 'bg-green-400' :
                          activity.type === 'submit' ? 'bg-blue-400' :
                          activity.type === 'register' ? 'bg-purple-400' : 'bg-yellow-400'
                        }`}></div>
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">{activity.user}</div>
                        <div className="text-gray-400 text-sm">{activity.action}</div>
                      </div>
                      <div className="text-gray-500 text-xs">{activity.time}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Language Distribution */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">Submission Languages</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={submissionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="language" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Problem Difficulty */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">Problem Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPie>
                    <RechartsPie
                      data={problemsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="count"
                    >
                      {problemsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </RechartsPie>
                    <Tooltip />
                  </RechartsPie>
                </ResponsiveContainer>
                <div className="flex justify-center space-x-6 mt-4">
                  {problemsData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm text-gray-300">{item.difficulty}: {item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              {/* User Management Header */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white">User Management</h2>
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Download className="w-4 h-4 inline mr-2" />
                      Export
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-electric-400 focus:outline-none"
                    />
                  </div>
                  <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
                    <Filter className="w-4 h-4 inline mr-2" />
                    Filter
                  </button>
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-900">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Joined</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Solved</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {recentUsers.map((user, index) => (
                        <motion.tr
                          key={user.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="hover:bg-gray-750 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-r from-electric-400 to-neon-500 rounded-full flex items-center justify-center text-white font-bold">
                                {user.username.charAt(0).toUpperCase()}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-white">{user.username}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.joined}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.solved}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-blue-400 hover:text-blue-300">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-yellow-400 hover:text-yellow-300">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="text-red-400 hover:text-red-300">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'problems' && (
            <div className="space-y-6">
              {/* Problem Management Header */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white">Problem Management</h2>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setShowCreateModal(true)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Plus className="w-4 h-4 inline mr-2" />
                      Add Problem
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Upload className="w-4 h-4 inline mr-2" />
                      Import
                    </button>
                  </div>
                </div>
              </div>

              {/* Problems Table */}
              <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-900">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Problem</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Difficulty</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Created</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Submissions</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {recentProblems.map((problem, index) => (
                        <motion.tr
                          key={problem.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="hover:bg-gray-750 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-white">{problem.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getDifficultyColor(problem.difficulty)}`}>
                              {problem.difficulty}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{problem.category}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{problem.created}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{problem.submissions}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-blue-400 hover:text-blue-300">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-yellow-400 hover:text-yellow-300">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="text-red-400 hover:text-red-300">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-8">
              {/* Filters and Export */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <div>
                    <label className="text-gray-300 mr-2">Period:</label>
                    <select
                      value={analyticsPeriod}
                      onChange={e => setAnalyticsPeriod(e.target.value)}
                      className="bg-gray-700 text-white rounded px-3 py-2 border border-gray-600 focus:border-electric-400 focus:outline-none"
                    >
                      <option value="day">Last 24 Hours</option>
                      <option value="week">Last 7 Days</option>
                      <option value="month">Last 30 Days</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-300 mr-2">Chart Type:</label>
                    <select
                      value={chartType}
                      onChange={e => setChartType(e.target.value)}
                      className="bg-gray-700 text-white rounded px-3 py-2 border border-gray-600 focus:border-electric-400 focus:outline-none"
                    >
                      <option value="bar">Bar Chart</option>
                      <option value="line">Line Chart</option>
                      <option value="area">Area Chart</option>
                    </select>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={exportToCSV}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200"
                  >
                    <Download className="w-4 h-4 mr-2" /> Export CSV
                  </button>
                  <button
                    onClick={exportToExcel}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
                  >
                    <Download className="w-4 h-4 mr-2" /> Export Excel
                  </button>
                </div>
              </div>

              {analyticsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-electric-400"></div>
                  <span className="ml-3 text-gray-400">Loading analytics...</span>
                </div>
              ) : analyticsError ? (
                <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
                  <div className="text-red-400 font-semibold">Error loading analytics</div>
                  <div className="text-red-300 text-sm mt-1">{analyticsError}</div>
                </div>
              ) : (
                <>
                  {/* Key Metrics Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-white">{analytics.totalUsers.toLocaleString()}</div>
                          <div className="text-gray-400">Total Users</div>
                        </div>
                        <Users className="w-8 h-8 text-blue-400" />
                      </div>
                      <div className="mt-2 text-sm text-green-400">↑ 12.3% from last month</div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-white">{analytics.activeUsers.toLocaleString()}</div>
                          <div className="text-gray-400">Active Users ({analyticsPeriod})</div>
                        </div>
                        <Activity className="w-8 h-8 text-green-400" />
                      </div>
                      <div className="mt-2 text-sm text-green-400">↑ 8.7% from last period</div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-white">{analytics.totalSessions.toLocaleString()}</div>
                          <div className="text-gray-400">Total Sessions</div>
                        </div>
                        <TrendingUp className="w-8 h-8 text-purple-400" />
                      </div>
                      <div className="mt-2 text-sm text-green-400">↑ 15.6% from last period</div>
                    </div>
                  </div>

                  {/* Charts Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* User Growth Chart */}
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                      <h3 className="text-xl font-semibold text-white mb-4">User Growth Trend</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        {chartType === 'line' ? (
                          <LineChart data={userGrowthData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="month" stroke="#9CA3AF" />
                            <YAxis stroke="#9CA3AF" />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: '#1F2937', 
                                border: '1px solid #374151',
                                borderRadius: '8px'
                              }}
                            />
                            <Line type="monotone" dataKey="users" stroke="#00D4FF" strokeWidth={3} dot={{ fill: '#00D4FF', strokeWidth: 2, r: 6 }} />
                            <Line type="monotone" dataKey="active" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }} />
                          </LineChart>
                        ) : chartType === 'area' ? (
                          <AreaChart data={userGrowthData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="month" stroke="#9CA3AF" />
                            <YAxis stroke="#9CA3AF" />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: '#1F2937', 
                                border: '1px solid #374151',
                                borderRadius: '8px'
                              }}
                            />
                            <Area type="monotone" dataKey="users" stackId="1" stroke="#00D4FF" fill="#00D4FF" fillOpacity={0.6} />
                            <Area type="monotone" dataKey="active" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                          </AreaChart>
                        ) : (
                          <BarChart data={userGrowthData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="month" stroke="#9CA3AF" />
                            <YAxis stroke="#9CA3AF" />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: '#1F2937', 
                                border: '1px solid #374151',
                                borderRadius: '8px'
                              }}
                            />
                            <Bar dataKey="users" fill="#00D4FF" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="active" fill="#10B981" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        )}
                      </ResponsiveContainer>
                    </div>

                    {/* Activity Distribution */}
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                      <h3 className="text-xl font-semibold text-white mb-4">Activity Distribution</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={[
                          { name: 'Modules', value: analytics.modulesCompleted, color: '#8B5CF6' },
                          { name: 'Quizzes', value: analytics.quizAttempts, color: '#F59E0B' },
                          { name: 'Feedback', value: analytics.feedbackCount, color: '#EC4899' },
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="name" stroke="#9CA3AF" />
                          <YAxis stroke="#9CA3AF" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1F2937', 
                              border: '1px solid #374151',
                              borderRadius: '8px'
                            }}
                          />
                          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                            {[
                              { name: 'Modules', value: analytics.modulesCompleted, color: '#8B5CF6' },
                              { name: 'Quizzes', value: analytics.quizAttempts, color: '#F59E0B' },
                              { name: 'Feedback', value: analytics.feedbackCount, color: '#EC4899' },
                            ].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Detailed Metrics Table */}
                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-white mb-4">Detailed Analytics</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="text-left py-2 px-4 text-gray-400">Metric</th>
                            <th className="text-left py-2 px-4 text-gray-400">Value</th>
                            <th className="text-left py-2 px-4 text-gray-400">Change</th>
                            <th className="text-left py-2 px-4 text-gray-400">Trend</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-700">
                            <td className="py-3 px-4 text-white">Total Users</td>
                            <td className="py-3 px-4 text-electric-400 font-semibold">{analytics.totalUsers.toLocaleString()}</td>
                            <td className="py-3 px-4 text-green-400">+12.3%</td>
                            <td className="py-3 px-4">
                              <TrendingUp className="w-4 h-4 text-green-400" />
                            </td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="py-3 px-4 text-white">Active Users</td>
                            <td className="py-3 px-4 text-green-400 font-semibold">{analytics.activeUsers.toLocaleString()}</td>
                            <td className="py-3 px-4 text-green-400">+8.7%</td>
                            <td className="py-3 px-4">
                              <TrendingUp className="w-4 h-4 text-green-400" />
                            </td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="py-3 px-4 text-white">Modules Completed</td>
                            <td className="py-3 px-4 text-purple-400 font-semibold">{analytics.modulesCompleted.toLocaleString()}</td>
                            <td className="py-3 px-4 text-green-400">+15.2%</td>
                            <td className="py-3 px-4">
                              <TrendingUp className="w-4 h-4 text-green-400" />
                            </td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="py-3 px-4 text-white">Quiz Attempts</td>
                            <td className="py-3 px-4 text-yellow-400 font-semibold">{analytics.quizAttempts.toLocaleString()}</td>
                            <td className="py-3 px-4 text-red-400">-2.1%</td>
                            <td className="py-3 px-4">
                              <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />
                            </td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4 text-white">Feedback Count</td>
                            <td className="py-3 px-4 text-pink-400 font-semibold">{analytics.feedbackCount.toLocaleString()}</td>
                            <td className="py-3 px-4 text-green-400">+5.8%</td>
                            <td className="py-3 px-4">
                              <TrendingUp className="w-4 h-4 text-green-400" />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h2 className="text-xl font-semibold text-white mb-6">Platform Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Platform Name
                    </label>
                    <input
                      type="text"
                      value="DevElevate"
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-electric-400 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Maximum Execution Time (seconds)
                    </label>
                    <input
                      type="number"
                      value="30"
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-electric-400 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked
                        className="w-4 h-4 text-electric-400 bg-gray-700 border-gray-600 rounded focus:ring-electric-400"
                      />
                      <span className="ml-2 text-gray-300">Allow user registration</span>
                    </label>
                  </div>
                  
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked
                        className="w-4 h-4 text-electric-400 bg-gray-700 border-gray-600 rounded focus:ring-electric-400"
                      />
                      <span className="ml-2 text-gray-300">Enable contest mode</span>
                    </label>
                  </div>
                </div>
                
                <div className="mt-8">
                  <button className="px-6 py-3 bg-gradient-to-r from-electric-400 to-neon-500 text-white rounded-lg font-medium hover:from-electric-500 hover:to-neon-600 transition-all duration-200">
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Create Problem Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-700"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Create New Problem</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Problem Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter problem title..."
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-electric-400 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Enter problem description..."
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-electric-400 focus:outline-none resize-none"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Difficulty
                    </label>
                    <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-electric-400 focus:outline-none">
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Category
                    </label>
                    <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-electric-400 focus:outline-none">
                      <option value="Array">Array</option>
                      <option value="String">String</option>
                      <option value="Dynamic Programming">Dynamic Programming</option>
                      <option value="Graph">Graph</option>
                      <option value="Tree">Tree</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button className="px-6 py-2 bg-gradient-to-r from-electric-400 to-neon-500 text-white rounded-lg hover:from-electric-500 hover:to-neon-600 transition-all duration-200">
                  Create Problem
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;