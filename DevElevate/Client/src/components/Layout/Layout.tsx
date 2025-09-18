import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="h-screen overflow-hidden">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar  />
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
        <div className="flex-1 overflow-y-auto ml-0  h-[calc(100vh-4rem)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
