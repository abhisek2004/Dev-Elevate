import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2, Trophy, Zap, Home, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/problems', label: 'Problems', icon: Code2 },
    { path: '/contests', label: 'Contests', icon: Trophy },
    { path: '/leaderboard', label: 'Leaderboard', icon: Zap },
    { path: '/profile', label: 'Profile', icon: User }
  ];

  return (
    <motion.header 
      className="sticky top-0 z-50 border-b border-gray-800 backdrop-blur-sm bg-gray-900/95"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            className="flex items-center space-x-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex justify-center items-center w-10 h-10 bg-gradient-to-r rounded-lg from-electric-400 to-neon-500">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">DevElevate</span>
            </Link>
            
            <nav className="hidden space-x-6 md:flex">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive(path)
                      ? 'text-electric-400 bg-gray-800/50'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/30'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Link>
              ))}
            </nav>
          </motion.div>

          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center space-x-4 text-sm">
              <div className="text-gray-300">
                Solved: <span className="font-semibold text-cyber-400">0</span>
              </div>
              <div className="text-gray-300">
                Streak: <span className="font-semibold text-electric-400">0</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;