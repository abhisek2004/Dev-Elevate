import React, { useState, useEffect, useCallback } from "react";
import { useGlobalState } from "../../contexts/GlobalContext";
import {
  fetchPlatformOverview,
  fetchUserActivityInsights,
  fetchUserGrowthTrends,
  downloadAnalyticsData
} from "../../services/analyticsService";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Calendar,
  Download,
  Filter,
  Users,
  Activity,
  TrendingUp,
  TrendingDown,
  Eye,
  BarChart3,
  PieChart as PieChartIcon,
  FileText,
  RefreshCw,
  Settings
} from "lucide-react";
import { format } from "date-fns";

// Types
interface FilterParams {
  startDate: string;
  endDate: string;
  userType: string;
  activityType: string;
  dateRange: 'all' | 'week' | 'month' | 'quarter' | 'year';
  interval: 'day' | 'week' | 'month';
}

interface PlatformData {
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
}

const AdvancedAnalytics: React.FC = () => {
  const { state: globalState } = useGlobalState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'trends' | 'insights' | 'exports'>('overview');
  
  // Data states
  const [platformData, setPlatformData] = useState<PlatformData | null>(null);
  const [growthTrends, setGrowthTrends] = useState<any>(null);
  const [userInsights, setUserInsights] = useState<any>(null);
  
  // Filter states
  const [filters, setFilters] = useState<FilterParams>({
    startDate: format(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
    endDate: format(new Date(), 'yyyy-MM-dd'),
    userType: '',
    activityType: '',
    dateRange: 'month',
    interval: 'week'
  });
  
  const [showFilters, setShowFilters] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  // Colors for charts
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16'];
  
  // Fetch data function
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch platform overview
      const platformRes = await fetchPlatformOverview(filters.dateRange);
      setPlatformData(platformRes);
      
      // Fetch growth trends
      const trendsRes = await fetchUserGrowthTrends({
        startDate: filters.startDate,
        endDate: filters.endDate,
        interval: filters.interval
      });
      setGrowthTrends(trendsRes);
      
      // Fetch user insights
      const insightsRes = await fetchUserActivityInsights({
        startDate: filters.startDate,
        endDate: filters.endDate,
        userType: filters.userType || undefined,
        activityType: filters.activityType || undefined,
        limit: 50
      });
      setUserInsights(insightsRes);
      
    } catch (err: any) {
      setError(err.message || 'Failed to fetch analytics data');
      console.error('Analytics fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Initial data load
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle filter changes
  const handleFilterChange = (key: keyof FilterParams, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Handle export
  const handleExport = async (format: 'csv' | 'json' | 'excel', dataType: string) => {
    setExportLoading(true);
    try {
      await downloadAnalyticsData(format, dataType, filters.startDate, filters.endDate);
    } catch (err: any) {
      setError(`Export failed: ${err.message}`);
    } finally {
      setExportLoading(false);
    }
  };

  // Chart data transformations
  const getEngagementData = () => {
    if (!platformData) return [];
    return [
      { name: 'Highly Active', value: platformData.userEngagement.highly_active, color: '#10b981' },
      { name: 'Moderately Active', value: platformData.userEngagement.moderately_active, color: '#f59e0b' },
      { name: 'Less Active', value: platformData.userEngagement.less_active, color: '#ef4444' },
    ];
  };

  const getDeviceData = () => {
    if (!platformData) return [];
    return platformData.platformStats.devices.map((device, index) => ({
      ...device,
      color: COLORS[index % COLORS.length]
    }));
  };

  const getActivityTypeData = () => {
    if (!userInsights) return [];
    return userInsights.activityTypeStats.map((stat: any, index: number) => ({
      ...stat,
      color: COLORS[index % COLORS.length]
    }));
  };

  if (loading) {
    return (
      <div className={`min-h-screen p-6 ${globalState.darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-6 h-6 animate-spin text-blue-500" />
            <span className={`text-lg ${globalState.darkMode ? 'text-white' : 'text-gray-700'}`}>
              Loading advanced analytics...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen p-6 ${globalState.darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-2">⚠️ Error Loading Analytics</div>
            <p className={`${globalState.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{error}</p>
            <button
              onClick={fetchData}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 ${globalState.darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h1 className={`text-3xl font-bold ${globalState.darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
              Advanced Analytics & Reporting
            </h1>
            <p className={`text-lg ${globalState.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Comprehensive insights into platform usage, user engagement, and performance trends
            </p>
          </div>
          
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3 mt-4 lg:mt-0">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                globalState.darkMode
                  ? 'bg-gray-800 border-gray-600 text-white hover:bg-gray-700'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              aria-label="Toggle filters"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
            
            <button
              onClick={fetchData}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
              aria-label="Refresh data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className={`p-4 rounded-lg border ${
            globalState.darkMode 
              ? 'bg-gray-800 border-gray-600' 
              : 'bg-white border-gray-200'
          } mb-6`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  globalState.darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Start Date
                </label>
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => handleFilterChange('startDate', e.target.value)}
                  className={`w-full px-3 py-2 rounded-md border ${
                    globalState.darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  globalState.darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  End Date
                </label>
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => handleFilterChange('endDate', e.target.value)}
                  className={`w-full px-3 py-2 rounded-md border ${
                    globalState.darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  globalState.darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  User Type
                </label>
                <select
                  value={filters.userType}
                  onChange={(e) => handleFilterChange('userType', e.target.value)}
                  className={`w-full px-3 py-2 rounded-md border ${
                    globalState.darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">All Users</option>
                  <option value="admin">Admins</option>
                  <option value="user">Regular Users</option>
                </select>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  globalState.darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Time Interval
                </label>
                <select
                  value={filters.interval}
                  onChange={(e) => handleFilterChange('interval', e.target.value)}
                  className={`w-full px-3 py-2 rounded-md border ${
                    globalState.darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="day">Daily</option>
                  <option value="week">Weekly</option>
                  <option value="month">Monthly</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-600">
          {[
            { key: 'overview', label: 'Platform Overview', icon: BarChart3 },
            { key: 'trends', label: 'Growth Trends', icon: TrendingUp },
            { key: 'insights', label: 'User Insights', icon: Users },
            { key: 'exports', label: 'Data Export', icon: Download },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center space-x-2 px-4 py-3 font-medium transition-colors border-b-2 ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-500'
                    : `border-transparent ${
                        globalState.darkMode 
                          ? 'text-gray-400 hover:text-gray-200' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Platform Overview Tab */}
        {activeTab === 'overview' && platformData && (
          <div className="space-y-6">
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  label: 'Total Users', 
                  value: platformData.overview.totalUsers.toLocaleString(), 
                  icon: Users, 
                  color: 'blue',
                  change: '+12.5%',
                  trend: 'up'
                },
                { 
                  label: 'Active Quizzes', 
                  value: platformData.overview.totalQuizzes.toLocaleString(), 
                  icon: FileText, 
                  color: 'green',
                  change: '+8.3%',
                  trend: 'up'
                },
                { 
                  label: 'Avg. Quiz Score', 
                  value: `${platformData.performanceMetrics.averageQuizScore}%`, 
                  icon: TrendingUp, 
                  color: 'purple',
                  change: '+2.1%',
                  trend: 'up'
                },
                { 
                  label: 'User Retention', 
                  value: `${platformData.performanceMetrics.userRetentionRate}%`, 
                  icon: Activity, 
                  color: 'orange',
                  change: '+5.7%',
                  trend: 'up'
                },
              ].map((metric, index) => {
                const Icon = metric.icon;
                const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
                return (
                  <div
                    key={index}
                    className={`p-6 rounded-xl border ${
                      globalState.darkMode
                        ? 'bg-gray-800 border-gray-700'
                        : 'bg-white border-gray-200'
                    } hover:shadow-lg transition-shadow`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className={`text-sm font-medium ${
                          globalState.darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {metric.label}
                        </p>
                        <p className={`text-2xl font-bold mt-1 ${
                          globalState.darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {metric.value}
                        </p>
                        <div className="flex items-center mt-2 space-x-1">
                          <TrendIcon className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-green-500">{metric.change}</span>
                        </div>
                      </div>
                      <div className={`p-3 rounded-lg bg-${metric.color}-100`}>
                        <Icon className={`w-6 h-6 text-${metric.color}-600`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Engagement Chart */}
              <div className={`p-6 rounded-xl border ${
                globalState.darkMode
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${
                  globalState.darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  User Engagement Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={getEngagementData()}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {getEngagementData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: globalState.darkMode ? '#374151' : '#ffffff',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Popular Modules Chart */}
              <div className={`p-6 rounded-xl border ${
                globalState.darkMode
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${
                  globalState.darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Popular Learning Modules
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={platformData.popularModules.slice(0, 6)}>
                    <CartesianGrid strokeDasharray="3 3" stroke={globalState.darkMode ? '#374151' : '#e5e7eb'} />
                    <XAxis 
                      dataKey="name" 
                      stroke={globalState.darkMode ? '#d1d5db' : '#6b7280'}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis stroke={globalState.darkMode ? '#d1d5db' : '#6b7280'} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: globalState.darkMode ? '#374151' : '#ffffff',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="completions" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Device Usage Chart */}
            <div className={`p-6 rounded-xl border ${
              globalState.darkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                globalState.darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Platform Usage by Device
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={getDeviceData()}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="users"
                      label={({ type, percentage }) => `${type} ${percentage}%`}
                    >
                      {getDeviceData().map((entry, index) => (
                        <Cell key={`device-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: globalState.darkMode ? '#374151' : '#ffffff',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>

                {/* Device Stats Table */}
                <div className="space-y-3">
                  {platformData.platformStats.devices.map((device, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span className={globalState.darkMode ? 'text-white' : 'text-gray-900'}>
                          {device.type}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {device.users.toLocaleString()}
                        </div>
                        <div className={`text-sm ${globalState.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {device.percentage}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Growth Trends Tab */}
        {activeTab === 'trends' && growthTrends && (
          <div className="space-y-6">
            <div className={`p-6 rounded-xl border ${
              globalState.darkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                globalState.darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                User Growth Trends ({filters.interval.charAt(0).toUpperCase() + filters.interval.slice(1)}ly)
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={growthTrends.trends}>
                  <CartesianGrid strokeDasharray="3 3" stroke={globalState.darkMode ? '#374151' : '#e5e7eb'} />
                  <XAxis 
                    dataKey="period" 
                    stroke={globalState.darkMode ? '#d1d5db' : '#6b7280'}
                  />
                  <YAxis stroke={globalState.darkMode ? '#d1d5db' : '#6b7280'} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: globalState.darkMode ? '#374151' : '#ffffff',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="totalUsers" 
                    stackId="1" 
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.6}
                    name="Total Users"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="newUsers" 
                    stackId="2" 
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.6}
                    name="New Users"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="activeUsers" 
                    stackId="3" 
                    stroke="#f59e0b" 
                    fill="#f59e0b" 
                    fillOpacity={0.6}
                    name="Active Users"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* User Insights Tab */}
        {activeTab === 'insights' && userInsights && (
          <div className="space-y-6">
            {/* Engagement Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Users', value: userInsights.metrics.totalUsers.toLocaleString(), color: 'blue' },
                { label: 'Active (7 days)', value: userInsights.metrics.activeUsersLast7Days.toLocaleString(), color: 'green' },
                { label: 'Active (30 days)', value: userInsights.metrics.activeUsersLast30Days.toLocaleString(), color: 'purple' },
                { label: 'Engagement Rate', value: `${userInsights.metrics.engagementRate7Days}%`, color: 'orange' },
              ].map((metric, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl border ${
                    globalState.darkMode
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <p className={`text-sm font-medium ${
                    globalState.darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {metric.label}
                  </p>
                  <p className={`text-2xl font-bold mt-1 ${
                    globalState.darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Activity Types Chart */}
            <div className={`p-6 rounded-xl border ${
              globalState.darkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                globalState.darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Activity Types Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={getActivityTypeData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke={globalState.darkMode ? '#374151' : '#e5e7eb'} />
                  <XAxis 
                    dataKey="type" 
                    stroke={globalState.darkMode ? '#d1d5db' : '#6b7280'}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke={globalState.darkMode ? '#d1d5db' : '#6b7280'} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: globalState.darkMode ? '#374151' : '#ffffff',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Recent User Activity Table */}
            <div className={`p-6 rounded-xl border ${
              globalState.darkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                globalState.darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Recent User Activity
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`border-b ${globalState.darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                      <th className={`text-left py-3 px-4 font-medium ${
                        globalState.darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        Username
                      </th>
                      <th className={`text-left py-3 px-4 font-medium ${
                        globalState.darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        Role
                      </th>
                      <th className={`text-left py-3 px-4 font-medium ${
                        globalState.darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        Joined
                      </th>
                      <th className={`text-left py-3 px-4 font-medium ${
                        globalState.darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        Last Login
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {userInsights.users.slice(0, 10).map((user: any, index: number) => (
                      <tr 
                        key={index}
                        className={`border-b ${
                          globalState.darkMode ? 'border-gray-700' : 'border-gray-100'
                        } hover:bg-gray-50 dark:hover:bg-gray-700`}
                      >
                        <td className={`py-3 px-4 ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {user.username}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.role === 'admin' 
                              ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className={`py-3 px-4 ${globalState.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {format(new Date(user.createdAt), 'MMM dd, yyyy')}
                        </td>
                        <td className={`py-3 px-4 ${globalState.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {user.lastLogin ? format(new Date(user.lastLogin), 'MMM dd, yyyy') : 'Never'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Data Export Tab */}
        {activeTab === 'exports' && (
          <div className="space-y-6">
            <div className={`p-6 rounded-xl border ${
              globalState.darkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                globalState.darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Export Analytics Data
              </h3>
              
              <p className={`text-sm ${
                globalState.darkMode ? 'text-gray-400' : 'text-gray-600'
              } mb-6`}>
                Choose the data type and format for your export. Exports will include data within your selected date range.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Platform Overview',
                    description: 'Overall statistics and key metrics',
                    dataType: 'overview',
                    formats: ['JSON', 'CSV']
                  },
                  {
                    title: 'User Data',
                    description: 'Detailed user information and activities',
                    dataType: 'users',
                    formats: ['JSON', 'CSV', 'Excel']
                  },
                  {
                    title: 'Quiz Analytics',
                    description: 'Quiz performance and attempt data',
                    dataType: 'quizzes',
                    formats: ['JSON', 'CSV']
                  },
                  {
                    title: 'Feedback Data',
                    description: 'User feedback and ratings',
                    dataType: 'feedback',
                    formats: ['JSON', 'CSV']
                  },
                  {
                    title: 'Complete Dataset',
                    description: 'All available analytics data',
                    dataType: 'all',
                    formats: ['JSON', 'Excel']
                  }
                ].map((exportOption, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-xl border ${
                      globalState.darkMode
                        ? 'bg-gray-700 border-gray-600'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <h4 className={`text-lg font-medium mb-2 ${
                      globalState.darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {exportOption.title}
                    </h4>
                    <p className={`text-sm mb-4 ${
                      globalState.darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {exportOption.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {exportOption.formats.map((format) => (
                        <button
                          key={format}
                          onClick={() => handleExport(format.toLowerCase() as any, exportOption.dataType)}
                          disabled={exportLoading}
                          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                            exportLoading
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400'
                              : 'bg-blue-500 text-white hover:bg-blue-600'
                          }`}
                        >
                          <Download className="w-4 h-4" />
                          <span>{format}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Export History/Status */}
            <div className={`p-6 rounded-xl border ${
              globalState.darkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                globalState.darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Export Information
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className={`font-medium ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Data Range
                    </h4>
                    <p className={`text-sm ${globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {format(new Date(filters.startDate), 'MMM dd, yyyy')} - {format(new Date(filters.endDate), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className={`font-medium ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Available Formats
                    </h4>
                    <p className={`text-sm ${globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      JSON (structured data), CSV (spreadsheet compatible), Excel (JSON format for Excel import)
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className={`font-medium ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
                      File Size Limit
                    </h4>
                    <p className={`text-sm ${globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Large datasets may be automatically compressed. Maximum 50MB per export.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedAnalytics;