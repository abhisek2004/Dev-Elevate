import React, { useEffect, useState } from 'react';
import {
  ExternalLink,
  Calendar,
  ArrowRight,
  List,
  LayoutGrid,
  Loader2,
} from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const NewsWidget: React.FC = () => {
  const { state } = useGlobalState();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const API_KEY =`5197b7b314d04c1080a2092f0496c165` ;
  const NEWS_API = `https://newsapi.org/v2/top-headlines?sources=bbc-news&pageSize=9&apiKey=${API_KEY}
`;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(NEWS_API);
        const data = await res.json();
        if (data.status === 'ok') {
          setArticles(data.articles);
        }
      } catch (err) {
        console.error('Failed to fetch news', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const getCategoryColor = () => {
    return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
  };

  const handleClick = () => {
    navigate('/news');
  };
  console.log(articles);
  

  return (
    <div
      className={`${
        state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } rounded-xl p-6 border shadow-sm transition-colors duration-200`}
    >
      <div className="flex items-center justify-between mb-6">
        <h3
          className={`text-2xl font-semibold tracking-tight ${
            state.darkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Tech News Feed
        </h3>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('list')}
            className={`p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${
              viewMode === 'list' ? 'bg-gray-300 dark:bg-gray-700' : ''
            }`}
          >
            <List className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('card')}
            className={`p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${
              viewMode === 'card' ? 'bg-gray-300 dark:bg-gray-700' : ''
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button
            className="flex items-center gap-1 text-blue-500 hover:text-blue-600 text-sm font-medium"
            onClick={handleClick}
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin w-6 h-6 text-blue-500" />
        </div>
      ) : (
        <div
          className={
            viewMode === 'card'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
              : 'space-y-4'
          }
        >
          {articles.map((item, index) => (
            <div
              key={item.url ?? index}
              className={`border rounded-lg overflow-hidden bg-white dark:bg-gray-900 ${
                viewMode === 'card'
                  ? 'hover:shadow-md transition duration-300'
                  : 'flex items-start gap-4 p-3'
              }`}
            >
              {item.urlToImage && (
                <img
                  src={item.urlToImage}
                  alt="thumbnail"
                  className={`${
                    viewMode === 'card'
                      ? 'w-full h-28 object-cover'
                      : 'w-28 h-20 rounded-md object-cover'
                  }`}
                />
              )}

              <div className={`${viewMode === 'card' ? 'p-4' : 'flex-1'}`}>
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-semibold ${getCategoryColor()}`}
                  >
                    Tech
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {item.publishedAt
                        ? format(new Date(item.publishedAt), 'MMM dd')
                        : ''}
                    </span>
                  </div>
                </div>
                <h4
                  className={`text-sm font-semibold mb-1 ${
                    state.darkMode ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {item.title}
                </h4>
                <p
                  className={`text-xs ${
                    state.darkMode ? 'text-gray-400' : 'text-gray-600'
                  } mb-2`}
                >
                  {item.description?.slice(0, 100)}...
                </p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-500 hover:text-blue-600 text-xs font-medium"
                >
                  <span>Read More</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsWidget;
