import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useGlobalState } from '../../contexts/GlobalContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar,
  Filter,
  AlertCircle,
  Database,
  Search,
  Clock,
  User,
  Shield,
  Activity
} from 'lucide-react';

interface AdminLog {
  _id: string;
  actionType: string;
  userId: string;
  userRole: string;
  timestamp: string;
  message: string;
}

interface AuthData {
  sessionToken: string;
  user: {
    id: string;
    role: string;
    name: string;
  };
}

const AdminSystemLogs: React.FC = () => {
  const navigate = useNavigate();
  const { state: authState } = useAuth();
  const { state: globalState } = useGlobalState();
  
  const [logs, setLogs] = useState<AdminLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<AdminLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [actionTypeFilter, setActionTypeFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const logsPerPage = 20;
  
  // Get auth data from localStorage
  const getAuthData = (): AuthData | null => {
    try {
      const authData = localStorage.getItem('devElevateAuth');
      return authData ? JSON.parse(authData) : null;
    } catch {
      return null;
    }
  };

  // Check if user is admin and redirect if not
  useEffect(() => {
    const authData = getAuthData();
    if (!authData || authData.user.role !== 'admin') {
      navigate('/');
      return;
    }
    
    // Log the page visit
    logPageVisit(authData);
    
    // Fetch system logs
    fetchLogs(authData.sessionToken);
  }, [navigate]);

  // Log admin page visit
  const logPageVisit = async (authData: AuthData) => {
    try {
      const logData = {
        action: 'view_logs',
        userId: authData.user.id,
        userRole: authData.user.role,
        timestamp: new Date().toISOString(),
        details: `Admin ${authData.user.name} viewed system logs page`
      };

      await fetch('http://localhost:4000/api/v1/admin/system-log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authData.sessionToken}`,
        },
        credentials: "include",
        body: JSON.stringify(logData)
      });
    } catch (error) {
      console.error('Failed to log page visit:', error);
    }
  };

  // Fetch logs from backend
  const fetchLogs = async (token: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Build query parameters
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: logsPerPage.toString()
      });

      if (actionTypeFilter !== 'all') {
        params.append('actionType', actionTypeFilter);
      }

      if (dateFilter) {
        params.append('dateFrom', dateFilter);
        params.append('dateTo', dateFilter);
      }

      const response = await fetch(`http://localhost:4000/api/v1/admin/system-logs?${params}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      credentials: "include"
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch logs: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setLogs(data.logs || []);
        setFilteredLogs(data.logs || []);
        
        // Update pagination state from backend response
        if (data.pagination) {
          setTotalPages(data.pagination.totalPages);
          setTotalCount(data.pagination.totalCount);
        }
      } else {
        throw new Error(data.message || 'Failed to fetch logs');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch logs');
    } finally {
      setLoading(false);
    }
  };

  // Filter logs based on actionType and date
  useEffect(() => {
    const authData = getAuthData();
    if (authData) {
      fetchLogs(authData.sessionToken);
    }
  }, [actionTypeFilter, dateFilter, currentPage]);

  // Get unique action types for filter dropdown
  const getUniqueActionTypes = () => {
    const types = logs.map(log => log.actionType);
    return [...new Set(types)];
  };

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  // Pagination logic - data now comes from backend
  const currentLogs = filteredLogs; // Backend already handles pagination
  const startIndex = (currentPage - 1) * logsPerPage + 1;
  const endIndex = Math.min(startIndex + filteredLogs.length - 1, totalCount);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // Get role badge color
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'user':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  // Get action type badge color
  const getActionTypeBadgeColor = (actionType: string) => {
    switch (actionType) {
      case 'login':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'logout':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'update':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'view_logs':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
      case 'create':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300';
      case 'delete':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  if (!authState.user || authState.user.role !== 'admin') {
    return null; // Component will redirect in useEffect
  }

  return (
    <div className={`min-h-screen ${globalState.darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Database className={`w-8 h-8 ${globalState.darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h1 className={`text-3xl font-bold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
              System Logs
            </h1>
          </div>
          <p className={`text-lg ${globalState.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Monitor system activities and user actions
          </p>
        </div>

        {/* Filters */}
        <div className={`${globalState.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border shadow-sm p-6 mb-6`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Action Type Filter */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${globalState.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <Filter className="w-4 h-4 inline mr-2" />
                Action Type
              </label>
              <select
                value={actionTypeFilter}
                onChange={(e) => setActionTypeFilter(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  globalState.darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="all">All Actions</option>
                {getUniqueActionTypes().map(type => (
                  <option key={type} value={type}>
                    {type.replace('_', ' ').toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Filter */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${globalState.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <Calendar className="w-4 h-4 inline mr-2" />
                Date
              </label>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  globalState.darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>

            {/* Stats */}
            <div className="flex items-end">
              <div className={`text-sm ${globalState.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4" />
                  <span>Total Logs: {totalCount}</span>
                </div>
                <div className="mt-1">
                  Showing {startIndex}-{endIndex} of {totalCount}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className={`${globalState.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border shadow-sm p-12`}>
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className={`ml-3 ${globalState.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Loading system logs...
              </span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className={`${globalState.darkMode ? 'bg-red-900 border-red-700' : 'bg-red-50 border-red-200'} rounded-xl border p-6 mb-6`}>
            <div className="flex items-center">
              <AlertCircle className={`w-5 h-5 mr-3 ${globalState.darkMode ? 'text-red-400' : 'text-red-600'}`} />
              <span className={`${globalState.darkMode ? 'text-red-300' : 'text-red-800'}`}>
                {error}
              </span>
            </div>
          </div>
        )}

        {/* Logs Table */}
        {!loading && !error && (
          <div className={`${globalState.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border shadow-sm overflow-hidden`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`${globalState.darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <tr>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${globalState.darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      <Clock className="w-4 h-4 inline mr-2" />
                      Timestamp
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${globalState.darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      <Activity className="w-4 h-4 inline mr-2" />
                      Action Type
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${globalState.darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      <User className="w-4 h-4 inline mr-2" />
                      User ID
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${globalState.darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      <Shield className="w-4 h-4 inline mr-2" />
                      Role
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${globalState.darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      Message
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${globalState.darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {currentLogs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center">
                        <div className={`text-lg ${globalState.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          <Search className="w-8 h-8 mx-auto mb-2" />
                          No logs found
                        </div>
                        <p className={`text-sm ${globalState.darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          Try adjusting your filters
                        </p>
                      </td>
                    </tr>
                  ) : (
                    currentLogs.map((log) => (
                      <tr key={log._id} className={`hover:${globalState.darkMode ? 'bg-gray-700' : 'bg-gray-50'} transition-colors`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-medium ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {formatTimestamp(log.timestamp)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getActionTypeBadgeColor(log.actionType)}`}>
                            {log.actionType.replace('_', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-mono ${globalState.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {log.userId}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(log.userRole)}`}>
                            {log.userRole}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`text-sm ${globalState.darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-md truncate`}>
                            {log.message}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className={`px-6 py-4 border-t ${globalState.darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center justify-between">
                  <div className={`text-sm ${globalState.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === 1
                          ? 'cursor-not-allowed opacity-50'
                          : 'hover:bg-blue-50 dark:hover:bg-blue-900'
                      } ${globalState.darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    
                    {/* Page numbers */}
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNumber = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => goToPage(pageNumber)}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                            currentPage === pageNumber
                              ? 'bg-blue-600 text-white'
                              : `hover:bg-blue-50 dark:hover:bg-blue-900 ${globalState.darkMode ? 'text-gray-300' : 'text-gray-600'}`
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === totalPages
                          ? 'cursor-not-allowed opacity-50'
                          : 'hover:bg-blue-50 dark:hover:bg-blue-900'
                      } ${globalState.darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSystemLogs;
