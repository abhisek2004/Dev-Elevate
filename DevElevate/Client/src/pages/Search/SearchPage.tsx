import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Filter, X, ExternalLink, ArrowLeft } from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';
import {
  searchableContent,
  filterSearchResults,
  highlightText,
  getTypeDisplayName,
  getTypeIcon,
  searchTypes,
  SearchType,
  SearchFilters,
  SearchItem
} from '../../utils/search';

const SearchPage: React.FC = () => {
  const { state } = useGlobalState();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState<SearchFilters>({ types: [] });
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showFilters, setShowFilters] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Filter results based on query and filters
  const filteredResults = filterSearchResults(searchableContent, query, filters);

  // Update URL when query changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) {
      params.set('q', query);
    }
    setSearchParams(params, { replace: true });
  }, [query, setSearchParams]);

  // Focus search input on mount
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [filteredResults]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target !== searchInputRef.current) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < filteredResults.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && filteredResults[selectedIndex]) {
            handleResultClick(filteredResults[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          navigate(-1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [filteredResults, selectedIndex, navigate]);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
  }, [selectedIndex]);

  const handleResultClick = (item: SearchItem) => {
    navigate(item.path);
  };

  const handleFilterToggle = (type: SearchType) => {
    setFilters(prev => ({
      types: prev.types.includes(type)
        ? prev.types.filter(t => t !== type)
        : [...prev.types, type]
    }));
  };

  const clearFilters = () => {
    setFilters({ types: [] });
  };

  const clearSearch = () => {
    setQuery('');
    searchInputRef.current?.focus();
  };

  return (
    <div className={`min-h-screen ${state.darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 ${state.darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate(-1)}
              className={`p-2 rounded-lg transition-colors ${
                state.darkMode 
                  ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className={`text-2xl font-bold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
              Search Results
            </h1>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              state.darkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for courses, features, topics, or tools..."
              className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-colors ${
                state.darkMode
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              aria-label="Search input"
            />
            {query && (
              <button
                onClick={clearSearch}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded transition-colors ${
                  state.darkMode 
                    ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                    : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                }`}
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                state.darkMode
                  ? 'border-gray-600 hover:bg-gray-800 text-gray-300'
                  : 'border-gray-300 hover:bg-gray-50 text-gray-700'
              }`}
              aria-expanded={showFilters}
              aria-label="Toggle filters"
            >
              <Filter className="w-4 h-4" />
              Filters
              {filters.types.length > 0 && (
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  {filters.types.length}
                </span>
              )}
            </button>

            {filters.types.length > 0 && (
              <button
                onClick={clearFilters}
                className={`text-sm ${
                  state.darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className={`mt-4 p-4 rounded-lg border ${
              state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <h3 className={`text-sm font-medium mb-3 ${
                state.darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Filter by type:
              </h3>
              <div className="flex flex-wrap gap-2">
                {searchTypes.map(type => {
                  const Icon = getTypeIcon(type);
                  const isSelected = filters.types.includes(type);
                  return (
                    <button
                      key={type}
                      onClick={() => handleFilterToggle(type)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                        isSelected
                          ? 'bg-blue-500 border-blue-500 text-white'
                          : state.darkMode
                          ? 'border-gray-600 hover:bg-gray-700 text-gray-300'
                          : 'border-gray-300 hover:bg-gray-100 text-gray-700'
                      }`}
                      aria-pressed={isSelected}
                    >
                      <Icon className="w-4 h-4" />
                      {getTypeDisplayName(type)}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {query && (
          <p className={`text-sm mb-6 ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} for "{query}"
          </p>
        )}

        <div ref={resultsRef} className="space-y-4">
          {filteredResults.length > 0 ? (
            filteredResults.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;
              
              return (
                <button
                  key={`${item.type}-${item.title}`}
                  onClick={() => handleResultClick(item)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    isSelected
                      ? state.darkMode
                        ? 'bg-gray-700 border-blue-500 ring-2 ring-blue-500/20'
                        : 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20'
                      : state.darkMode
                      ? 'bg-gray-800 border-gray-700 hover:bg-gray-750 hover:border-gray-600'
                      : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                  aria-label={`Navigate to ${item.title}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-lg ${
                        state.darkMode ? 'bg-gray-700' : 'bg-gray-100'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          state.darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 
                            className={`font-semibold ${
                              state.darkMode ? 'text-white' : 'text-gray-900'
                            }`}
                            dangerouslySetInnerHTML={{ 
                              __html: highlightText(item.title, query) 
                            }}
                          />
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            state.darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {getTypeDisplayName(item.type)}
                          </span>
                        </div>
                        <p 
                          className={`text-sm ${
                            state.darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}
                          dangerouslySetInnerHTML={{ 
                            __html: highlightText(item.description, query) 
                          }}
                        />
                      </div>
                    </div>
                    <ExternalLink className={`w-4 h-4 ml-2 flex-shrink-0 ${
                      state.darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                  </div>
                </button>
              );
            })
          ) : query ? (
            <div className="text-center py-12">
              <Search className={`w-12 h-12 mx-auto mb-4 ${
                state.darkMode ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <h3 className={`text-lg font-medium mb-2 ${
                state.darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                No results found
              </h3>
              <p className={`text-sm ${
                state.darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Try adjusting your search terms or filters
              </p>
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className={`w-12 h-12 mx-auto mb-4 ${
                state.darkMode ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <h3 className={`text-lg font-medium mb-2 ${
                state.darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Start searching
              </h3>
              <p className={`text-sm ${
                state.darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Enter a search term to find courses, features, topics, or tools
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;