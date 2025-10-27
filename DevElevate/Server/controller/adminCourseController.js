import AdminCourse from "../model/AdminCourse.js";
import axios from 'axios';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

/**
 * ===========================
 *   Admin Course Controller
 * ===========================
 */

// Create a new admin course
export const createAdminCourse = async (req, res) => {
  try {
    const {
      category,
      type,
      videoId,
      title,
      creator,
      courseImage,
      creatorImage,
      link,
      description,
      duration,
      students,
      rating
    } = req.body;

    // Validate required fields
    if (!category || !type || !videoId || !title || !creator || !courseImage || !creatorImage || !link || !description) {
      return res.status(400).json({ 
        success: false,
        message: "All required fields must be provided." 
      });
    }

    // Check if course with this videoId already exists
    const existingCourse = await AdminCourse.findOne({ videoId });
    if (existingCourse) {
      return res.status(409).json({ 
        success: false,
        message: "A course with this video ID already exists." 
      });
    }

    // Create new admin course
    const adminCourse = await AdminCourse.create({
      category,
      type,
      videoId,
      title,
      creator,
      courseImage,
      creatorImage,
      link,
      description,
      duration: duration || "0h 0m",
      students: students || 0,
      rating: rating || 4.5,
      uploadedBy: req.user?._id || null, // ✅ Optional - only if user is authenticated
      isActive: true
    });

    console.log('✅ Admin course created:', adminCourse._id);

    return res.status(201).json({ 
      success: true,
      data: adminCourse,
      message: "Course created successfully!" 
    });
  } catch (error) {
    console.error("❌ Admin course creation failed:", error);
    return res.status(500).json({ 
      success: false,
      message: "Failed to create course",
      error: error.message 
    });
  }
};

// Get all admin courses (for users)
export const getAllAdminCourses = async (req, res) => {
  try {
    const { search, category } = req.query;

    let query = { isActive: true };

    // Add search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { creator: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Add category filter
    if (category && category !== 'All') {
      query.category = category;
    }

    // ✅ REMOVED .populate() to avoid Admin model error
    const courses = await AdminCourse.find(query)
      .sort({ createdAt: -1 })
      .lean(); // Use lean() for better performance

    console.log('📚 Fetched', courses.length, 'admin courses');

    return res.status(200).json({ 
      success: true,
      data: courses,
      message: "Admin courses fetched successfully." 
    });
  } catch (error) {
    console.error("❌ Failed to fetch admin courses:", error);
    return res.status(500).json({ 
      success: false,
      message: "Failed to fetch courses",
      error: error.message 
    });
  }
};

// Get single admin course
export const getAdminCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    // ✅ REMOVED .populate() to avoid Admin model error
    const course = await AdminCourse.findById(courseId).lean();

    if (!course) {
      return res.status(404).json({ 
        success: false,
        message: "Course not found" 
      });
    }

    return res.status(200).json({ 
      success: true,
      data: course,
      message: "Course fetched successfully." 
    });
  } catch (error) {
    console.error("❌ Failed to fetch course:", error);
    return res.status(500).json({ 
      success: false,
      message: "Failed to fetch course",
      error: error.message 
    });
  }
};

// Update admin course
export const updateAdminCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const updates = req.body;

    const course = await AdminCourse.findById(courseId);
    if (!course) {
      return res.status(404).json({ 
        success: false,
        message: "Course not found" 
      });
    }

    const updatedCourse = await AdminCourse.findByIdAndUpdate(
      courseId,
      updates,
      { new: true, runValidators: true }
    ).lean();

    console.log('✅ Admin course updated:', courseId);

    return res.status(200).json({ 
      success: true,
      data: updatedCourse,
      message: "Course updated successfully." 
    });
  } catch (error) {
    console.error("❌ Admin course update failed:", error);
    return res.status(500).json({ 
      success: false,
      message: "Failed to update course",
      error: error.message 
    });
  }
};

// Delete admin course
export const deleteAdminCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await AdminCourse.findById(courseId);
    if (!course) {
      return res.status(404).json({ 
        success: false,
        message: "Course not found" 
      });
    }

    // ✅ HARD DELETE - Actually remove from database
    await AdminCourse.findByIdAndDelete(courseId);

    console.log('🗑️ Admin course permanently deleted:', courseId);

    return res.status(200).json({ 
      success: true,
      message: "Course deleted successfully." 
    });
  } catch (error) {
    console.error("❌ Admin course deletion failed:", error);
    return res.status(500).json({ 
      success: false,
      message: "Failed to delete course",
      error: error.message 
    });
  }
};

// ✅ FIXED: Fetch YouTube video details and auto-populate
export const fetchYouTubeDetails = async (req, res) => {
  try {
    const { videoId, category, type } = req.body;

    if (!videoId || !category || !type) {
      return res.status(400).json({ 
        success: false,
        message: "Video ID, category, and type are required." 
      });
    }

    console.log('🎥 Fetching YouTube details for:', videoId);

    if (!YOUTUBE_API_KEY) {
      return res.status(500).json({ 
        success: false,
        message: "YouTube API key not configured" 
      });
    }

    // Extract video ID from URL if full URL is provided
    let cleanVideoId = videoId;
    if (videoId.includes('youtube.com') || videoId.includes('youtu.be')) {
      const urlMatch = videoId.match(/(?:v=|youtu\.be\/)([^&\?]+)/);
      if (urlMatch && urlMatch[1]) {
        cleanVideoId = urlMatch[1];
      }
    }

    // Fetch video details from YouTube API
    const videoResponse = await axios.get(`${YOUTUBE_API_BASE_URL}/videos`, {
      params: {
        key: YOUTUBE_API_KEY,
        part: 'snippet,contentDetails,statistics',
        id: cleanVideoId,
      },
    });

    if (!videoResponse.data.items || videoResponse.data.items.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: "Video not found on YouTube" 
      });
    }

    const video = videoResponse.data.items[0];

    // Fetch channel information
    const channelResponse = await axios.get(`${YOUTUBE_API_BASE_URL}/channels`, {
      params: {
        key: YOUTUBE_API_KEY,
        part: 'snippet',
        id: video.snippet.channelId,
      },
    });

    const channelThumbnail = channelResponse.data.items?.[0]?.snippet?.thumbnails?.default?.url || 
                            `https://api.dicebear.com/7.x/avataaars/svg?seed=${video.snippet.channelId}`;

    // Format duration
    const formatDuration = (isoDuration) => {
      const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
      if (!match) return 'N/A';
      
      const hours = match[1] ? parseInt(match[1]) : 0;
      const minutes = match[2] ? parseInt(match[2]) : 0;

      if (hours > 0) {
        return `${hours}h ${minutes}m`;
      }
      return `${minutes}m`;
    };

    // Format the response
    const formattedData = {
      videoId: cleanVideoId,
      title: video.snippet.title,
      creator: video.snippet.channelTitle,
      courseImage: video.snippet.thumbnails?.high?.url || 
                   video.snippet.thumbnails?.medium?.url || 
                   video.snippet.thumbnails?.default?.url,
      creatorImage: channelThumbnail,
      link: `https://www.youtube.com/watch?v=${cleanVideoId}`,
      description: video.snippet.description?.substring(0, 300) || 'No description available',
      duration: formatDuration(video.contentDetails.duration),
      students: Math.floor(parseInt(video.statistics?.viewCount || 0) / 100),
      rating: 4.5,
      category,
      type
    };

    console.log('✅ YouTube details fetched successfully');

    return res.status(200).json({ 
      success: true,
      data: formattedData,
      message: "YouTube details fetched successfully!" 
    });
  } catch (error) {
    console.error("❌ Failed to fetch YouTube details:", error);
    return res.status(500).json({ 
      success: false,
      message: "Failed to fetch YouTube details",
      error: error.message 
    });
  }
};

// Get admin course statistics
export const getAdminCourseStats = async (req, res) => {
  try {
    const totalCourses = await AdminCourse.countDocuments({ isActive: true });
    
    const categoryCounts = await AdminCourse.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    const stats = {
      totalCourses,
      categories: categoryCounts.length,
      categoryCounts
    };

    return res.status(200).json({ 
      success: true,
      data: stats,
      message: "Statistics fetched successfully." 
    });
  } catch (error) {
    console.error("❌ Failed to fetch statistics:", error);
    return res.status(500).json({ 
      success: false,
      message: "Failed to fetch statistics",
      error: error.message 
    });
  }
};