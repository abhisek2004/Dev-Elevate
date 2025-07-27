import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useGlobalState } from '../../contexts/GlobalContext';
import { 
  Users, 
  BookOpen, 
  FileText, 
  Newspaper, 
  BarChart3, 
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Download,
  Upload,
  Mail,
  Shield,
  AlertTriangle,
  Save,
  X,
  Calendar,
  TrendingUp,
  Activity,
  Globe,
  Database,
  CheckCircle,
  Clock,
  Award,
  Target,
  Filter,
  MessageCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminFeedback from './AdminFeedback';

type Course = {
  id: string;
  title: string;
  description: string;
  modules: number;
  enrolled: number;
  completion: number;
  difficulty: string;
  duration: string;
  instructor: string;
  status: string;
  createdAt: string;
};

type NewsArticle = {
  id: string;
  title: string;
  content: string;
  category: string;
  status: string;
  author: string;
  publishDate: string;
  views: number;
};

const AdminDashboard: React.FC = () => {
  const { state: authState, loadUsers, deleteUser } = useAuth();
  const { state: globalState, dispatch } = useGlobalState();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showAddNews, setShowAddNews] = useState(false);

  type User = {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
    isActive: boolean;
    joinDate: string;
    lastLogin: string;
    progress: {
      totalPoints: number;
      streak: number;
      completedModules: number;
    };
    [key: string]: any;
  };
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [courses, setCourses] =useState<Course[]>([]);

  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [systemSettings, setSystemSettings] = useState({
    siteName: 'DevElevate',
    maintenanceMode: false,
    registrationEnabled: true,
    emailNotifications: true,
    maxUsersPerCourse: 1000,
    sessionTimeout: 30
  });
  const [filter, setFilter] = useState({
    role: '',
    dateFrom: '',
    dateTo: '',
    minProgress: '',
    maxProgress: ''
  });
   type FeedbackFilter = {
  email: string;
  status: string;
  dateFrom: string;
  dateTo: string;
};

const [filters, setFilters] = useState<FeedbackFilter>({
  email: '',
  status: '',
  dateFrom: '',
  dateTo: '',
});

const [feedback, setFeedback] = useState<any[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
    loadCourses();
    loadNewsArticles();
  }, []);

  const loadCourses = () => {
    const savedCourses = JSON.parse(localStorage.getItem('adminCourses') || '[]');
    if (savedCourses.length === 0) {
      const defaultCourses: Course[] = [
        {
          id: '1',
          title: 'Data Structures & Algorithms',
          description: 'Master DSA concepts with hands-on practice',
          modules: 15,
          enrolled: 245,
          completion: 78,
          difficulty: 'Intermediate',
          duration: '12 weeks',
          instructor: 'Dr. Smith',
          status: 'active',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Java Programming',
          description: 'Complete Java development course',
          modules: 12,
          enrolled: 189,
          completion: 85,
          difficulty: 'Beginner',
          duration: '10 weeks',
          instructor: 'Prof. Johnson',
          status: 'active',
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          title: 'MERN Stack Development',
          description: 'Full-stack web development with MERN',
          modules: 18,
          enrolled: 156,
          completion: 72,
          difficulty: 'Advanced',
          duration: '16 weeks',
          instructor: 'Sarah Wilson',
          status: 'active',
          createdAt: new Date().toISOString()
        }
      ];
      setCourses(defaultCourses);
      localStorage.setItem('adminCourses', JSON.stringify(defaultCourses));
    } else {
      setCourses(savedCourses);
    }
  };

  const loadNewsArticles = () => {
    const savedNews = JSON.parse(localStorage.getItem('adminNews') || '[]');
    if (savedNews.length === 0) {
      const defaultNews: NewsArticle[] = [
        {
          id: '1',
          title: 'New AI Course Launch',
          content: 'We are excited to announce our new AI/ML course starting next month.',
          category: 'announcement',
          status: 'published',
          author: 'Admin',
          publishDate: new Date().toISOString(),
          views: 1250
        },
        {
          id: '2',
          title: 'Platform Maintenance Update',
          content: 'Scheduled maintenance will occur this weekend from 2-4 AM.',
          category: 'maintenance',
          status: 'published',
          author: 'Admin',
          publishDate: new Date().toISOString(),
          views: 890
        }
      ];
      setNewsArticles(defaultNews);
      localStorage.setItem('adminNews', JSON.stringify(defaultNews));
    } else {
      setNewsArticles(savedNews);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'courses', label: 'Course Management', icon: BookOpen },
    { id: 'content', label: 'Content Management', icon: FileText },
    { id: 'news', label: 'News & Updates', icon: Newspaper },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'logs', label: 'System Logs', icon: Database },
    { id: 'settings', label: 'System Settings', icon: Settings },
    { id: 'feedback', label:'Feedback', icon: MessageCircle }
  ];

  const stats = [
    {
      title: 'Total Users',
      value: authState.users.length,
      change: '+12%',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Courses',
      value: courses.filter(c => c.status === 'active').length,
      change: '+5%',
      icon: BookOpen,
      color: 'green'
    },
    {
      title: 'Total Enrollments',
      value: courses.reduce((sum, course) => sum + course.enrolled, 0),
      change: '+8%',
      icon: Target,
      color: 'purple'
    },
    {
      title: 'News Articles',
      value: newsArticles.length,
      change: '+15%',
      icon: Newspaper,
      color: 'orange'
    },
    {
      title:'Feedback',
      value:feedback.length,
      change:'+12%',
      icon: Target,
      color:'yellow'
    }
  ];

  // Filter logic
  const filteredUsers = authState.users
    .filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(user => {
      // Role filter
      if (filter.role && user.role !== filter.role) return false;
      // Date filter
      if (filter.dateFrom && new Date(user.joinDate) < new Date(filter.dateFrom)) return false;
      if (filter.dateTo && new Date(user.joinDate) > new Date(filter.dateTo)) return false;
      // Progress filter
      if (filter.minProgress && user.progress.totalPoints < Number(filter.minProgress)) return false;
      if (filter.maxProgress && user.progress.totalPoints > Number(filter.maxProgress)) return false;
      return true;
    });

  const addCourse = (courseData: Omit<Course, 'id' | 'enrolled' | 'completion' | 'status' | 'createdAt'>) => {
    const newCourse = {
      id: Date.now().toString(),
      ...courseData,
      enrolled: 0,
      completion: 0,
      status: 'active',
      createdAt: new Date().toISOString()
    };
    const updatedCourses = [...courses, newCourse];
    setCourses(updatedCourses);
    localStorage.setItem('adminCourses', JSON.stringify(updatedCourses));
    setShowAddCourse(false);
  };

  const deleteCourse = (courseId: string) => {
    const updatedCourses = courses.filter(course => course.id !== courseId);
    setCourses(updatedCourses);
    localStorage.setItem('adminCourses', JSON.stringify(updatedCourses));
  };

  const addNewsArticle = (newsData: Omit<NewsArticle, 'id' | 'author' | 'publishDate' | 'views'>) => {
    const newArticle = {
      id: Date.now().toString(),
      ...newsData,
      author: authState.user?.name || 'Admin',
      publishDate: new Date().toISOString(),
      views: 0
    };
    const updatedNews = [...newsArticles, newArticle];
    setNewsArticles(updatedNews);
    localStorage.setItem('adminNews', JSON.stringify(updatedNews));
    setShowAddNews(false);
  };

  const deleteNewsArticle = (articleId: string) => {
    const updatedNews = newsArticles.filter(article => article.id !== articleId);
    setNewsArticles(updatedNews);
    localStorage.setItem('adminNews', JSON.stringify(updatedNews));
  };

  const exportUserData = () => {
    const dataStr = JSON.stringify(authState.users, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'users_export.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`${globalState.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {stat.title}
                  </p>
                  <p className={`text-3xl font-bold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {stat.value}
                  </p>
                  <p className="text-sm text-green-500 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.change}
                  </p>
                </div>
                <div className={`p-4 rounded-xl bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className={`${globalState.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
        <h3 className={`text-xl font-semibold mb-4 ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setShowAddCourse(true)}
            className="flex items-center space-x-3 p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Course</span>
          </button>
          <button
            onClick={() => setShowAddNews(true)}
            className="flex items-center space-x-3 p-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            <Newspaper className="w-5 h-5" />
            <span>Publish News</span>
          </button>
          <button
            onClick={exportUserData}
            className="flex items-center space-x-3 p-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
          >
            <Download className="w-5 h-5" />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className={`${globalState.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
        <h3 className={`text-xl font-semibold mb-4 ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
          Recent Activity
        </h3>
        <div className="space-y-4">
          {[
            { action: 'New user registered', user: 'john@example.com', time: '2 minutes ago', type: 'user' },
            { action: 'Course completed', user: 'jane@example.com', time: '15 minutes ago', type: 'course' },
            { action: 'Assignment submitted', user: 'bob@example.com', time: '1 hour ago', type: 'assignment' },
            { action: 'New course created', user: 'admin@example.com', time: '2 hours ago', type: 'admin' },
            { action: 'News article published', user: 'admin@example.com', time: '3 hours ago', type: 'news' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'user' ? 'bg-blue-500' :
                  activity.type === 'course' ? 'bg-green-500' :
                  activity.type === 'assignment' ? 'bg-yellow-500' :
                  activity.type === 'admin' ? 'bg-purple-500' : 'bg-orange-500'
                }`}></div>
                <div>
                  <p className={`font-medium ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {activity.action}
                  </p>
                  <p className={`text-sm ${globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {activity.user}
                  </p>
                </div>
              </div>
              <span className={`text-sm ${globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`${globalState.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
          <h3 className={`text-xl font-semibold mb-4 ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
            System Health
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={globalState.darkMode ? 'text-gray-300' : 'text-gray-700'}>Server Status</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-500 text-sm">Online</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className={globalState.darkMode ? 'text-gray-300' : 'text-gray-700'}>Database</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-500 text-sm">Connected</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className={globalState.darkMode ? 'text-gray-300' : 'text-gray-700'}>API Status</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-500 text-sm">Operational</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`${globalState.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
          <h3 className={`text-xl font-semibold mb-4 ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
            Platform Metrics
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={globalState.darkMode ? 'text-gray-300' : 'text-gray-700'}>Uptime</span>
              <span className={`font-medium ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>99.9%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={globalState.darkMode ? 'text-gray-300' : 'text-gray-700'}>Response Time</span>
              <span className={`font-medium ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>120ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={globalState.darkMode ? 'text-gray-300' : 'text-gray-700'}>Active Sessions</span>
              <span className={`font-medium ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>1,247</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
              globalState.darkMode
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add User</span>
          </button>
          <button 
            onClick={exportUserData}
            className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors">
            <Mail className="w-4 h-4" />
            <span>Send Email</span>
          </button>
          <button
            className="flex items-center space-x-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
            onClick={() => setShowFilter(true)}
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className={`${globalState.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 w-full max-w-md mx-4`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg font-semibold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
                Filter Users
              </h3>
              <button onClick={() => setShowFilter(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form
              onSubmit={e => {
                e.preventDefault();
                setShowFilter(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className={`block text-sm font-medium mb-1 ${globalState.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Role</label>
                <select
                  value={filter.role}
                  onChange={e => setFilter(f => ({ ...f, role: e.target.value }))}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    globalState.darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">All</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="moderator">Moderator</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${globalState.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Joined After</label>
                  <input
                    type="date"
                    value={filter.dateFrom}
                    onChange={e => setFilter(f => ({ ...f, dateFrom: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      globalState.darkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${globalState.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Joined Before</label>
                  <input
                    type="date"
                    value={filter.dateTo}
                    onChange={e => setFilter(f => ({ ...f, dateTo: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      globalState.darkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${globalState.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Min Progress</label>
                  <input
                    type="number"
                    min={0}
                    value={filter.minProgress}
                    onChange={e => setFilter(f => ({ ...f, minProgress: e.target.value }))}
                    placeholder="Points"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      globalState.darkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${globalState.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Max Progress</label>
                  <input
                    type="number"
                    min={0}
                    value={filter.maxProgress}
                    onChange={e => setFilter(f => ({ ...f, maxProgress: e.target.value }))}
                    placeholder="Points"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      globalState.darkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setFilter({
                      role: '',
                      dateFrom: '',
                      dateTo: '',
                      minProgress: '',
                      maxProgress: ''
                    });
                  }}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`${globalState.darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg border`}>
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-500" />
            <span className={`text-sm ${globalState.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Users</span>
          </div>
          <p className={`text-2xl font-bold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
            {authState.users.length}
          </p>
        </div>
        <div className={`${globalState.darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg border`}>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className={`text-sm ${globalState.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Active Users</span>
          </div>
          <p className={`text-2xl font-bold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
            {authState.users.filter(u => u.isActive).length}
          </p>
        </div>
        <div className={`${globalState.darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg border`}>
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-purple-500" />
            <span className={`text-sm ${globalState.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Admins</span>
          </div>
          <p className={`text-2xl font-bold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
            {authState.users.filter(u => u.role === 'admin').length}
          </p>
        </div>
        <div className={`${globalState.darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg border`}>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-orange-500" />
            <span className={`text-sm ${globalState.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>New This Month</span>
          </div>
          <p className={`text-2xl font-bold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
            {authState.users.filter(u => new Date(u.joinDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className={`${globalState.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border shadow-sm overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${globalState.darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${globalState.darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  User
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${globalState.darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  Role
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${globalState.darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  Status
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${globalState.darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  Progress
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${globalState.darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  Join Date
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${globalState.darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${globalState.darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3b82f6&color=fff`}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="ml-4">
                        <div className={`text-sm font-medium ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {user.name}
                        </div>
                        <div className={`text-sm ${globalState.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.role === 'admin'
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.isActive
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`text-sm ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {user.progress.totalPoints} pts
                      </div>
                      <div className="ml-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${Math.min(100, (user.progress.totalPoints / 1000) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${globalState.darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                    {new Date(user.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setSelectedUser(user)}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900" title="Edit User">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-orange-600 hover:text-orange-900" title="Send Email">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteUser(user.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCourseManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className={`text-xl font-semibold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
          Course Management
        </h3>
        <button 
          onClick={() => setShowAddCourse(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Course</span>
        </button>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`${globalState.darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg border`}>
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-blue-500" />
            <span className={`text-sm ${globalState.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Courses</span>
          </div>
          <p className={`text-2xl font-bold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
            {courses.length}
          </p>
        </div>
        <div className={`${globalState.darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg border`}>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className={`text-sm ${globalState.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Active Courses</span>
          </div>
          <p className={`text-2xl font-bold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
            {courses.filter(c => c.status === 'active').length}
          </p>
        </div>
        <div className={`${globalState.darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg border`}>
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-purple-500" />
            <span className={`text-sm ${globalState.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Enrollments</span>
          </div>
          <p className={`text-2xl font-bold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
            {courses.reduce((sum, course) => sum + course.enrolled, 0)}
          </p>
        </div>
        <div className={`${globalState.darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg border`}>
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-orange-500" />
            <span className={`text-sm ${globalState.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Avg Completion</span>
          </div>
          <p className={`text-2xl font-bold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
            {courses.length > 0 ? Math.round(courses.reduce((sum, course) => sum + course.completion, 0) / courses.length) : 0}%
          </p>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className={`${globalState.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className={`text-lg font-semibold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
                {course.title}
              </h4>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-800" title="Edit Course">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-green-600 hover:text-green-800" title="View Details">
                  <Eye className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => deleteCourse(course.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete Course"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <p className={`text-sm mb-4 ${globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {course.description}
            </p>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className={globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}>Modules:</span>
                <span className={globalState.darkMode ? 'text-white' : 'text-gray-900'}>{course.modules}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className={globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}>Enrolled:</span>
                <span className={globalState.darkMode ? 'text-white' : 'text-gray-900'}>{course.enrolled}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className={globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}>Completion:</span>
                <span className={globalState.darkMode ? 'text-white' : 'text-gray-900'}>{course.completion}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className={globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}>Difficulty:</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  course.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                  course.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                  'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                }`}>
                  {course.difficulty}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className={globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}>Instructor:</span>
                <span className={globalState.darkMode ? 'text-white' : 'text-gray-900'}>{course.instructor}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  course.status === 'active' 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'
                }`}>
                  {course.status}
                </span>
                <span className={`text-xs ${globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {course.duration}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContentManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className={`text-xl font-semibold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
          Content Management
        </h3>
        <div className="flex space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
            <Upload className="w-4 h-4" />
            <span>Upload Content</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
            <Plus className="w-4 h-4" />
            <span>Create Resource</span>
          </button>
        </div>
      </div>

      {/* Content Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${globalState.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="w-6 h-6 text-blue-500" />
            <h4 className={`text-lg font-semibold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
              Documents
            </h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className={globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}>PDFs</span>
              <span className={globalState.darkMode ? 'text-white' : 'text-gray-900'}>24</span>
            </div>
            <div className="flex justify-between">
              <span className={globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}>Notes</span>
              <span className={globalState.darkMode ? 'text-white' : 'text-gray-900'}>156</span>
            </div>
            <div className="flex justify-between">
              <span className={globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}>Guides</span>
              <span className={globalState.darkMode ? 'text-white' : 'text-gray-900'}>32</span>
            </div>
          </div>
          <button className="w-full mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
            Manage Documents
          </button>
        </div>

        <div className={`${globalState.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="w-6 h-6 text-green-500" />
            <h4 className={`text-lg font-semibold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
              Media
            </h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className={globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}>Videos</span>
              <span className={globalState.darkMode ? 'text-white' : 'text-gray-900'}>89</span>
            </div>
            <div className="flex justify-between">
              <span className={globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}>Images</span>
              <span className={globalState.darkMode ? 'text-white' : 'text-gray-900'}>245</span>
            </div>
            <div className="flex justify-between">
              <span className={globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}>Audio</span>
              <span className={globalState.darkMode ? 'text-white' : 'text-gray-900'}>12</span>
            </div>
          </div>
          <button className="w-full mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
            Manage Media
          </button>
        </div>

        <div className={`${globalState.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
          <div className="flex items-center space-x-3 mb-4">
            <Database className="w-6 h-6 text-purple-500" />
            <h4 className={`text-lg font-semibold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
              Resources
            </h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className={globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}>Templates</span>
              <span className={globalState.darkMode ? 'text-white' : 'text-gray-900'}>18</span>
            </div>
            <div className="flex justify-between">
              <span className={globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}>Cheatsheets</span>
              <span className={globalState.darkMode ? 'text-white' : 'text-gray-900'}>67</span>
            </div>
            <div className="flex justify-between">
              <span className={globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}>Tools</span>
              <span className={globalState.darkMode ? 'text-white' : 'text-gray-900'}>23</span>
            </div>
          </div>
          <button className="w-full mt-4 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors">
            Manage Resources
          </button>
        </div>
      </div>

      {/* Recent Uploads */}
      <div className={`${globalState.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
        <h4 className={`text-lg font-semibold mb-4 ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
          Recent Uploads
        </h4>
        <div className="space-y-3">
          {[
            { name: 'DSA Complete Guide.pdf', type: 'PDF', size: '2.4 MB', date: '2 hours ago' },
            { name: 'React Hooks Tutorial.mp4', type: 'Video', size: '45.2 MB', date: '5 hours ago' },
            { name: 'Java Cheatsheet.png', type: 'Image', size: '1.2 MB', date: '1 day ago' },
            { name: 'System Design Notes.md', type: 'Document', size: '156 KB', date: '2 days ago' }
          ].map((file, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <div>
                  <p className={`font-medium ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {file.name}
                  </p>
                  <p className={`text-sm ${globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {file.type} • {file.size}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {file.date}
                </span>
                <button className="text-blue-600 hover:text-blue-800">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNewsManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className={`text-xl font-semibold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
          News & Updates Management
        </h3>
        <button 
          onClick={() => setShowAddNews(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add News</span>
        </button>
      </div>

      {/* News Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`${globalState.darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg border`}>
          <div className="flex items-center space-x-2">
            <Newspaper className="w-5 h-5 text-blue-500" />
            <span className={`text-sm ${globalState.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Articles</span>
          </div>
          <p className={`text-2xl font-bold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
            {newsArticles.length}
          </p>
        </div>
        <div className={`${globalState.darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg border`}>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className={`text-sm ${globalState.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Published</span>
          </div>
          <p className={`text-2xl font-bold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
            {newsArticles.filter(a => a.status === 'published').length}
          </p>
        </div>
        <div className={`${globalState.darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg border`}>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-yellow-500" />
            <span className={`text-sm ${globalState.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Draft</span>
          </div>
          <p className={`text-2xl font-bold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
            {newsArticles.filter(a => a.status === 'draft').length}
          </p>
        </div>
        <div className={`${globalState.darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg border`}>
          <div className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-purple-500" />
            <span className={`text-sm ${globalState.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Views</span>
          </div>
          <p className={`text-2xl font-bold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
            {newsArticles.reduce((sum, article) => sum + article.views, 0)}
          </p>
        </div>
      </div>

      {/* News Articles */}
      <div className={`${globalState.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border shadow-sm overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${globalState.darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${globalState.darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  Article
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${globalState.darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  Category
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${globalState.darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  Status
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${globalState.darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  Views
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${globalState.darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  Date
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${globalState.darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${globalState.darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {newsArticles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div>
                      <div className={`text-sm font-medium ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {article.title}
                      </div>
                      <div className={`text-sm ${globalState.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        By {article.author}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      article.category === 'announcement' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                        : article.category === 'maintenance'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                    }`}>
                      {article.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      article.status === 'published'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}>
                      {article.status}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${globalState.darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                    {article.views}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${globalState.darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                    {new Date(article.publishDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900" title="View Article">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900" title="Edit Article">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteNewsArticle(article.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete Article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h3 className={`text-xl font-semibold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
        Analytics Dashboard
      </h3>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`${globalState.darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg border`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Page Views</p>
              <p className={`text-2xl font-bold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>24,567</p>
              <p className="text-sm text-green-500">+12% from last month</p>
            </div>
            <Activity className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className={`${globalState.darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg border`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>User Engagement</p>
              <p className={`text-2xl font-bold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>78%</p>
              <p className="text-sm text-green-500">+5% from last week</p>
            </div>
            <Users className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className={`${globalState.darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg border`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Course Completion</p>
              <p className={`text-2xl font-bold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>85%</p>
              <p className="text-sm text-green-500">+8% from last month</p>
            </div>
            <Award className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className={`${globalState.darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg border`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Revenue</p>
              <p className={`text-2xl font-bold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>$12,450</p>
              <p className="text-sm text-green-500">+15% from last month</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${globalState.darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg border`}>
          <h4 className={`text-lg font-semibold mb-4 ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
            User Growth
          </h4>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <p className={globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}>Chart Placeholder</p>
          </div>
        </div>

        <div className={`${globalState.darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg border`}>
          <h4 className={`text-lg font-semibold mb-4 ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
            Course Performance
          </h4>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <p className={globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}>Chart Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSystemLogs = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className={`text-xl font-semibold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
          System Logs
        </h3>
        <button
          onClick={() => navigate('/admin/logs')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Database className="w-4 h-4 inline mr-2" />
          View Detailed Logs
        </button>
      </div>

      <div className={`${globalState.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
        <p className={`text-center py-12 ${globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <Database className="w-12 h-12 mx-auto mb-4 opacity-50" />
          Click "View Detailed Logs" to access the full system logs interface with filtering, search, and pagination capabilities.
        </p>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <h3 className={`text-xl font-semibold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
        System Settings
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className={`${globalState.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
          <h4 className={`text-lg font-semibold mb-4 ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
            General Settings
          </h4>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${globalState.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Site Name
              </label>
              <input
                type="text"
                value={systemSettings.siteName}
                onChange={(e) => setSystemSettings({...systemSettings, siteName: e.target.value})}
                className={`w-full px-3 py-2 rounded-lg border ${
                  globalState.darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className={`text-sm font-medium ${globalState.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Maintenance Mode
                </label>
                <p className={`text-xs ${globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Enable to show maintenance page to users
                </p>
              </div>
              <button
                onClick={() => setSystemSettings({...systemSettings, maintenanceMode: !systemSettings.maintenanceMode})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  systemSettings.maintenanceMode ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    systemSettings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className={`text-sm font-medium ${globalState.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  User Registration
                </label>
                <p className={`text-xs ${globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Allow new users to register
                </p>
              </div>
              <button
                onClick={() => setSystemSettings({...systemSettings, registrationEnabled: !systemSettings.registrationEnabled})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  systemSettings.registrationEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    systemSettings.registrationEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className={`${globalState.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
          <h4 className={`text-lg font-semibold mb-4 ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
            Security Settings
          </h4>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${globalState.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                value={systemSettings.sessionTimeout}
                onChange={(e) => setSystemSettings({...systemSettings, sessionTimeout: parseInt(e.target.value)})}
                className={`w-full px-3 py-2 rounded-lg border ${
                  globalState.darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${globalState.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Max Users Per Course
              </label>
              <input
                type="number"
                value={systemSettings.maxUsersPerCourse}
                onChange={(e) => setSystemSettings({...systemSettings, maxUsersPerCourse: parseInt(e.target.value)})}
                className={`w-full px-3 py-2 rounded-lg border ${
                  globalState.darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className={`text-sm font-medium ${globalState.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email Notifications
                </label>
                <p className={`text-xs ${globalState.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Send system notifications via email
                </p>
              </div>
              <button
                onClick={() => setSystemSettings({...systemSettings, emailNotifications: !systemSettings.emailNotifications})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  systemSettings.emailNotifications ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    systemSettings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Settings */}
      <div className="flex justify-end">
        <button className="flex items-center space-x-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
          <Save className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
      </div>
    </div>
  );

  const renderFeedbackManagement = () => (
  <div className="space-y-6">
    {/* Search & Actions */}
    <div className="flex flex-col sm:flex-row gap-4 justify-between">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search feedback..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
            globalState.darkMode
              ? 'bg-gray-800 border-gray-700 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
      </div>

      <div className="flex">
        <button
          className="flex items-center space-x-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
          onClick={() => setShowFilter(true)}
        >
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>
    </div>

    {/* Filter Modal */}
    {showFilter && (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className={`${globalState.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 w-full max-w-md mx-4`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-lg font-semibold ${globalState.darkMode ? 'text-white' : 'text-gray-900'}`}>
              Filter Feedback
            </h3>
            <button onClick={() => setShowFilter(false)} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShowFilter(false);
            }}
            className="space-y-4"
          >
            <div>
              <label className={`block text-sm font-medium mb-1 ${globalState.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
                className={`w-full px-3 py-2 rounded-lg border ${
                  globalState.darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${globalState.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  From Date
                </label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters((f) => ({ ...f, dateFrom: e.target.value }))}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    globalState.darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${globalState.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  To Date
                </label>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters((f) => ({ ...f, dateTo: e.target.value }))}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    globalState.darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() =>
                  setFilters({
                    email: '',
                    status: '',
                    dateFrom: '',
                    dateTo: ''
                  })
                }
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                Apply
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
);
  const renderFeedback = () => (
  <div className="space-y-6">
    {renderFeedbackManagement()}
    <AdminFeedback />
  </div>
);



  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'users':
        return renderUserManagement();
      case 'courses':
        return renderCourseManagement();
      case 'content':
        return renderContentManagement();
      case 'news':
        return renderNewsManagement();
      case 'analytics':
        return renderAnalytics();
      case 'settings':
        return renderSystemSettings();
      case 'overview':
        return renderOverview();
      default:
        return renderFeedback();
    }
  };



  if (!authState.user || authState.user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            You don't have permission to access the admin dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${globalState.darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${globalState.darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
            Admin Dashboard
          </h1>
          <p className={`text-lg ${globalState.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Comprehensive platform management and analytics
          </p>
          {/* 🌙 Dark Mode Toggle Button */}
            <button
           
            onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE'
 })}
            className={`mt-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              globalState.darkMode
                ? 'bg-gray-700 text-white hover:bg-gray-600'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
          >
            {globalState.darkMode ? '☀ Light' : '🌙 Dark'}
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white shadow-lg'
                      : globalState.darkMode
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
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
          {renderTabContent()}
        </div>
      </div>

      {/* Add Course Modal */}
      {showAddCourse && (
        <AddCourseModal 
          onClose={() => setShowAddCourse(false)}
          onAdd={addCourse}
          darkMode={globalState.darkMode}
        />
      )}

      {/* Add News Modal */}
      {showAddNews && (
        <AddNewsModal 
          onClose={() => setShowAddNews(false)}
          onAdd={addNewsArticle}
          darkMode={globalState.darkMode}
        />
      )}

      {/* User Details Modal */}
      {selectedUser && (
        <UserDetailsModal 
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          darkMode={globalState.darkMode}
        />
      )}
    </div>
  );
};

// Add Course Modal Component
type AddCourseModalProps = {
  onClose: () => void;
  onAdd: (courseData: {
    title: string;
    description: string;
    modules: number;
    difficulty: string;
    duration: string;
    instructor: string;
  }) => void;
  darkMode: boolean;
};

const AddCourseModal: React.FC<AddCourseModalProps> = ({ onClose, onAdd, darkMode }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    modules: 0,
    difficulty: 'Beginner',
    duration: '',
    instructor: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 w-full max-w-md mx-4`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Add New Course
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Course Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className={`w-full px-3 py-2 rounded-lg border ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              className={`w-full px-3 py-2 rounded-lg border ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Modules
              </label>
              <input
                type="number"
                value={formData.modules}
                onChange={(e) => setFormData({...formData, modules: parseInt(e.target.value)})}
                className={`w-full px-3 py-2 rounded-lg border ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Difficulty
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                className={`w-full px-3 py-2 rounded-lg border ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Duration
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                placeholder="e.g., 12 weeks"
                className={`w-full px-3 py-2 rounded-lg border ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Instructor
              </label>
              <input
                type="text"
                value={formData.instructor}
                onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                className={`w-full px-3 py-2 rounded-lg border ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Add Course
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Add News Modal Component
type AddNewsModalProps = {
  onClose: () => void;
  onAdd: (newsData: { title: string; content: string; category: string; status: string }) => void;
  darkMode: boolean;
};

const AddNewsModal: React.FC<AddNewsModalProps> = ({ onClose, onAdd, darkMode }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'announcement',
    status: 'published'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 w-full max-w-md mx-4`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Add News Article
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className={`w-full px-3 py-2 rounded-lg border ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Content
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              rows={3}
              className={`w-full px-3 py-2 rounded-lg border ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className={`w-full px-3 py-2 rounded-lg border ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="announcement">Announcement</option>
              <option value="maintenance">Maintenance</option>
              <option value="news">News</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.status === 'published'}
              onChange={(e) => setFormData({...formData, status: e.target.checked ? 'published' : 'draft'})}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Publish immediately
            </label>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Add News
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// User Details Modal Component
type UserDetailsModalProps = {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
    isActive: boolean;
    joinDate: string;
    lastLogin: string;
    progress: {
      totalPoints: number;
      streak: number;
      completedModules: number;
    };
    [key: string]: any;
  };
  onClose: () => void;
  darkMode: boolean;
};

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ user, onClose, darkMode }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 w-full max-w-lg mx-4`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            User Details
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3b82f6&color=fff`}
              alt={user.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {user.name}
              </h4>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {user.email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Role
              </label>
              <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.role}</p>
            </div>
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Status
              </label>
              <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {user.isActive ? 'Active' : 'Inactive'}
              </p>
            </div>
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Join Date
              </label>
              <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {new Date(user.joinDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Last Login
              </label>
              <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {new Date(user.lastLogin).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Progress Summary
            </label>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {user.progress.totalPoints}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Points</p>
              </div>
              <div className="text-center">
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {user.progress.streak}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Streak</p>
              </div>
              <div className="text-center">
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {user.progress.completedModules}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Modules</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};


export default AdminDashboard;