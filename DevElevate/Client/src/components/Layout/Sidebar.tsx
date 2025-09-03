import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  Code2,
  MessageSquare,
  Newspaper,
  Globe,
  FileText,
  Target,
  CreditCard,
  Lightbulb,
  CheckSquare,
  StickyNote,
  Calendar,
  DollarSign,
  Users,
  Brain,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useGlobalState } from "../../contexts/GlobalContext";
import { useNotificationContext } from "../../contexts/NotificationContext";
import SearchModal from "./SearchModal";
import NotificationPanel from "./NotificationPanel";


const Sidebar: React.FC = () => {
  const { state: authState } = useAuth();
  const { state, dispatch } = useGlobalState();
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { notifications } = useNotificationContext();

  const navItems = [
    { path: "/dashboard", icon: Home, label: "Dashboard" },
    { path: "/learning", icon: BookOpen, label: "Learning Hub" },
    { path: "/quiz", icon: Brain, label: "Quiz Center" },
    { path: "/coding", icon: Code2, label: "Coding" },
    { path: "/interview", icon: Users, label: "Interview" },
    { path: "/chatbot", icon: MessageSquare, label: "Study Buddy" },
    { path: "/news", icon: Newspaper, label: "Tech Feed" },
    { path: "/community", icon: Globe, label: "Community" },
    { path: "/resume", icon: FileText, label: "Resume Builder" },
    { path: "/placement", icon: Target, label: "Placement Prep" },
    { path: "/projects", icon: Lightbulb, label: "AI Projects" },
    { path: "/tasks", icon: CheckSquare, label: "Tasks" },
    { path: "/notes", icon: StickyNote, label: "Notes" },
    { path: "/calendar", icon: Calendar, label: "Calendar" },
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
        className={`fixed top-0 h-full left-0 w-64 border-r backdrop-blur-md transition-colors duration-200 ${state.darkMode
          ? "bg-gray-900/90 border-gray-800"
          : "bg-white border-gray-200"
          }`}
      >
        <div className="flex flex-col h-full p-4 space-y-6">
          {/* Navigation Items */}
          <div className="flex flex-col space-y-1">
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
