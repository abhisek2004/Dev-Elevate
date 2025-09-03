import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Code2, Zap, Trophy, Users, ArrowRight, Play, Star, GitBranch, Target, BarChart3, Calendar, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import HomePage from './Pages/HomePage';
import ProblemsPage from './Pages/ProblemsPage';
import ProblemDetailPage from './Pages/ProblemDetailPage';
import ContestsPage from './Pages/ContestsPage';
import LeaderboardPage from './Pages/LeaderboardPage';
import ProfilePage from './Pages/ProfilePage';
import AdminDashboard from './Pages/AdminDashboard';

const Coding: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { id: 'home', label: 'Home', path: '', icon: Code2 },
    { id: 'problems', label: 'Problems', path: 'problems', icon: Target },
    { id: 'contests', label: 'Contests', path: 'contests', icon: Trophy },
    { id: 'leaderboard', label: 'Leaderboard', path: 'leaderboard', icon: BarChart3 },
    { id: 'profile', label: 'Profile', path: 'profile', icon: Users },
  ];

  const isActive = (itemPath: string) => {
    const currentPath = location.pathname;
    if (itemPath === '') {
      return currentPath === '/coding' || currentPath === '/coding/';
    }
    return currentPath.startsWith(`/coding/${itemPath}`);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-800 backdrop-blur-sm bg-gray-900/95">
        <div className="px-4 py-6 mx-auto max-w-7xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-r rounded-lg from-electric-400 to-neon-500">
                <Code2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">DevElevate Coding</h1>
                <p className="text-gray-400">Master coding, shape the future</p>
              </div>
            </div>
            
            {/* Navigation Tabs */}
            <nav className="flex p-1 space-x-1 bg-gray-800 rounded-lg">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    to={`/coding/${item.path}`} 
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-electric-500 text-white shadow-lg shadow-electric-500/25'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-8 mx-auto max-w-7xl">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/problems" element={<ProblemsPage />} />
          <Route path="/problems/:id" element={<ProblemDetailPage />} />
          <Route path="/contests" element={<ContestsPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
    </div>
  );
};

export default Coding;
