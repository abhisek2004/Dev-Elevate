import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, BookOpen, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { codingApi, type Problem } from '../../../api/codingApi';

const ProblemsPage: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
  const categories = ['All', 'Array', 'Math', 'Dynamic Programming', 'String', 'Tree', 'Graph'];

  // Fetch problems from backend
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);
        const params: any = { page: currentPage, limit: 20 };

        if (selectedDifficulty !== 'All') {
          params.difficulty = selectedDifficulty;
        }
        if (selectedCategory !== 'All') {
          params.category = selectedCategory;
        }

        const response = await codingApi.getProblems(params);
        setProblems(response.problems);
        setTotalPages(response.pagination.pages);
      } catch (error) {
        console.error('Error fetching problems:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, [currentPage, selectedDifficulty, selectedCategory]);

  const filteredProblems = useMemo(() => {
    return problems.filter(problem => {
      const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        problem.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesSearch;
    });
  }, [problems, searchTerm]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'Hard': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusIcon = (problemId: string) => {
    // TODO: In real app, this would come from user submission data
    // For now, return empty div
    return <div className="w-5 h-5" />;
  };

  return (
    <div className="py-8 min-h-screen bg-gray-900">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="mb-2 text-3xl font-bold text-white">Problems</h1>
          <p className="text-gray-400">Solve problems and improve your coding skills</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 mb-8 bg-gray-800 rounded-lg border border-gray-700"
        >
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 w-5 h-5 text-gray-400 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search problems by title or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="py-3 pr-4 pl-10 w-full placeholder-gray-400 text-white bg-gray-700 rounded-lg border border-gray-600 transition-colors focus:border-electric-400 focus:outline-none"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-3 space-x-2 text-gray-300 bg-gray-700 rounded-lg border border-gray-600 transition-colors hover:text-white hover:border-gray-500"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-4 mt-4 border-t border-gray-700"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    Difficulty
                  </label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="px-3 py-2 w-full text-white bg-gray-700 rounded-lg border border-gray-600 focus:border-electric-400 focus:outline-none"
                  >
                    {difficulties.map((difficulty) => (
                      <option key={difficulty} value={difficulty}>
                        {difficulty}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 w-full text-white bg-gray-700 rounded-lg border border-gray-600 focus:border-electric-400 focus:outline-none"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Problems List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="overflow-hidden bg-gray-800 rounded-lg border border-gray-700">
            {/* Header */}
            <div className="px-6 py-4 bg-gray-900 border-b border-gray-700">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
                <div className="col-span-1">Status</div>
                <div className="col-span-5">Title</div>
                <div className="col-span-2">Difficulty</div>
                <div className="col-span-2">Acceptance</div>
                <div className="col-span-2">Category</div>
              </div>
            </div>

            {/* Problems */}
            <div className="divide-y divide-gray-700">
              {loading ? (
                <div className="py-12 text-center">
                  <Loader2 className="mx-auto mb-4 w-8 h-8 text-electric-400 animate-spin" />
                  <p className="text-gray-400">Loading problems...</p>
                </div>
              ) : filteredProblems.length === 0 ? (
                <div className="py-12 text-center">
                  <BookOpen className="mx-auto mb-4 w-16 h-16 text-gray-600" />
                  <h3 className="mb-2 text-xl font-semibold text-white">No Problems Found</h3>
                  <p className="text-gray-400">Try adjusting your search or filter criteria.</p>
                </div>
              ) : (
                filteredProblems.map((problem, index) => (
                  <motion.div
                    key={problem._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="transition-colors hover:bg-gray-750"
                  >
                    <Link
                      to={`/coding/problems/${problem._id}`}
                      className="block px-6 py-4"
                    >
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-1">
                          {getStatusIcon(problem._id)}
                        </div>

                        <div className="col-span-5">
                          <h3 className="font-medium text-white transition-colors hover:text-electric-400">
                            {problem.title}
                          </h3>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {problem.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="px-2 py-1 text-xs rounded bg-electric-400/20 text-electric-400"
                              >
                                {tag}
                              </span>
                            ))}
                            {problem.tags.length > 3 && (
                              <span className="px-2 py-1 text-xs text-gray-300 bg-gray-600 rounded">
                                +{problem.tags.length - 3}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="col-span-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                            {problem.difficulty}
                          </span>
                        </div>

                        <div className="col-span-2">
                          <div className="font-medium text-white">{problem.acceptance}%</div>
                          <div className="text-xs text-gray-400">{problem.submissions.toLocaleString()} submissions</div>
                        </div>

                        <div className="col-span-2">
                          <span className="text-gray-300">{problem.category}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3"
        >
          <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold text-white">{problems.filter(p => p.difficulty === 'Easy').length}</div>
                <div className="text-green-400">Easy Problems</div>
              </div>
              <div className="flex justify-center items-center w-12 h-12 rounded-lg bg-green-400/20">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold text-white">{problems.filter(p => p.difficulty === 'Medium').length}</div>
                <div className="text-yellow-400">Medium Problems</div>
              </div>
              <div className="flex justify-center items-center w-12 h-12 rounded-lg bg-yellow-400/20">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold text-white">{problems.filter(p => p.difficulty === 'Hard').length}</div>
                <div className="text-red-400">Hard Problems</div>
              </div>
              <div className="flex justify-center items-center w-12 h-12 rounded-lg bg-red-400/20">
                <XCircle className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProblemsPage;