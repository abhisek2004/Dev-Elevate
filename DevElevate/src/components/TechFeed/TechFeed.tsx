import React, { useState, useEffect } from 'react';
import { Calendar, ExternalLink, Filter, Search, Bookmark, BookmarkCheck } from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';
import { format } from 'date-fns';

const TechFeed: React.FC = () => {
  const { state, dispatch } = useGlobalState();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'tech' | 'jobs' | 'internships' | 'events'>('all');

  const categories = [
    { id: 'all', label: 'All Updates', count: state.newsItems.length },
    { id: 'tech', label: 'Tech News', count: state.newsItems.filter(item => item.category === 'tech').length },
    { id: 'jobs', label: 'Job Opportunities', count: state.newsItems.filter(item => item.category === 'jobs').length },
    { id: 'internships', label: 'Internships', count: state.newsItems.filter(item => item.category === 'internships').length },
    { id: 'events', label: 'Events', count: state.newsItems.filter(item => item.category === 'events').length }
  ];

  const sampleNewsItems = [
    {
      id: '1',
      title: 'React 18.3 Released with New Concurrent Features',
      summary: 'The latest React version brings improved performance with concurrent rendering and automatic batching capabilities.',
      url: '#',
      publishDate: new Date().toISOString(),
      category: 'tech' as const
    },
    {
      id: '2',
      title: 'Google Software Engineer Intern - Summer 2024',
      summary: 'Applications are now open for software engineering internships at Google. Deadline: March 15th.',
      url: '#',
      publishDate: new Date(Date.now() - 86400000).toISOString(),
      category: 'internships' as const
    },
    {
      id: '3',
      title: 'Microsoft Hiring 500+ AI Engineers',
      summary: 'Microsoft is expanding its AI division with opportunities for machine learning engineers and AI researchers.',
      url: '#',
      publishDate: new Date(Date.now() - 172800000).toISOString(),
      category: 'jobs' as const
    },
    {
      id: '4',
      title: 'DevFest 2024 - Global Developer Conference',
      summary: 'Join developers worldwide for the biggest tech conference of the year. Virtual and in-person options available.',
      url: '#',
      publishDate: new Date(Date.now() - 259200000).toISOString(),
      category: 'events' as const
    },
    {
      id: '5',
      title: 'OpenAI Introduces GPT-4 Turbo with Vision',
      summary: 'New multimodal capabilities allow GPT-4 to understand and generate content from images and text.',
      url: '#',
      publishDate: new Date(Date.now() - 345600000).toISOString(),
      category: 'tech' as const
    },
    {
      id: '6',
      title: 'Amazon SDE Positions - Multiple Locations',
      summary: 'Amazon is hiring software development engineers across Seattle, Austin, and remote positions.',
      url: '#',
      publishDate: new Date(Date.now() - 432000000).toISOString(),
      category: 'jobs' as const
    }
  ];

  useEffect(() => {
    if (state.newsItems.length === 0) {
      dispatch({ type: 'UPDATE_NEWS', payload: sampleNewsItems });
    }
  }, [state.newsItems.length, dispatch]);

  const filteredItems = state.newsItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'tech':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'jobs':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'internships':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
      case 'events':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const toggleBookmark = (itemId: string) => {
    if (state.bookmarks.includes(itemId)) {
      dispatch({ type: 'REMOVE_BOOKMARK', payload: itemId });
    } else {
      dispatch({ type: 'ADD_BOOKMARK', payload: itemId });
    }
  };

  return (
    <div className={`min-h-screen ${state.darkMode ? 'bg-gray-900' : 'bg-[#fefbf6]'} transition-colors duration-200`}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="mb-8">
      <h1 className={`text-3xl font-bold ${state.darkMode ? 'text-white' : 'text-[#2d2d2d]'} mb-2`}>
        Tech Feed & Career Updates
      </h1>
      <p className={`text-lg ${state.darkMode ? 'text-gray-300' : 'text-[#6b5e4f]'}`}>
        Stay updated with the latest in tech news, jobs, and opportunities
      </p>
    </div>

    {/* Search and Filter */}
    <div className="mb-8 flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search news and updates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
            state.darkMode
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
              : 'bg-[#fffdf9] border-[#e6dacb] text-[#2d2d2d] placeholder-[#a0896d]'
          } focus:outline-none focus:ring-2 focus:ring-[#c3a574]`}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Filter className="w-5 h-5 text-gray-400" />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as any)}
          className={`px-4 py-2 rounded-lg border ${
            state.darkMode
              ? 'bg-gray-800 border-gray-700 text-white'
              : 'bg-[#fffdf9] border-[#e6dacb] text-[#2d2d2d]'
          } focus:outline-none focus:ring-2 focus:ring-[#c3a574]`}
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.label} ({category.count})
            </option>
          ))}
        </select>
      </div>
    </div>

    {/* Category Tabs */}
    <div className="mb-8 flex flex-wrap gap-2">
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => setSelectedCategory(category.id as any)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedCategory === category.id
              ? 'bg-[#d2b48c] text-white'
              : state.darkMode
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'bg-[#fefaf1] text-[#5c4e3c] hover:bg-[#f3e5cd]'
          }`}
        >
          {category.label} ({category.count})
        </button>
      ))}
    </div>

    {/* News Items */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredItems.map(item => (
        <div
          key={item.id}
          className={`rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow ${
            state.darkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-[#fffdf9] border-[#e6dacb]'
          }`}
        >
          <div className="flex items-start justify-between mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              state.darkMode ? 'bg-gray-700 text-gray-300' : 'bg-[#f6e9d7] text-[#5b4c3a]'
            }`}>
              {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
            </span>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>{format(new Date(item.publishDate), 'MMM dd')}</span>
              </div>
              <button
                onClick={() => toggleBookmark(item.id)}
                className={`p-1 rounded-full transition-colors ${
                  state.bookmarks.includes(item.id)
                    ? 'text-yellow-500 hover:text-yellow-600'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {state.bookmarks.includes(item.id) ? (
                  <BookmarkCheck className="w-4 h-4" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <h3 className={`text-lg font-semibold mb-3 ${state.darkMode ? 'text-white' : 'text-[#2d2d2d]'}`}>
            {item.title}
          </h3>

          <p className={`text-sm mb-4 ${state.darkMode ? 'text-gray-400' : 'text-[#6b5e4f]'}`}>
            {item.summary}
          </p>

          <div className="flex items-center justify-between">
            <button className="flex items-center space-x-2 text-[#b78e5c] hover:text-[#a5783e] font-medium">
              <span>Read More</span>
              <ExternalLink className="w-4 h-4" />
            </button>
            <div className="flex items-center space-x-2">
              <button className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                state.darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-[#f3e5cd] text-[#5c4e3c] hover:bg-[#e9d5ba]'
              }`}>
                Share
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

    {filteredItems.length === 0 && (
      <div className="text-center py-12">
        <Search className={`w-12 h-12 mx-auto mb-4 ${state.darkMode ? 'text-gray-400' : 'text-[#b4a99a]'}`} />
        <h3 className={`text-lg font-medium mb-2 ${state.darkMode ? 'text-white' : 'text-[#2d2d2d]'}`}>
          No items found
        </h3>
        <p className={`${state.darkMode ? 'text-gray-400' : 'text-[#6b5e4f]'}`}>
          Try adjusting your search terms or filters.
        </p>
      </div>
    )}
  </div>
</div>

  );
};

export default TechFeed;