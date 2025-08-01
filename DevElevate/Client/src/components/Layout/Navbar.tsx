import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  MessageSquare,
  Newspaper,
  FileText,
  Target,
  CreditCard,
  Bell,
  Search,
  Menu,
  X,
  Lightbulb,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useGlobalState } from "../../contexts/GlobalContext";
import { useNotificationContext } from "../../contexts/NotificationContext";
import SearchModal from "./SearchModal";
import NotificationPanel from "./NotificationPanel";
import ProfileDropdown from "./ProfileDropdown";

const Navbar: React.FC = () => {
  const { state: authState } = useAuth();
  const { state, dispatch } = useGlobalState();
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { notifications } = useNotificationContext();

  const navItems = [
    { path: "/", icon: Home, label: "Dashboard" },
    { path: "/learning", icon: BookOpen, label: "Learning Hub" },
    { path: "/chatbot", icon: MessageSquare, label: "Study Buddy" },
    { path: "/news", icon: Newspaper, label: "Tech Feed" },
    { path: "/resume", icon: FileText, label: "Resume Builder" },
    { path: "/placement", icon: Target, label: "Placement Prep" },
    { path: "/projects", icon: Lightbulb, label: "AI Projects" },
    { path: "/payment", icon: CreditCard, label: "Pricing" },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Mock notification count
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleSearchOpen = () => {
    setShowSearch(true);
    setShowNotifications(false);
    setShowProfile(false);
  };

  const handleNotificationsToggle = () => {
    setShowNotifications(!showNotifications);
    setShowSearch(false);
    setShowProfile(false);
  };

  const handleProfileToggle = () => {
    setShowProfile(!showProfile);
    setShowSearch(false);
    setShowNotifications(false);
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-200 bg-opacity-40 ${
          state.darkMode
            ? "bg-gray-900/90 border-gray-800"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span
                  className={`text-xl font-bold ${
                    state.darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  DevElevate
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
          

            {/* Right side actions */}
            <div className="flex items-center space-x-2">
              {/* Search Button */}
              <button
                onClick={handleSearchOpen}
                className={`p-2 rounded-lg transition-colors ${
                  state.darkMode
                    ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                    : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                }`}
                title="Search (Ctrl+K)"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Notifications Button */}
              <button
                onClick={handleNotificationsToggle}
                className={`relative p-2 rounded-lg transition-colors ${
                  showNotifications
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                    : state.darkMode
                    ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                    : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                }`}
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>

              {/* Dark mode toggle */}

              {/* User Profile */}
              <div className="relative">
                <button
                  onClick={handleProfileToggle}
                  className={`flex items-center space-x-2 p-1 rounded-lg transition-colors ${
                    showProfile
                      ? "bg-blue-100 dark:bg-blue-900"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <img
                    src={
                      authState.user?.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        authState.user?.name || "User"
                      )}&background=3b82f6&color=fff`
                    }
                    alt={authState.user?.name}
                    className="w-8 h-8 rounded-full border-2 border-blue-500"
                  />
                  <div className="hidden md:block text-left">
                    <div
                      className={`text-sm font-medium ${
                        state.darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {authState.user?.name || "Guest"}
                    </div>
                    <div
                      className={`text-xs ${
                        state.darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {authState.user?.progress.level || "Beginner"}
                    </div>
                  </div>
                </button>

                <ProfileDropdown
                  isOpen={showProfile}
                  onClose={() => setShowProfile(false)}
                />
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${
                  state.darkMode
                    ? "hover:bg-gray-800 text-gray-400"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                {showMobileMenu ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {showMobileMenu && (
            <div
              className={`lg:hidden border-t ${
                state.darkMode ? "border-gray-700" : "border-gray-200"
              } py-4`}
            >
              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setShowMobileMenu(false)}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive(item.path)
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                          : state.darkMode
                          ? "text-gray-300 hover:text-white hover:bg-gray-800"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Search Modal */}
      <SearchModal isOpen={showSearch} onClose={() => setShowSearch(false)} />

      {/* Notification Panel */}
      <NotificationPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />

      {/* Global keyboard shortcut for search */}
      {typeof window !== "undefined" && (
        <div
          onKeyDown={(e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
              e.preventDefault();
              handleSearchOpen();
            }
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: 0,
            height: 0,
            opacity: 0,
          }}
          tabIndex={-1}
        />
      )}
    </>
  );
};

export default Navbar;
