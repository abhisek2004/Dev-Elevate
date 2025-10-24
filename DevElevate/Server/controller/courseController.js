import Course from "../model/Course.js";
import LearningModule from "../model/LearningModule.js";
import { createNotification } from "./notificationController.js";
import { fetchYouTubeVideos, fetchVideosByCategory } from '../utils/youtubeService.js';
/**
 * ===========================
 *   Course Controller
 * ===========================
 */

// Create a new course
export const createCourse = async (req, res) => {
  try {
    const { courseTitle, description, tags } = req.body;

    if (!courseTitle || !description || !tags) {
      return res
        .status(400)
        .json({ message: "Course title, description, and tags are required." });
    }

    const course = await Course.create({
      courseTitle,
      description,
      tags,
      createdBy: req.id,
    });

    // Notify user about course creation
    await createNotification(
      req.id,
      `Course '${courseTitle}' created successfully!`,
      "milestone"
    );

    return res
      .status(201)
      .json({ course, message: "Course created successfully." });
  } catch (error) {
    console.error("Course creation failed:", error);
    return res.status(500).json({ message: "Failed to create course" });
  }
};

// Edit an existing course and optionally its module
export const editCourse = async (req, res) => {
  try {
    const { courseId, moduleId } = req.params;
    const {
      courseTitle,
      subTitle,
      description,
      dificulty,
      coursePrice,
      courseThumbnail,
      moduleTitle,
      videoUrl,
      resourceLinks,
      duration,
    } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        courseTitle,
        subTitle,
        description,
        dificulty,
        coursePrice,
        courseThumbnail,
      },
      { new: true }
    );

    let updatedModule = null;
    if (moduleId) {
      updatedModule = await LearningModule.findByIdAndUpdate(
        moduleId,
        { moduleTitle, videoUrl, resourceLinks, duration },
        { new: true }
      );
    }

    return res.status(200).json({
      course: updatedCourse,
      module: updatedModule,
      message: "Course updated successfully.",
    });
  } catch (error) {
    console.error("Course update failed:", error);
    return res.status(500).json({ message: "Failed to update course" });
  }
};

// Get all courses
export const getAllCourses = async (_req, res) => {
  try {
    const courses = await Course.find()
      .populate("modules")
      .populate("createdBy");
    return res
      .status(200)
      .json({ courses, message: "All courses fetched successfully." });
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return res
      .status(500)
      .json({ message: "Internal server error while fetching courses" });
  }
};

// Delete a course and its associated modules
export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await LearningModule.deleteMany({ _id: { $in: course.modules } });
    await Course.findByIdAndDelete(courseId);

    return res
      .status(200)
      .json({ message: "Course and its modules deleted successfully." });
  } catch (error) {
    console.error("Course deletion failed:", error);
    return res.status(500).json({ message: "Failed to delete course" });
  }
};


/**
 * Get YouTube courses for users (with fallback)
 */
export const getYouTubeCourses = async (req, res) => {
  try {
    const { search, category, maxResults = 12 } = req.query;

    console.log('🎥 Fetching YouTube courses:', { search, category, maxResults });

    let videos;

    try {
      if (category && category !== 'All') {
        videos = await fetchVideosByCategory(category, parseInt(maxResults));
      } else if (search) {
        videos = await fetchYouTubeVideos(search, parseInt(maxResults));
      } else {
        // Default: fetch popular programming tutorials
        videos = await fetchYouTubeVideos('programming tutorial', parseInt(maxResults));
      }
    } catch (youtubeError) {
      console.error('⚠️ YouTube API failed, using mock data:', youtubeError.message);
      // Fallback to mock data
      videos = getMockCourses();
    }

    console.log('✅ YouTube courses fetched:', videos.length);

    return res.status(200).json({
      success: true,
      data: videos,
      message: 'YouTube courses fetched successfully',
    });
  } catch (error) {
    console.error('❌ Failed to fetch YouTube courses:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch YouTube courses',
      error: error.message,
    });
  }
};