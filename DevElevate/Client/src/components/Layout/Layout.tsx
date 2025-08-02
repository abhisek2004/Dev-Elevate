import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useAuth } from "../../contexts/AuthContext";

interface LayoutProps { 
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children } : LayoutProps) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const {state:authState} = useAuth();    
  const theme = authState.user?.preferences?.theme || "light";

  useEffect(() => {
  const localAuth = localStorage.getItem("devElevateAuth");
  let savedTheme = "light";

  try {
    if (localAuth) {
      const parsed = JSON.parse(localAuth);
      savedTheme = parsed.user?.preferences?.theme || "light";
    }
  } catch (err) {
    console.error("Error parsing devElevateAuth:", err);
  }

  // Fallback + context-aware theme update
  const finalTheme = authState.user?.preferences?.theme || savedTheme;

  if (finalTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [authState.user?.preferences?.theme]);

  


  return (
    <div className="h-screen overflow-hidden">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar toggleSidebar={() => setShowSidebar(!showSidebar)} />
      </div>

      {/* Sidebar and Main Layout */}
      <div className="flex pt-16 h-full">
        {/* Sidebar */}
        <div
          className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white shadow-lg z-40 transition-transform duration-300 transform ${
            showSidebar ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static md:h-full md:w-64`}
        >
          <Sidebar />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto ml-0 h-[calc(100vh-4rem)]">
          {children}{" "}
        </div>
      </div>
    </div>
  );
};

export default Layout;
