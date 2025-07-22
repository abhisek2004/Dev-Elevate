import React, { useState, useEffect } from 'react';
import { Bell, X, Check, CheckCheck, Trash2, Settings, Filter, Calendar, BookOpen, Target, MessageSquare, Star, AlertCircle, Info } from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';
import { format, formatDistanceToNow } from 'date-fns';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Notification {
  id: string;
  type: 'achievement' | 'reminder' | 'update' | 'system' | 'social';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useGlobalState();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'achievements' | 'reminders'>('all');
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);

  // Sample notifications
  useEffect(() => {
    const sampleNotifications: Notification[] = [
      {
        id: '1',
        type: 'achievement',
        title: '🎉 Streak Milestone!',
        message: 'Congratulations! You\'ve maintained a 7-day learning streak. Keep it up!',
        timestamp: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
        read: false,
        priority: 'high',
        category: 'Learning'
      },
      {
        id: '2',
        type: 'reminder',
        title: '📚 Daily Goal Reminder',
        message: 'You have 2 pending goals for today. Complete them to maintain your streak!',
        timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
        read: false,
        actionUrl: '/',
        priority: 'medium',
        category: 'Goals'
      },
      {
        id: '3',
        type: 'update',
        title: '🚀 New Feature: AI Mock Interviews',
        message: 'Practice interviews with our new AI interviewer. Get personalized feedback!',
        timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        read: true,
        actionUrl: '/placement',
        priority: 'medium',
        category: 'Features'
      },
      {
        id: '4',
        type: 'social',
        title: '👥 Study Group Invitation',
        message: 'You\'ve been invited to join the "React Developers" study group.',
        timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        read: false,
        priority: 'low',
        category: 'Community'
      },
      {
        id: '5',
        type: 'system',
        title: '🔧 Scheduled Maintenance',
        message: 'Platform maintenance scheduled for tonight 2:00 AM - 4:00 AM IST.',
        timestamp: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
        read: true,
        priority: 'low',
        category: 'System'
      },
      {
        id: '6',
        type: 'achievement',
        title: '⭐ Course Completed!',
        message: 'You\'ve successfully completed "Arrays and Strings" module. Great job!',
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        read: true,
        priority: 'high',
        category: 'Learning'
      }
    ];

    setNotifications(sampleNotifications);
  }, []);

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.read;
      case 'achievements':
        return notification.type === 'achievement';
      case 'reminders':
        return notification.type === 'reminder';
      default:
        return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    setSelectedNotifications(prev => prev.filter(selectedId => selectedId !== id));
  };

  const deleteSelected = () => {
    setNotifications(prev =>
      prev.filter(notification => !selectedNotifications.includes(notification.id))
    );
    setSelectedNotifications([]);
  };

  const toggleSelection = (id: string) => {
    setSelectedNotifications(prev =>
      prev.includes(id)
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedNotifications(filteredNotifications.map(n => n.id));
  };

  const clearSelection = () => {
    setSelectedNotifications([]);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return <Star className="w-5 h-5 text-yellow-500" />;
      case 'reminder':
        return <Calendar className="w-5 h-5 text-blue-500" />;
      case 'update':
        return <Info className="w-5 h-5 text-green-500" />;
      case 'social':
        return <MessageSquare className="w-5 h-5 text-purple-500" />;
      case 'system':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-500';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
  {/* Backdrop */}
  <div
    className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
    onClick={onClose}
  />

  {/* Notification Panel */}
  <div
    className={`absolute right-0 top-0 h-full w-full max-w-md transform transition-transform duration-300 ease-in-out ${
      state.darkMode ? 'bg-gray-900' : 'bg-white'
    } shadow-2xl translate-x-0 sm:rounded-l-xl flex flex-col`}
  >
    {/* Header */}
    <div className={`p-4 border-b ${state.darkMode ? 'border-gray-700' : 'border-gray-200'} shadow-sm`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Bell className="w-6 h-6 text-blue-500 animate-pulse" />
          <h2
            className={`text-xl font-bold tracking-wide ${
              state.darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Notifications
          </h2>
          {unreadCount > 0 && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full shadow-md animate-bounce">
              {unreadCount}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-2 overflow-x-auto no-scrollbar">
        {[
          { key: 'all', label: 'All' },
          { key: 'unread', label: 'Unread' },
          { key: 'achievements', label: 'Achievements' },
          { key: 'reminders', label: 'Reminders' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as any)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              filter === tab.key
                ? 'bg-blue-600 text-white shadow-sm'
                : state.darkMode
                ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center space-x-2 text-sm">
          {selectedNotifications.length > 0 ? (
            <>
              <button
                onClick={clearSelection}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-white"
              >
                Clear ({selectedNotifications.length})
              </button>
              <button
                onClick={deleteSelected}
                className="text-red-500 hover:text-red-700"
              >
                Delete Selected
              </button>
            </>
          ) : (
            <button
              onClick={selectAll}
              className="text-blue-500 hover:text-blue-700"
            >
              Select All
            </button>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              Mark All Read
            </button>
          )}
          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-all">
            <Settings className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    </div>

    {/* Notifications List */}
    <div className="flex-1 overflow-y-auto no-scrollbar p-1">
      {filteredNotifications.length > 0 ? (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredNotifications.map(notification => (
            <div
              key={notification.id}
              className={`p-4 group border-l-4 ${getPriorityColor(notification.priority)} ${
                !notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''
              } hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200`}
            >
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={selectedNotifications.includes(notification.id)}
                  onChange={() => toggleSelection(notification.id)}
                  className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3
                        className={`text-sm font-semibold ${
                          state.darkMode ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {notification.title}
                      </h3>
                      <p
                        className={`text-sm mt-1 ${
                          state.darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        {notification.message}
                      </p>
                      <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                        <span>
                          {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full ${
                            state.darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {notification.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 ml-2">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                          title="Mark as read"
                        >
                          <Check className="w-4 h-4 text-green-500" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                        title="Delete notification"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>

                  {notification.actionUrl && (
                    <button
                      onClick={() => {
                        markAsRead(notification.id);
                        onClose();
                      }}
                      className="mt-2 text-sm text-blue-500 hover:text-blue-700 font-medium"
                    >
                      Take Action →
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-center transition-all duration-300">
          <Bell className="w-12 h-12 text-gray-400 mb-4 animate-ping-slow" />
          <h3
            className={`text-lg font-medium ${
              state.darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            No notifications
          </h3>
          <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {filter === 'all'
              ? "You're all caught up!"
              : `No ${filter} notifications found.`}
          </p>
        </div>
      )}
    </div>

    {/* Footer */}
    <div
      className={`p-4 border-t text-xs ${
        state.darkMode
          ? 'border-gray-700 bg-gray-800 text-gray-400'
          : 'border-gray-200 bg-gray-50 text-gray-600'
      } flex justify-between`}
    >
      <span>{filteredNotifications.length} notifications</span>
      <span>Last updated: {format(new Date(), 'HH:mm')}</span>
    </div>
  </div>
</div>

  );
};

export default NotificationPanel;