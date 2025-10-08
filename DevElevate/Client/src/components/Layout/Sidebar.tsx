import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";


import { useGlobalState } from "../../contexts/GlobalContext";
import SearchModal from "./SearchModal";
import NotificationPanel from "./NotificationPanel";
import { FiBookOpen, FiCalendar, FiCode, FiCpu, FiFileText, FiGlobe, FiHome, FiMessageSquare, FiTarget, FiTrendingUp, FiUsers } from "react-icons/fi";
import { FaNewspaper, FaRegStickyNote } from "react-icons/fa";
import { MdLightbulbOutline, MdMap } from "react-icons/md";

const Sidebar: React.FC = () => {
  const { state } = useGlobalState();
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);



  const navItems = [
    { path: "/dashboard", icon: FiHome, label: "Dashboard" },
    { path: "/learning", icon: FiBookOpen, label: "Learning Hub" },
    { path: "/course", icon: FiBookOpen, label: "Video" },
    { path: "/quiz", icon: FiCpu, label: "Quiz Center" },
    { path: "/coding", icon: FiCode, label: "Coding" },
    { path: "/interview", icon: FiUsers, label: "Interview" },
    { path: "/chatbot", icon: FiMessageSquare, label: "Study Buddy" },
    { path: "/news", icon: FaNewspaper, label: "Tech Feed" },
    { path: "/community", icon: FiGlobe, label: "Community" },
    { path: "/resume", icon: FiFileText, label: "Resume Builder" },
    { path: "/placement", icon: FiTarget, label: "Placement Prep" },
    { path: "/projects", icon: MdLightbulbOutline, label: "AI Projects" },
    { path: "/roadmap", icon: MdMap, label: "Road Map" },
    { path: "/notes", icon: FaRegStickyNote, label: "Notes" },
    { path: "/calendar", icon: FiCalendar, label: "Calendar" },
    { path: "/leaderboard", icon: FiTrendingUp, label: "Contributors" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSearchOpen = () => {
    setShowSearch(true);
    setShowNotifications(false);
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-screen overflow-y-auto border-r backdrop-blur-md transition-colors duration-200 ${state.darkMode
            ? "bg-gray-900/90 border-gray-800"
            : "bg-white border-gray-200"
          }`}
      >
        <div className="flex flex-col h-full p-4 space-y-6">
          {/* Navigation Items */}
          <div className="flex flex-col space-y-1 flex-1 overflow-y-auto pb-20 pr-2 overscroll-contain">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(item.path)
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                      : state.darkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-800"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Push content to right to avoid being behind sidebar */}
      <div className="ml-64">
        {/* Search Modal */}
        <SearchModal isOpen={showSearch} onClose={() => setShowSearch(false)} />

        {/* Notification Panel */}
        <NotificationPanel
          isOpen={showNotifications}
          onClose={() => setShowNotifications(false)}
        />

        {/* Invisible keyboard shortcut trap */}
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
      </div>
    </>
  );
};

export default Sidebar;
