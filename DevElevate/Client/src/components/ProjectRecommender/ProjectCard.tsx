import React, { useState } from 'react';
import { 
  Bookmark, 
  BookmarkCheck, 
  Clock, 
  Star, 
  Code, 
  ExternalLink, 
  Github,
  Play,
  Pause,
  CheckCircle,
  MoreVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalState } from '../../contexts/GlobalContext';
import type { ProjectRecommendation } from './ProjectRecommender';

interface ProjectCardProps {
  project: ProjectRecommendation;
  onSave: () => void;
  isSaved?: boolean;
  onStatusChange?: (status: ProjectRecommendation['status']) => void;
  showStatusControls?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  onSave, 
  isSaved = false,
  onStatusChange,
  showStatusControls = false
}) => {
  const { state } = useGlobalState();
  const [showMenu, setShowMenu] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800';
      case 'Intermediate':
        return 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800';
      case 'Advanced':
        return 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800';
      default:
        return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600';
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'saved':
        return 'text-blue-500';
      case 'in_progress':
        return 'text-yellow-500';
      case 'completed':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'saved':
        return BookmarkCheck;
      case 'in_progress':
        return Play;
      case 'completed':
        return CheckCircle;
      default:
        return Bookmark;
    }
  };

  const truncateDescription = (text: string, limit: number = 150) => {
    if (text.length <= limit) return text;
    return text.slice(0, limit) + '...';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className={`rounded-2xl shadow-lg border p-6 transition-all duration-300 ${
        state.darkMode
          ? 'bg-gray-800 border-gray-700 hover:shadow-xl'
          : 'bg-white/80 backdrop-blur-sm border-gray-200/50 hover:shadow-2xl hover:bg-white'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className={`text-xl font-bold mb-2 leading-tight ${
            state.darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {project.title}
          </h3>
          
          <div className="flex items-center space-x-2 mb-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(project.difficulty)}`}>
              {project.difficulty}
            </span>
            <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{project.estimatedTime}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {showStatusControls && (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className={`p-2 rounded-lg transition-colors ${
                  state.darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className={`absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg border z-10 ${
                      state.darkMode ? 'border-gray-600' : 'border-gray-200'
                    }`}
                  >
                    <div className="py-1">
                      {[
                        { status: 'saved', label: 'Mark as Saved', icon: BookmarkCheck },
                        { status: 'in_progress', label: 'Mark in Progress', icon: Play },
                        { status: 'completed', label: 'Mark as Completed', icon: CheckCircle }
                      ].map((option) => {
                        const Icon = option.icon;
                        return (
                          <button
                            key={option.status}
                            onClick={() => {
                              onStatusChange?.(option.status as ProjectRecommendation['status']);
                              setShowMenu(false);
                            }}
                            className={`w-full flex items-center space-x-2 px-4 py-2 text-sm transition-colors ${
                              project.status === option.status
                                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300'
                                : state.darkMode
                                ? 'text-gray-300 hover:bg-gray-600'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span>{option.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <button
            onClick={onSave}
            disabled={isSaved}
            className={`p-2 rounded-lg transition-all duration-200 ${
              isSaved
                ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/30 cursor-default'
                : state.darkMode
                ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-700'
                : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50'
            }`}
            title={isSaved ? 'Already saved' : 'Save project'}
          >
            {React.createElement(getStatusIcon(project.status), { className: "w-5 h-5" })}
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <p className={`text-sm leading-relaxed ${
          state.darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {showFullDescription ? project.description : truncateDescription(project.description)}
        </p>
        {project.description.length > 150 && (
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="text-blue-500 hover:text-blue-600 text-sm mt-1 font-medium"
          >
            {showFullDescription ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>

      {/* Features */}
      <div className="mb-4">
        <h4 className={`text-sm font-semibold mb-2 ${
          state.darkMode ? 'text-gray-200' : 'text-gray-800'
        }`}>
          Key Features
        </h4>
        <div className="space-y-1">
          {project.features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              <span className={`text-sm ${
                state.darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {feature}
              </span>
            </div>
          ))}
          {project.features.length > 3 && (
            <span className={`text-sm italic ${
              state.darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              +{project.features.length - 3} more features
            </span>
          )}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mb-4">
        <h4 className={`text-sm font-semibold mb-2 ${
          state.darkMode ? 'text-gray-200' : 'text-gray-800'
        }`}>
          Tech Stack
        </h4>
        <div className="flex flex-wrap gap-1">
          {project.techStack.map((tech, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded text-xs font-medium border ${
                state.darkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-300'
                  : 'bg-gray-100 border-gray-200 text-gray-700'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-1">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-2">
        {project.starterTutorials && project.starterTutorials.length > 0 && (
          <button
            onClick={() => window.open('#', '_blank')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium border transition-colors ${
              state.darkMode
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <ExternalLink className="w-4 h-4" />
            <span>Tutorial</span>
          </button>
        )}
        
        {project.githubBoilerplates && project.githubBoilerplates.length > 0 && (
          <button
            onClick={() => window.open(project.githubBoilerplates?.[0], '_blank')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium border transition-colors ${
              state.darkMode
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Github className="w-4 h-4" />
            <span>Template</span>
          </button>
        )}
      </div>

      {/* Status indicator */}
      {project.status && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className={`flex items-center space-x-2 text-sm ${getStatusColor(project.status)}`}>
            {React.createElement(getStatusIcon(project.status), { className: "w-4 h-4" })}
            <span className="capitalize font-medium">
              {project.status === 'in_progress' ? 'In Progress' : project.status}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProjectCard;
