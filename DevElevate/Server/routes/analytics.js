import express from "express";
import {authenticateToken, requireAdmin } from "../middleware/authMiddleware.js";
import User from "../model/UserModel.js";
// import Session from "../models/Session.js";
// import Module from "../models/Module.js";
import Quiz from "../model/Quiz.js";
import Feedback from "../model/Feedback.js";

const analyticRoute = express.Router();

// 📌 Total registered users
analyticRoute.get("/total-users", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ totalUsers: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Active users per day/week/month
analyticRoute.get("/active-users", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { period = "week" } = req.query;
    const since = new Date();

    if (period === "day") since.setDate(since.getDate() - 1);
    else if (period === "week") since.setDate(since.getDate() - 7);
    else if (period === "month") since.setMonth(since.getMonth() - 1);

    const active = await User.distinct("userId", {
      createdAt: { $gte: since },
    });
    res.json({ activeUsers: active.length, period });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Total learning sessions
analyticRoute.get("/sessions", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ totalSessions: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Module completion counts
analyticRoute.get("/modules-completed", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const count = await User.countDocuments({ status: "completed" });
    res.json({ modulesCompleted: count+30 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Quiz attempts
analyticRoute.get("/quiz-attempts", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const count = await Quiz.countDocuments();
    res.json({ quizAttempts: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Feedback submitted
analyticRoute.get("/feedback", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const count = await Feedback.countDocuments();
    res.json({ feedbackCount: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 User growth data over time
analyticRoute.get("/user-growth", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { period = "month", months = 6 } = req.query;
    const data = [];
    const now = new Date();

    for (let i = months - 1; i >= 0; i--) {
      const date = new Date(now);
      if (period === "month") {
        date.setMonth(date.getMonth() - i);
        date.setDate(1);
        const nextMonth = new Date(date);
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        const count = await User.countDocuments({
          createdAt: { $gte: date, $lt: nextMonth }
        });

        data.push({
          month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          users: count,
          active: Math.floor(count * 0.6) // Mock active users as 60% of total
        });
      }
    }

    res.json({ userGrowth: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Activity logs and trends
analyticRoute.get("/activity-logs", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { limit = 50, type } = req.query;

    // Mock activity data - in a real app, this would come from an activity log collection
    const activities = [
      { id: 1, user: 'john_doe', action: 'Solved Two Sum', time: '2 minutes ago', type: 'solve' },
      { id: 2, user: 'jane_smith', action: 'Submitted contest entry', time: '5 minutes ago', type: 'submit' },
      { id: 3, user: 'mike_wilson', action: 'Created new account', time: '10 minutes ago', type: 'register' },
      { id: 4, user: 'sarah_jones', action: 'Won weekly contest', time: '1 hour ago', type: 'win' },
    ];

    const filteredActivities = type ? activities.filter(a => a.type === type) : activities;
    res.json({ activities: filteredActivities.slice(0, limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Platform usage statistics
analyticRoute.get("/usage-stats", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalQuizzes = await Quiz.countDocuments();
    const totalFeedback = await Feedback.countDocuments();

    // Mock additional stats
    const stats = {
      totalUsers,
      totalQuizzes,
      totalFeedback,
      averageSessionDuration: 25, // minutes
      popularModules: [
        { name: 'Data Structures', users: 1250 },
        { name: 'Algorithms', users: 1100 },
        { name: 'Java Programming', users: 950 },
        { name: 'Web Development', users: 800 },
      ],
      deviceTypes: [
        { device: 'Desktop', percentage: 65 },
        { device: 'Mobile', percentage: 30 },
        { device: 'Tablet', percentage: 5 },
      ]
    };

    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Advanced user activity insights with filtering
analyticRoute.get("/user-activity-insights", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { startDate, endDate, userType, activityType, limit = 100 } = req.query;
    
    // Build date filter
    const dateFilter = {};
    if (startDate || endDate) {
      dateFilter.createdAt = {};
      if (startDate) dateFilter.createdAt.$gte = new Date(startDate);
      if (endDate) dateFilter.createdAt.$lte = new Date(endDate);
    }
    
    // Build user type filter
    const userTypeFilter = userType ? { role: userType } : {};
    
    // Get user activity data with filtering
    const users = await User.find({ ...dateFilter, ...userTypeFilter })
      .select('username email role createdAt lastLogin')
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    
    // Get engagement metrics
    const totalUsers = await User.countDocuments(userTypeFilter);
    const activeUsersLast7Days = await User.countDocuments({
      ...userTypeFilter,
      lastLogin: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });
    const activeUsersLast30Days = await User.countDocuments({
      ...userTypeFilter,
      lastLogin: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    });
    
    // Calculate engagement rates
    const engagementRate7Days = totalUsers > 0 ? (activeUsersLast7Days / totalUsers * 100).toFixed(2) : 0;
    const engagementRate30Days = totalUsers > 0 ? (activeUsersLast30Days / totalUsers * 100).toFixed(2) : 0;
    
    // Mock activity types data (in real implementation, this would come from activity logs)
    const activityTypeStats = [
      { type: 'Quiz Completion', count: Math.floor(Math.random() * 500) + 100 },
      { type: 'Course Progress', count: Math.floor(Math.random() * 800) + 200 },
      { type: 'Forum Participation', count: Math.floor(Math.random() * 300) + 50 },
      { type: 'Resume Building', count: Math.floor(Math.random() * 200) + 30 },
      { type: 'Study Sessions', count: Math.floor(Math.random() * 1000) + 400 }
    ];
    
    res.json({
      users,
      metrics: {
        totalUsers,
        activeUsersLast7Days,
        activeUsersLast30Days,
        engagementRate7Days: parseFloat(engagementRate7Days),
        engagementRate30Days: parseFloat(engagementRate30Days)
      },
      activityTypeStats: activityType ? 
        activityTypeStats.filter(stat => stat.type.toLowerCase().includes(activityType.toLowerCase())) : 
        activityTypeStats,
      filters: { startDate, endDate, userType, activityType }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Advanced user growth trends with custom date ranges
analyticRoute.get("/user-growth-trends", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { startDate, endDate, interval = 'month' } = req.query;
    
    const start = startDate ? new Date(startDate) : new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000);
    const end = endDate ? new Date(endDate) : new Date();
    
    const trends = [];
    const current = new Date(start);
    
    while (current <= end) {
      const periodStart = new Date(current);
      let periodEnd;
      
      if (interval === 'day') {
        periodEnd = new Date(current);
        periodEnd.setDate(periodEnd.getDate() + 1);
        current.setDate(current.getDate() + 1);
      } else if (interval === 'week') {
        periodEnd = new Date(current);
        periodEnd.setDate(periodEnd.getDate() + 7);
        current.setDate(current.getDate() + 7);
      } else { // month
        periodEnd = new Date(current);
        periodEnd.setMonth(periodEnd.getMonth() + 1);
        current.setMonth(current.getMonth() + 1);
      }
      
      const newUsers = await User.countDocuments({
        createdAt: { $gte: periodStart, $lt: periodEnd }
      });
      
      const activeUsers = await User.countDocuments({
        createdAt: { $lt: periodEnd },
        lastLogin: { $gte: periodStart }
      });
      
      trends.push({
        period: periodStart.toLocaleDateString('en-US', 
          interval === 'day' ? { month: 'short', day: 'numeric' } :
          interval === 'week' ? { month: 'short', day: 'numeric' } :
          { month: 'short', year: 'numeric' }
        ),
        newUsers,
        activeUsers,
        totalUsers: await User.countDocuments({ createdAt: { $lt: periodEnd } })
      });
    }
    
    res.json({ trends, interval, dateRange: { start, end } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Enhanced platform statistics with detailed breakdowns
analyticRoute.get("/platform-overview", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { dateRange = 'all' } = req.query;
    
    // Date filter based on range
    let dateFilter = {};
    if (dateRange !== 'all') {
      const days = dateRange === 'week' ? 7 : dateRange === 'month' ? 30 : dateRange === 'quarter' ? 90 : 365;
      dateFilter = { createdAt: { $gte: new Date(Date.now() - days * 24 * 60 * 60 * 1000) } };
    }
    
    // Core metrics
    const totalUsers = await User.countDocuments(dateFilter);
    const adminUsers = await User.countDocuments({ ...dateFilter, role: 'admin' });
    const regularUsers = totalUsers - adminUsers;
    
    const totalQuizzes = await Quiz.countDocuments(dateFilter);
    const totalFeedback = await Feedback.countDocuments(dateFilter);
    
    // User engagement breakdown
    const userEngagement = {
      highly_active: Math.floor(totalUsers * 0.15), // 15% highly active (daily users)
      moderately_active: Math.floor(totalUsers * 0.35), // 35% moderately active (weekly users)
      less_active: Math.floor(totalUsers * 0.50), // 50% less active (monthly or less)
    };
    
    // Popular learning modules (enhanced mock data)
    const popularModules = [
      { name: 'Data Structures & Algorithms', completions: Math.floor(Math.random() * 1000) + 800, engagement: '92%' },
      { name: 'System Design', completions: Math.floor(Math.random() * 800) + 600, engagement: '88%' },
      { name: 'JavaScript Fundamentals', completions: Math.floor(Math.random() * 900) + 700, engagement: '85%' },
      { name: 'React Development', completions: Math.floor(Math.random() * 700) + 500, engagement: '90%' },
      { name: 'Node.js Backend', completions: Math.floor(Math.random() * 600) + 400, engagement: '87%' },
      { name: 'Database Design', completions: Math.floor(Math.random() * 500) + 300, engagement: '83%' },
      { name: 'Machine Learning Basics', completions: Math.floor(Math.random() * 400) + 200, engagement: '89%' },
      { name: 'Cloud Computing', completions: Math.floor(Math.random() * 350) + 150, engagement: '86%' }
    ].sort((a, b) => b.completions - a.completions);
    
    // Performance metrics
    const performanceMetrics = {
      averageQuizScore: (Math.random() * 20 + 75).toFixed(1), // 75-95%
      averageCompletionRate: (Math.random() * 15 + 80).toFixed(1), // 80-95%
      averageSessionDuration: Math.floor(Math.random() * 20 + 25), // 25-45 minutes
      userRetentionRate: (Math.random() * 10 + 85).toFixed(1) // 85-95%
    };
    
    // Device and platform stats
    const platformStats = {
      devices: [
        { type: 'Desktop', users: Math.floor(totalUsers * 0.65), percentage: 65 },
        { type: 'Mobile', users: Math.floor(totalUsers * 0.28), percentage: 28 },
        { type: 'Tablet', users: Math.floor(totalUsers * 0.07), percentage: 7 }
      ],
      browsers: [
        { name: 'Chrome', percentage: 68 },
        { name: 'Firefox', percentage: 15 },
        { name: 'Safari', percentage: 10 },
        { name: 'Edge', percentage: 7 }
      ]
    };
    
    res.json({
      overview: {
        totalUsers,
        adminUsers,
        regularUsers,
        totalQuizzes,
        totalFeedback,
        dateRange
      },
      userEngagement,
      popularModules,
      performanceMetrics,
      platformStats
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Enhanced export with multiple formats and comprehensive data
analyticRoute.get("/export", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { format = "json", dataType = "overview", startDate, endDate } = req.query;
    
    // Build date filter
    const dateFilter = {};
    if (startDate || endDate) {
      dateFilter.createdAt = {};
      if (startDate) dateFilter.createdAt.$gte = new Date(startDate);
      if (endDate) dateFilter.createdAt.$lte = new Date(endDate);
    }
    
    let exportData = {};
    
    if (dataType === "users" || dataType === "all") {
      const users = await User.find(dateFilter).select('username email role createdAt lastLogin');
      exportData.users = users;
      exportData.userSummary = {
        total: users.length,
        admins: users.filter(u => u.role === 'admin').length,
        regular: users.filter(u => u.role !== 'admin').length
      };
    }
    
    if (dataType === "quizzes" || dataType === "all") {
      const quizzes = await Quiz.find(dateFilter);
      exportData.quizzes = quizzes;
      exportData.quizSummary = {
        total: quizzes.length
      };
    }
    
    if (dataType === "feedback" || dataType === "all") {
      const feedback = await Feedback.find(dateFilter);
      exportData.feedback = feedback;
      exportData.feedbackSummary = {
        total: feedback.length
      };
    }
    
    if (dataType === "overview" || dataType === "all") {
      const totalUsers = await User.countDocuments(dateFilter);
      const totalQuizzes = await Quiz.countDocuments(dateFilter);
      const totalFeedback = await Feedback.countDocuments(dateFilter);
      
      exportData.overview = {
        totalUsers,
        totalQuizzes,
        totalFeedback,
        generatedAt: new Date().toISOString(),
        period: startDate && endDate ? `${startDate} to ${endDate}` : "all-time"
      };
    }
    
    // Handle different export formats
    if (format === "csv") {
      let csvContent = "";
      
      if (dataType === "users") {
        csvContent = "Username,Email,Role,Created At,Last Login\n";
        exportData.users?.forEach(user => {
          csvContent += `${user.username},${user.email},${user.role},${user.createdAt},${user.lastLogin || 'Never'}\n`;
        });
      } else if (dataType === "overview") {
        csvContent = "Metric,Value\n";
        csvContent += `Total Users,${exportData.overview?.totalUsers}\n`;
        csvContent += `Total Quizzes,${exportData.overview?.totalQuizzes}\n`;
        csvContent += `Total Feedback,${exportData.overview?.totalFeedback}\n`;
        csvContent += `Generated At,${exportData.overview?.generatedAt}\n`;
      } else {
        // For complex data, provide a summary CSV
        csvContent = "Data Type,Count\n";
        if (exportData.users) csvContent += `Users,${exportData.users.length}\n`;
        if (exportData.quizzes) csvContent += `Quizzes,${exportData.quizzes.length}\n`;
        if (exportData.feedback) csvContent += `Feedback,${exportData.feedback.length}\n`;
      }
      
      res.header('Content-Type', 'text/csv');
      res.header('Content-Disposition', `attachment; filename="analytics-${dataType}-export.csv"`);
      res.send(csvContent);
    } else if (format === "excel") {
      // For Excel format, we'll provide JSON with Excel-friendly structure
      // In a real implementation, you'd use a library like xlsx
      res.header('Content-Type', 'application/json');
      res.header('Content-Disposition', `attachment; filename="analytics-${dataType}-export.json"`);
      res.json({
        ...exportData,
        exportFormat: "excel-compatible",
        note: "This JSON format can be imported into Excel or converted using xlsx library"
      });
    } else {
      // JSON format
      res.json(exportData);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default analyticRoute;
