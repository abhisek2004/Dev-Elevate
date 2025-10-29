import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

/**
 * Fetch programming/educational videos from YouTube
 * @param {string} searchQuery - Search term (e.g., "web development tutorial")
 * @param {number} maxResults - Number of videos to fetch (default: 12)
 * @param {string} order - Sort order: relevance, date, rating, viewCount
 * @returns {Promise<Array>} - Array of formatted video data
 */
export const fetchYouTubeVideos = async (
  searchQuery = 'programming tutorial',
  maxResults = 12,
  order = 'relevance'
) => {
  try {
    
    if (!YOUTUBE_API_KEY) {
      throw new Error('YouTube API key is not configured. Please set YOUTUBE_API_KEY in .env file');
    }
    
    // Step 1: Search for videos
    const searchResponse = await axios.get(`${YOUTUBE_API_BASE_URL}/search`, {
      params: {
        key: YOUTUBE_API_KEY,
        part: 'snippet',
        q: searchQuery,
        type: 'video',
        maxResults: maxResults,
        order: order,
        videoDuration: 'long', // Only long videos (>20 min) - suitable for courses
        videoDefinition: 'high',
        relevanceLanguage: 'en',
      },
    });


    if (!searchResponse.data.items || searchResponse.data.items.length === 0) {
      return [];
    }

    const videoIds = searchResponse.data.items
      .map((item) => item.id?.videoId)
      .filter(Boolean) // Remove null/undefined values
      .join(',');


    if (!videoIds) {
      return [];
    }

    // Step 2: Get detailed video information (duration, stats)
    const videosResponse = await axios.get(`${YOUTUBE_API_BASE_URL}/videos`, {
      params: {
        key: YOUTUBE_API_KEY,
        part: 'snippet,contentDetails,statistics',
        id: videoIds,
      },
    });

    if (!videosResponse.data.items || videosResponse.data.items.length === 0) {
      return [];
    }

    // Step 3: Get channel information for each video
    const channelIds = videosResponse.data.items
      .map((item) => item.snippet?.channelId)
      .filter(Boolean) // Remove null/undefined values
      .join(',');

    const channelMap = {};

    if (channelIds) {
      const channelsResponse = await axios.get(`${YOUTUBE_API_BASE_URL}/channels`, {
        params: {
          key: YOUTUBE_API_KEY,
          part: 'snippet',
          id: channelIds,
        },
      });

      // Create a map of channel data
      if (channelsResponse.data.items) {
        channelsResponse.data.items.forEach((channel) => {
          if (channel.id && channel.snippet) {
            channelMap[channel.id] = {
              title: channel.snippet.title || 'Unknown Creator',
              thumbnail: channel.snippet.thumbnails?.default?.url || 
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${channel.id}`,
            };
          }
        });
      }
    }

    // Step 4: Format the data with proper null checks
    const formattedVideos = videosResponse.data.items
      .filter((video) => video && video.id && video.snippet) // Filter out invalid videos
      .map((video) => {
        try {
          const channelInfo = channelMap[video.snippet.channelId] || {
            title: video.snippet.channelTitle || 'Unknown Creator',
            thumbnail: `https://api.dicebear.com/7.x/avataaars/svg?seed=${video.snippet.channelId || 'default'}`,
          };

          return {
            videoId: video.id,
            courseId: video.id, // Using videoId as courseId
            title: video.snippet.title || 'Untitled Course',
            creator: channelInfo.title,
            courseImage: video.snippet.thumbnails?.high?.url || 
                        video.snippet.thumbnails?.medium?.url || 
                        video.snippet.thumbnails?.default?.url ||
                        'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80',
            creatorImage: channelInfo.thumbnail,
            link: `https://www.youtube.com/watch?v=${video.id}`,
            description: video.snippet.description 
              ? video.snippet.description.substring(0, 200) + '...'
              : 'No description available.',
            category: categorizeVideo(
              video.snippet.title || '', 
              video.snippet.description || ''
            ),
            duration: video.contentDetails?.duration 
              ? formatDuration(video.contentDetails.duration)
              : 'N/A',
            students: Math.floor(parseInt(video.statistics?.viewCount || 0) / 100), // Simulated enrollment
            rating: calculateRating(video.statistics || {}),
            progress: 0,
          };
        } catch (error) {
          console.error('❌ Error formatting video:', error.message, 'Video ID:', video.id);
          return null;
        }
      })
      .filter(Boolean); // Remove any null entries from failed formatting

    return formattedVideos;
  } catch (error) {
    console.error('❌ YouTube API Error Details:');
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Response status:', error.response?.status);
    console.error('Response data:', JSON.stringify(error.response?.data, null, 2));
    console.error('Request URL:', error.config?.url);
    console.error('Request params:', error.config?.params);
    
    // More specific error messages
    if (error.response?.status === 403) {
      throw new Error('YouTube API key is invalid or quota exceeded. Please check your API key.');
    }
    if (error.response?.status === 400) {
      throw new Error('Invalid request to YouTube API: ' + (error.response?.data?.error?.message || error.message));
    }
    if (error.code === 'ERR_BAD_RESPONSE') {
      throw new Error('Received malformed response from YouTube API. The API might be temporarily unavailable.');
    }
    
    throw new Error('Failed to fetch YouTube videos: ' + error.message);
  }
};

/**
 * Convert ISO 8601 duration to readable format
 * @param {string} isoDuration - e.g., "PT1H23M45S"
 * @returns {string} - e.g., "1h 23m"
 */
const formatDuration = (isoDuration) => {
  try {
    const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 'N/A';
    
    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  } catch (error) {
    console.error('Error formatting duration:', error);
    return 'N/A';
  }
};

/**
 * Categorize video based on title and description
 * @param {string} title
 * @param {string} description
 * @returns {string}
 */
const categorizeVideo = (title, description) => {
  const content = (title + ' ' + description).toLowerCase();

  if (content.includes('react') || content.includes('vue') || content.includes('angular')) {
    return 'Frontend';
  }
  if (content.includes('node') || content.includes('express') || content.includes('backend')) {
    return 'Backend';
  }
  if (content.includes('web dev') || content.includes('html') || content.includes('css')) {
    return 'Web Development';
  }
  if (content.includes('python') || content.includes('java') || content.includes('javascript')) {
    return 'Programming';
  }
  if (content.includes('algorithm') || content.includes('data structure') || content.includes('dsa')) {
    return 'Algorithms';
  }
  if (content.includes('ui') || content.includes('ux') || content.includes('design')) {
    return 'Design';
  }

  return 'Programming'; // Default category
};

/**
 * Calculate rating based on video statistics
 * @param {object} statistics
 * @returns {number}
 */
const calculateRating = (statistics) => {
  try {
    const likes = parseInt(statistics.likeCount || 0);
    const views = parseInt(statistics.viewCount || 1);
    const ratio = likes / views;

    // Generate rating based on like ratio
    if (ratio > 0.05) return 4.9;
    if (ratio > 0.03) return 4.8;
    if (ratio > 0.02) return 4.7;
    if (ratio > 0.01) return 4.6;
    return 4.5;
  } catch (error) {
    console.error('Error calculating rating:', error);
    return 4.5;
  }
};

/**
 * Fetch videos by specific category
 */
export const fetchVideosByCategory = async (category, maxResults = 12) => {
  const categoryQueries = {
    'Web Development': 'web development course tutorial',
    'Frontend': 'react vue angular frontend tutorial',
    'Backend': 'node express backend tutorial',
    'Programming': 'programming tutorial course',
    'Algorithms': 'data structures algorithms tutorial',
    'Design': 'ui ux design tutorial',
  };

  const query = categoryQueries[category] || 'programming tutorial';
  return fetchYouTubeVideos(query, maxResults);
};

/**
 * Get fallback mock data if YouTube API fails
 */
export const getMockCourses = () => {
  return [
    {
      videoId: "dGcsHMXbSOA",
      courseId: "dGcsHMXbSOA",
      title: "Complete Web Development Course",
      creator: "CodeWithHarry",
      courseImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80",
      creatorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Harry",
      link: "https://www.youtube.com/watch?v=dGcsHMXbSOA",
      description: "Learn web development from scratch. Perfect for beginners starting their coding journey.",
      category: "Web Development",
      duration: "12h 30m",
      students: 45000,
      rating: 4.8,
      progress: 0
    },
    {
      videoId: "rfscVS0vtbw",
      courseId: "rfscVS0vtbw",
      title: "Python Full Course for Beginners",
      creator: "Programming with Mosh",
      courseImage: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80",
      creatorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mosh",
      link: "https://www.youtube.com/watch?v=rfscVS0vtbw",
      description: "Learn Python programming from scratch to advanced level with real-world projects.",
      category: "Programming",
      duration: "6h 14m",
      students: 460728,
      rating: 4.9,
      progress: 0
    },
    {
      videoId: "_uQrJ0TkZlc",
      courseId: "_uQrJ0TkZlc",
      title: "Python Tutorial - Python for Beginners",
      creator: "Programming with Mosh",
      courseImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80",
      creatorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mosh2",
      link: "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
      description: "Master Python programming concepts essential for coding and development.",
      category: "Programming",
      duration: "1h 0m",
      students: 229610,
      rating: 4.7,
      progress: 0
    }
  ];
};