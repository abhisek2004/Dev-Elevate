import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, BookOpen, MessageSquare, FileText, Target, Newspaper, User, ExternalLink } from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';
import { useNavigate } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useGlobalState();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // Sample searchable content
  const searchableContent = [
    // Learning Hub
    { type: 'course', title: 'Data Structures & Algorithms', path: '/learning', icon: BookOpen, description: 'Master DSA concepts and problem solving' },
    { type: 'course', title: 'Java Programming', path: '/learning', icon: BookOpen, description: 'Learn Java from basics to advanced' },
    { type: 'course', title: 'MERN Stack Development', path: '/learning', icon: BookOpen, description: 'Full-stack web development with MERN' },
    { type: 'course', title: 'AI/ML & Data Science', path: '/learning', icon: BookOpen, description: 'Machine learning and data science fundamentals' },
    
    // Features
    { type: 'feature', title: 'Study Buddy AI', path: '/chatbot', icon: MessageSquare, description: 'Get AI-powered help with your queries' },
    { type: 'feature', title: 'Resume Builder', path: '/resume', icon: FileText, description: 'Create ATS-friendly resumes' },
    { type: 'feature', title: 'Placement Preparation', path: '/placement', icon: Target, description: 'Interview prep and job opportunities' },
    { type: 'feature', title: 'Tech News Feed', path: '/news', icon: Newspaper, description: 'Latest tech news and updates' },
    
    // Topics
    { type: 'topic', title: 'Arrays and Strings', path: '/learning?topic=arrays', icon: BookOpen, description: 'Learn array manipulation and string algorithms' },
    { type: 'topic', title: 'Binary Trees', path: '/learning?topic=trees', icon: BookOpen, description: 'Tree data structures and traversals' },
    { type: 'topic', title: 'Dynamic Programming', path: '/learning?topic=dp', icon: BookOpen, description: 'Master DP concepts and patterns' },
    { type: 'topic', title: 'System Design', path: '/learning?topic=system-design', icon: BookOpen, description: 'Learn to design scalable systems' },
    { type: 'topic', title: 'React Hooks', path: '/learning?topic=react', icon: BookOpen, description: 'Modern React development patterns' },
    { type: 'topic', title: 'Node.js APIs', path: '/learning?topic=nodejs', icon: BookOpen, description: 'Backend development with Node.js' },
    
    // Tools
    { type: 'tool', title: 'Mock Interview', path: '/placement?tab=mock', icon: Target, description: 'Practice interviews with AI' },
    { type: 'tool', title: 'Code Practice', path: '/learning?practice=true', icon: BookOpen, description: 'Solve coding problems' },
    { type: 'tool', title: 'Progress Tracker', path: '/', icon: Target, description: 'Track your learning progress' },
    { type: 'tool', title: 'Daily Goals', path: '/', icon: Target, description: 'Set and achieve daily learning goals' }
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (query.trim()) {
      const filtered = searchableContent.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered.slice(0, 8));
      setSelectedIndex(-1);
    } else {
      setResults([]);
      setSelectedIndex(-1);
    }
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      } else if (query.trim()) {
        handleSearch(query);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleSelect = (item: any) => {
    addToRecentSearches(item.title);
    navigate(item.path);
    onClose();
    setQuery('');
  };

  const handleSearch = (searchQuery: string) => {
    addToRecentSearches(searchQuery);
    // Navigate to search results page or filter current page
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    onClose();
    setQuery('');
  };

  const addToRecentSearches = (search: string) => {
    const updated = [search, ...recentSearches.filter(s => s !== search)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course': return 'text-blue-500';
      case 'feature': return 'text-green-500';
      case 'topic': return 'text-purple-500';
      case 'tool': return 'text-orange-500';
      default: return 'text-gray-500';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'course': return 'Course';
      case 'feature': return 'Feature';
      case 'topic': return 'Topic';
      case 'tool': return 'Tool';
      default: return 'Result';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-start justify-center p-4 pt-16">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
        
        <div className={`relative w-full max-w-2xl ${state.darkMode ? 'bg-gray-900' : 'bg-white'} rounded-xl shadow-2xl`}>
          {/* Search Input */}
          <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search courses, features, topics..."
              className={`flex-1 bg-transparent text-lg outline-none ${
                state.darkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
              }`}
            />
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {query.trim() ? (
              results.length > 0 ? (
                <div className="p-2">
                  {results.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => handleSelect(item)}
                        className={`w-full p-3 rounded-lg text-left transition-colors ${
                          selectedIndex === index
                            ? 'bg-blue-50 dark:bg-blue-900/20'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className={`w-5 h-5 ${getTypeColor(item.type)}`} />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className={`font-medium ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {item.title}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                state.darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                              }`}>
                                {getTypeLabel(item.type)}
                              </span>
                            </div>
                            <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {item.description}
                            </p>
                          </div>
                          <ExternalLink className="w-4 h-4 text-gray-400" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className={`text-lg font-medium ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                    No results found
                  </p>
                  <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Try searching for courses, features, or topics
                  </p>
                </div>
              )
            ) : (
              <div className="p-4">
                {recentSearches.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className={`text-sm font-medium ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Recent Searches
                      </h3>
                      <button
                        onClick={clearRecentSearches}
                        className="text-xs text-blue-500 hover:text-blue-600"
                      >
                        Clear all
                      </button>
                    </div>
                    <div className="space-y-1">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setQuery(search);
                            handleSearch(search);
                          }}
                          className={`w-full p-2 rounded-lg text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800`}
                        >
                          <div className="flex items-center space-x-3">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className={`${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {search}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className={`text-sm font-medium mb-3 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Popular Searches
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {['Data Structures', 'React Hooks', 'System Design', 'Mock Interview', 'Resume Builder', 'AI/ML'].map((term, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setQuery(term);
                          handleSearch(term);
                        }}
                        className={`p-2 rounded-lg text-sm text-left transition-colors ${
                          state.darkMode
                            ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className={`p-3 border-t border-gray-200 dark:border-gray-700 ${
            state.darkMode ? 'bg-gray-800' : 'bg-gray-50'
          }`}>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-4">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>Esc Close</span>
              </div>
              <span>Powered by DevElevate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;