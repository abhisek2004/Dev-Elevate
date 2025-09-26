import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import {
} from "lucide-react";
import { motion } from "framer-motion";
import HomePage from "./Pages/HomePage";
import ProblemsPage from "./Pages/ProblemsPage";

const Coding: React.FC = () => {
  const location = useLocation();
  const isActive = (itemPath: string) => {
    const currentPath = location.pathname;
    if (itemPath === "") {
      return currentPath === "/coding" || currentPath === "/coding/";
    }
    return currentPath.startsWith(`/coding/${itemPath}`);
  };
  return (
    <div className="relative min-h-screen py-24 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      {/* Main Content */}
      <main className="px-4 py-8 mx-auto max-w-7xl">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/problems" element={<ProblemsPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default Coding;
