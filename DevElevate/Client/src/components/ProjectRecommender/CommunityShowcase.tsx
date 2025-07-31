import React, { useState } from 'react';
import { Github, ExternalLink, Heart, Star, Users, Zap, Clock, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGlobalState } from '../../contexts/GlobalContext';

interface CommunityProject {
  id: string;
  title: string;
  description: string;
  author: string;
  authorAvatar?: string;
  githubUrl: string;
  liveUrl?: string;
  techStack: string[];
  upvotes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  createdAt: string;
  isUpvoted?: boolean;
}

const CommunityShowcase: React.FC = () => {
  const { state } = useGlobalState();
  const [upvotedProjects, setUpvotedProjects] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Mock community projects data
  const communityProjects: CommunityProject[] = [
    {
      id: 'community-1',
      title: 'Real-time Chat Application',
      description: 'A modern chat app with real-time messaging, file sharing, and emoji reactions built with Socket.io and React.',
      author: 'Sarah Chen',
      authorAvatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=3b82f6&color=fff',
      githubUrl: 'https://github.com/example/realtime-chat',
      liveUrl: 'https://example-chat.netlify.app',
      techStack: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
      upvotes: 24,
      difficulty: 'Intermediate',
      category: 'Communication',
      createdAt: '2024-01-15'
    },
    {
      id: 'community-2',
      title: 'AI Recipe Generator',
      description: 'Generate personalized recipes based on available ingredients using OpenAI API and dietary preferences.',
      author: 'Mike Johnson',
      authorAvatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=10b981&color=fff',
      githubUrl: 'https://github.com/example/ai-recipe-generator',
      liveUrl: 'https://ai-recipes.vercel.app',
      techStack: ['React', 'TypeScript', 'OpenAI API', 'Tailwind CSS'],
      upvotes: 31,
      difficulty: 'Advanced',
      category: 'AI Tools',
      createdAt: '2024-01-10'
    },
    {
      id: 'community-3',
      title: 'Pomodoro Focus Timer',
      description: 'A beautiful productivity timer with customizable intervals, ambient sounds, and progress tracking.',
      author: 'Emma Rodriguez',
      authorAvatar: 'https://ui-avatars.com/api/?name=Emma+Rodriguez&background=f59e0b&color=fff',
      githubUrl: 'https://github.com/example/pomodoro-timer',
      liveUrl: 'https://focus-timer.surge.sh',
      techStack: ['HTML', 'CSS', 'JavaScript', 'LocalStorage'],
      upvotes: 18,
      difficulty: 'Beginner',
      category: 'Productivity',
      createdAt: '2024-01-08'
    },
    {
      id: 'community-4',
      title: 'Crypto Portfolio Tracker',
      description: 'Track cryptocurrency investments with real-time prices, portfolio analysis, and profit/loss calculations.',
      author: 'Alex Kumar',
      authorAvatar: 'https://ui-avatars.com/api/?name=Alex+Kumar&background=8b5cf6&color=fff',
      githubUrl: 'https://github.com/example/crypto-portfolio',
      techStack: ['React', 'Chart.js', 'CoinGecko API', 'Material-UI'],
      upvotes: 27,
      difficulty: 'Intermediate',
      category: 'Finance',
      createdAt: '2024-01-05'
    },
    {
      id: 'community-5',
      title: 'Meditation & Mindfulness App',
      description: 'A calming meditation app with guided sessions, breathing exercises, and progress tracking.',
      author: 'Luna Park',
      authorAvatar: 'https://ui-avatars.com/api/?name=Luna+Park&background=ec4899&color=fff',
      githubUrl: 'https://github.com/example/meditation-app',
      liveUrl: 'https://mindful-moments.app',
      techStack: ['React Native', 'Expo', 'Audio APIs', 'Firebase'],
      upvotes: 22,
      difficulty: 'Intermediate',
      category: 'Healthcare',
      createdAt: '2024-01-03'
    }
  ];

  const categories = ['All', 'Productivity', 'AI Tools', 'Finance', 'Healthcare', 'Communication', 'Games'];

  const filteredProjects = selectedCategory === 'All' 
    ? communityProjects 
    : communityProjects.filter(project => project.category === selectedCategory);

  const handleUpvote = (projectId: string) => {
    setUpvotedProjects(prev => {
      const newUpvoted = new Set(prev);
      if (newUpvoted.has(projectId)) {
        newUpvoted.delete(projectId);
      } else {
        newUpvoted.add(projectId);
      }
      return newUpvoted;
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Advanced':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
        </div>
        <h2 className={`text-3xl font-bold mb-2 ${
          state.darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Community Showcase
        </h2>
        <p className={`text-lg max-w-2xl mx-auto ${
          state.darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Discover amazing projects built by our community members and get inspired for your next creation
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-blue-500 text-white shadow-md'
                : state
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border p-6 hover:shadow-xl transition-all duration-300 ${
              state ? 'border-gray-700' : 'border-gray-200'
            }`}
          >
            {/* Project Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className={`text-xl font-bold mb-2 leading-tight ${
                  state ? 'text-white' : 'text-gray-900'
                }`}>
                  {project.title}
                </h3>
                
                <div className="flex items-center space-x-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(project.difficulty)}`}>
                    {project.difficulty}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    state ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Upvote Button */}
              <button
                onClick={() => handleUpvote(project.id)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                  upvotedProjects.has(project.id)
                    ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                    : state
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-4 h-4 ${upvotedProjects.has(project.id) ? 'fill-current' : ''}`} />
                <span className="text-sm font-medium">
                  {project.upvotes + (upvotedProjects.has(project.id) ? 1 : 0)}
                </span>
              </button>
            </div>

            {/* Author */}
            <div className="flex items-center space-x-3 mb-4">
              {project.authorAvatar ? (
                <img
                  src={project.authorAvatar}
                  alt={project.author}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
              )}
              <div>
                <p className={`text-sm font-medium ${
                  state ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {project.author}
                </p>
                <p className={`text-xs ${
                  state ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {new Date(project.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className={`text-sm leading-relaxed mb-4 ${
              state ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {project.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 rounded text-xs font-medium border ${
                      state
                        ? 'bg-gray-700 border-gray-600 text-gray-300'
                        : 'bg-gray-100 border-gray-200 text-gray-700'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={() => window.open(project.githubUrl, '_blank')}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium border transition-colors ${
                  state
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Github className="w-4 h-4" />
                <span>Code</span>
              </button>
              
              {project.liveUrl && (
                <button
                  onClick={() => window.open(project.liveUrl, '_blank')}
                  className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Users className={`w-16 h-16 mx-auto mb-4 ${
            state ? 'text-gray-600' : 'text-gray-400'
          }`} />
          <h3 className={`text-xl font-semibold mb-2 ${
            state ? 'text-gray-300' : 'text-gray-600'
          }`}>
            No projects found
          </h3>
          <p className={`${state ? 'text-gray-400' : 'text-gray-500'}`}>
            No projects found in the {selectedCategory} category yet.
          </p>
        </div>
      )}

      {/* Community Stats */}
      <div className={`mt-8 p-6 rounded-2xl border ${
        state 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-gradient-to-r from-blue-50 to-purple-50 border-gray-200'
      }`}>
        <h3 className={`text-lg font-semibold mb-4 ${
          state ? 'text-white' : 'text-gray-900'
        }`}>
          Community Impact
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Projects Shared', value: '150+', icon: Zap },
            { label: 'Developers', value: '1.2K+', icon: Users },
            { label: 'Total Upvotes', value: '3.5K+', icon: Heart },
            { label: 'This Month', value: '24', icon: Clock }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <Icon className={`w-6 h-6 mx-auto mb-2 ${
                  state ? 'text-blue-400' : 'text-blue-500'
                }`} />
                <div className={`text-2xl font-bold ${
                  state ? 'text-white' : 'text-gray-900'
                }`}>
                  {stat.value}
                </div>
                <div className={`text-sm ${
                  state ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CommunityShowcase;
