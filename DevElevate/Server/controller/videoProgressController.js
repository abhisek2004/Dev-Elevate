// controller/videoProgressController.js
import VideoProgress from "../model/VideoProgress.js";
import SavedVideo from "../model/SavedVideo.js";

// @desc    Update or create video progress
// @route   POST /api/v1/video/progress
// @access  Private
export const updateVideoProgress = async (req, res) => {
  try {
    const { videoId, courseId, currentTime, duration } = req.body;
    const userId = req.user._id;

    if (!videoId || !courseId || currentTime === undefined || !duration) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: videoId, courseId, currentTime, duration",
      });
    }

    // Calculate progress percentage
    const progressPercentage = Math.min((currentTime / duration) * 100, 100);
    const isCompleted = progressPercentage >= 90;

    // Update or create progress
    const progress = await VideoProgress.findOneAndUpdate(
      { user: userId, videoId: videoId },
      {
        courseId,
        currentTime,
        duration,
        progressPercentage,
        isCompleted,
        lastWatchedAt: new Date(),
      },
      { upsert: true, new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Progress updated successfully",
      data: progress,
    });
  } catch (error) {
    console.error("Error updating video progress:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update video progress",
      error: error.message,
    });
  }
};

// @desc    Get user's progress for a specific video
// @route   GET /api/v1/video/progress/:videoId
// @access  Private
export const getVideoProgress = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user._id;

    const progress = await VideoProgress.findOne({
      user: userId,
      videoId: videoId,
    });

    if (!progress) {
      return res.status(200).json({
        success: true,
        data: null,
        message: "No progress found for this video",
      });
    }

    return res.status(200).json({
      success: true,
      data: progress,
    });
  } catch (error) {
    console.error("Error fetching video progress:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch video progress",
      error: error.message,
    });
  }
};

// @desc    Get all courses with continue learning data
// @route   GET /api/v1/video/continue-learning
// @access  Private
export const getContinueLearning = async (req, res) => {
  try {
    const userId = req.user._id;

    const inProgressVideos = await VideoProgress.find({
      user: userId,
      isCompleted: false,
      progressPercentage: { $gt: 0 },
    })
      .sort({ lastWatchedAt: -1 })
      .limit(10);

    return res.status(200).json({
      success: true,
      data: inProgressVideos,
    });
  } catch (error) {
    console.error("Error fetching continue learning:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch continue learning data",
      error: error.message,
    });
  }
};

// @desc    Get course progress summary
// @route   GET /api/v1/video/course-progress/:courseId
// @access  Private
export const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user._id;

    const progressData = await VideoProgress.find({
      user: userId,
      courseId: courseId,
    });

    const totalVideos = progressData.length;
    const completedVideos = progressData.filter(p => p.isCompleted).length;
    const overallProgress = totalVideos > 0 ? (completedVideos / totalVideos) * 100 : 0;

    return res.status(200).json({
      success: true,
      data: {
        courseId,
        totalVideos,
        completedVideos,
        overallProgress: Math.round(overallProgress),
        videoProgress: progressData,
      },
    });
  } catch (error) {
    console.error("Error fetching course progress:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch course progress",
      error: error.message,
    });
  }
};

// @desc    Save a video for later
// @route   POST /api/v1/video/saved
// @access  Private
export const saveVideo = async (req, res) => {
  try {
    const { videoId, courseId, videoTitle, courseName } = req.body;
    const userId = req.user._id;

    if (!videoId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Video ID and Course ID are required",
      });
    }

    // Check if already saved
    const existingSave = await SavedVideo.findOne({
      user: userId,
      videoId: videoId,
    });

    if (existingSave) {
      return res.status(400).json({
        success: false,
        message: "Video already saved",
      });
    }

    // Create new saved video
    const savedVideo = await SavedVideo.create({
      user: userId,
      videoId,
      courseId,
      videoTitle,
      courseName,
    });

    return res.status(201).json({
      success: true,
      message: "Video saved successfully",
      data: savedVideo,
    });
  } catch (error) {
    console.error("Error saving video:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to save video",
      error: error.message,
    });
  }
};

// @desc    Remove a saved video
// @route   DELETE /api/v1/video/saved/:videoId
// @access  Private
export const unsaveVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user._id;

    const result = await SavedVideo.findOneAndDelete({
      user: userId,
      videoId: videoId,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Saved video not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Video removed from saved list",
    });
  } catch (error) {
    console.error("Error removing saved video:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to remove saved video",
      error: error.message,
    });
  }
};

// @desc    Get all saved videos for user
// @route   GET /api/v1/video/saved
// @access  Private
export const getSavedVideos = async (req, res) => {
  try {
    const userId = req.user._id;

    const savedVideos = await SavedVideo.find({ user: userId })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: savedVideos,
    });
  } catch (error) {
    console.error("Error fetching saved videos:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch saved videos",
      error: error.message,
    });
  }
};

// @desc    Check if a video is saved
// @route   GET /api/v1/video/saved/check/:videoId
// @access  Private
export const checkIfVideoSaved = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user._id;

    const isSaved = await SavedVideo.exists({
      user: userId,
      videoId: videoId,
    });

    return res.status(200).json({
      success: true,
      isSaved: !!isSaved,
    });
  } catch (error) {
    console.error("Error checking if video is saved:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to check video save status",
      error: error.message,
    });
  }
};