import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import HomePage from "./Pages/HomePage";
import ProblemsPage from "./Pages/ProblemsPage";

const Coding: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "") {
      return location.pathname === "/coding" || location.pathname === "/coding/";
    }
    return location.pathname.startsWith(`/coding/${path}`);
  };

  const navItems = [
    { name: "Home", path: "" },
    { name: "Problems", path: "problems" }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Top Navigation Bar */}
      <div className="fixed top-20 left-0 right-0 z-30 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
        <nav className="flex items-center justify-center gap-8 py-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={`/coding/${item.path}`}
              className="relative text-lg font-medium"
            >
              <span
                className={`transition-colors ${
                  isActive(item.path)
                    ? "text-blue-400"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.name}
              </span>

              {isActive(item.path) && (
                <motion.div
                  layoutId="codingNavIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-blue-400 rounded-full"
                />
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 pt-40 pb-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/problems" element={<ProblemsPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default Coding;
