import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { useGlobalState } from "../../contexts/GlobalContext";
import { useNotificationContext } from "../../contexts/NotificationContext";
import SearchModal from "./SearchModal";
import NotificationPanel from "./NotificationPanel";
import ProfileDropdown from "./ProfileDropdown";
import { MdOutlinePlaylistAddCircle } from "react-icons/md";
import MainCalculator from "../Calculator/MainCalculator";
import { CalculatorHistoryProvider } from "../../contexts/CalculatorHistoryContext";
import { FiActivity, FiBookOpen, FiCalendar, FiCode, FiCpu, FiFileText, FiGlobe, FiHome, FiMessageSquare, FiTarget, FiTrendingUp, FiUsers } from "react-icons/fi";
import { FaBookOpen, FaNewspaper, FaRegStickyNote } from "react-icons/fa";
import { MdLightbulbOutline, MdMap } from "react-icons/md";
import { CiBellOn, CiMenuBurger, CiSearch } from "react-icons/ci";
import { Bot, X } from "lucide-react";

const Navbar: React.FC = () => {
  const { state: authState } = useAuth();
  const { state } = useGlobalState();
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { notifications } = useNotificationContext();

  const navItems = [
    { path: "/dashboard", icon: FiHome, label: "Dashboard" },
    { path: "/learning", icon: FiBookOpen, label: "Learning Hub" },
    { path: "/course", icon: FiBookOpen, label: "Video" },
    { path: "/quiz", icon: FiCpu, label: "Quiz Center" },
    { path: "/skill-assessment", icon: FiActivity, label: "Skill Assessment" },
    { path: "/coding", icon: FiCode, label: "Coding" },
    { path: "/interview", icon: FiUsers, label: "Interview" },
    { path: "/chatbot", icon: FiMessageSquare, label: "Study Buddy" },
    { path: "/news", icon: FaNewspaper, label: "Tech Feed" },
    { path: "/community", icon: FiGlobe, label: "Community" },
    { path: "/resume", icon: FiFileText, label: "Resume Builder" },
    { path: "/cover-letter", icon: FiFileText, label: "Cover Letter" },
    { path: "/placement", icon: FiTarget, label: "Placement Prep" },
    { path: "/projects", icon: MdLightbulbOutline, label: "AI Projects" },
    { path: "/ai-model", icon: Bot, label: "AI Models" },
    { path: "/roadmap", icon: MdMap, label: "Road Map" },
    { path: "/notes", icon: FaRegStickyNote, label: "Notes" },
    { path: "/calendar", icon: FiCalendar, label: "Calendar" },
    { path: "/leaderboard", icon: FiTrendingUp, label: "Contributors" },
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

  const handleCalculatorOpen = () => {
    setShowCalculator(true);
    setShowNotifications(false);
    setShowProfile(false);
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-200 bg-opacity-40 ${state.darkMode
            ? "bg-gray-900/90 border-gray-800"
            : "bg-white border-gray-200"
          }`}
      >
        <div className="px-4 mx-auto max-w-9xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                  <FaBookOpen className="w-5 h-5 text-white" />
                </div>
                <span
                  className={`text-xl font-bold ${state.darkMode ? "text-white" : "text-gray-900"
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
                className={`p-2 rounded-lg transition-colors ${state.darkMode
                    ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                    : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                  }`}
                title="Search (Ctrl+K)"
              >
                <CiSearch className="w-5 h-5" />
              </button>

              <button
                onClick={handleCalculatorOpen}
                className={`p-2 rounded-lg transition-colors ${state.darkMode
                    ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                    : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                  }`}
                title="Search (Ctrl+K)"
              >
                <MdOutlinePlaylistAddCircle className="w-5 h-5" />
              </button>

              {/* Notifications Button */}
              <button
                onClick={handleNotificationsToggle}
                className={`relative p-2 rounded-lg transition-colors ${showNotifications
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                    : state.darkMode
                      ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                      : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                  }`}
                title="Notifications"
              >
                <CiBellOn className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-red-500 rounded-full -top-1 -right-1">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>

              {/* User Profile */}
              <div className="relative">
                <button
                  onClick={handleProfileToggle}
                  className={`flex items-center p-1 space-x-2 rounded-lg transition-colors`}
                >
                  <img
                    src={
                      authState.user?.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        authState.user?.name || "User"
                      )}&background=3b82f6&color=fff`
                    }
                    alt={authState.user?.name}
                    className="w-8 h-8 border-2 border-blue-500 rounded-full"
                  />
                  <div className="hidden text-left md:block">
                    <div
                      className={`text-sm font-medium ${state.darkMode ? "text-white" : "text-gray-900"
                        }`}
                    >
                      {authState.user?.name || "Guest"}
                    </div>
                    <div
                      className={`text-xs ${state.darkMode ? "text-gray-400" : "text-gray-600"
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
                className={`lg:hidden p-2 rounded-lg transition-colors ${state.darkMode
                    ? "hover:bg-gray-800 text-gray-400"
                    : "hover:bg-gray-100 text-gray-600"
                  }`}
              >
                {showMobileMenu ? (
                  <X className="w-5 h-5" />
                ) : (
                  <CiMenuBurger className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {showMobileMenu && (
            <div
              className={`lg:hidden border-t ${state.darkMode ? "border-gray-700" : "border-gray-200"
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
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(item.path)
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

      <CalculatorHistoryProvider>
        <MainCalculator
          isOpen={showCalculator}
          onClose={() => setShowCalculator(false)}
        />
      </CalculatorHistoryProvider>

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
