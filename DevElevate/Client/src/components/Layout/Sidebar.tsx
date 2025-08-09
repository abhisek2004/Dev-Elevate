import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  MessageSquare,
  Newspaper,
  Globe,
  FileText,
  Target,
  CreditCard,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useGlobalState } from "../../contexts/GlobalContext";
import { useNotificationContext } from "../../contexts/NotificationContext";
import SearchModal from "./SearchModal";
import NotificationPanel from "./NotificationPanel";
import {motion} from 'framer-motion'

interface SidebarProps{
  showSidebar:boolean,
  setShowSidebar:any
}
const Sidebar: React.FC<SidebarProps> = ({showSidebar, setShowSidebar}) => {
  const { state: authState } = useAuth();
  const { state, dispatch } = useGlobalState();
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { notifications } = useNotificationContext();

  const navItems = [
    { path: "/", icon: Home, label: "Dashboard" },
    { path: "/learning", icon: BookOpen, label: "Learning Hub" },
    { path: "/chatbot", icon: MessageSquare, label: "Study Buddy" },
    { path: "/news", icon: Newspaper, label: "Tech Feed" },
    { path: "/community", icon: Globe, label: "Community" },
    { path: "/resume", icon: FileText, label: "Resume Builder" },
    { path: "/placement", icon: Target, label: "Placement Prep" },
    { path: "/projects", icon: Lightbulb, label: "AI Projects" },
    { path: "/payment", icon: CreditCard, label: "Pricing" },
  ];

  const isActive = (path: string) => location.pathname === path;



  const handleSearchOpen = () => {
    setShowSearch(true);
    setShowNotifications(false);
    setShowProfile(false);
  };

 
  const sidebarVariants={
    open:{
      width:'256px',
      transition:{duration:0.5, ease:'easeOut'}
    },
    closed:{
      width:'70px',
      transition:{duration:0.5, ease:'easeOut'}
    }
  }


const itemVariants={
  hidden:{opacity:1, x:0, 
    transition:{type:'spring', stiffness:50, damping:5}},
    visible:{opacity:0, x:-12, 
    transition:{type:'spring', stiffness:50, damping:5}}
}
  return (
    <>
      {/* Sidebar */}

      <motion.div
        layout
        variants={sidebarVariants}
        initial={false}
        animate={showSidebar? 'open':'closed'}
        className={`fixed flex flex-col space-y-1 px-2 py-2  top-16 h-[calc(100vh-4rem)] left-0 border-r backdrop-blur-md transition-colors duration-200 ${state.darkMode
          ? "bg-gray-900/90 border-gray-800"
          : "bg-white border-gray-200"
          }`}
      >
          {/* Navigation Items */}
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}

                  className={`flex items-center ${showSidebar? 'w-full':'w-fit'} space-x-3 px-2 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(item.path)
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    : state.darkMode
                      ? "text-gray-300 hover:text-white hover:bg-gray-800"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                >
                  <motion.div
                   layout
                   animate={showSidebar ? {rotate:360, transition:{duration:0.2, ease:'easeOut'}}
                   :{rotate:360, transition:{duration:0.2, ease:'easeOut'}}}
                  >
                  <Icon size={showSidebar? 18: 22} />
                  </motion.div>
                  
                  {showSidebar && 
                  <motion.span
                    initial={{opacity:0, x:-12}}
                    animate={{opacity:1, x:0}}
                    transition={{type:'spring', stiffness:50, damping:5}}
                  >
                    {item.label}
                  </motion.span>}
                  
                </Link>
              );
            })}

        {/* toggle  button */}
        <div className="absolute bottom-6 left-3 right-2">
          <button 
           className="flex items-center text-gray-600 gap-2 hover:text-gray-800"
           onClick={()=>setShowSidebar(!showSidebar)}>
            <div className={`${showSidebar? 'transform rotate-180':''}`}>
              <ChevronsRight />
            </div>
            {showSidebar && (
              <span>
                Hide
              </span>)}
          </button>
        </div>
      </motion.div>

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
