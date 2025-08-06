import Course from "../model/Course.js";
import LearningModule from "../model/LearningModule.js";

export const createCourse = async (req, res) => {
  try {
    const { courseTitle, description, tags } = req.body;

    if (!courseTitle || !description || !tags) {
      return res.status(400).json({
        message:
          "Missing required fields: 'courseTitle', 'description', and 'tags'.",
      });
    }

    const course = await Course.create({
      courseTitle,
      description,
      tags,
      createdBy: req.id,
    });

    return res.status(201).json({
      course,
      message: "Course created successfully.",
    });
  } catch (error) {
    console.error(`[CreateCourse Error] ${error.message}`);
    return res.status(500).json({
      message: "Failed to create course. Please try again.",
      error: error.message,
    });
  }
};

export const editCourse = async (req, res) => {
  try {
    const { courseId, moduleId } = req.params;
    const {
      courseTitle,
      subTitle,
      description,
      difficulty,
      coursePrice,
      courseThumbnail,
      moduleTitle,
      videoUrl,
      resourceLinks,
      duration,
    } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found. Please check the course ID.",
      });
    }

    const updatedCourseData = {
      courseTitle,
      subTitle,
      description,
      difficulty,
      coursePrice,
      courseThumbnail,
    };

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      updatedCourseData,
      {
        new: true,
      }
    );

    let updatedModule = null;
    if (moduleId) {
      const moduleData = {
        moduleTitle,
        videoUrl,
        resourceLinks,
        duration,
      };
      updatedModule = await LearningModule.findByIdAndUpdate(
        moduleId,
        moduleData,
        {
          new: true,
        }
      );
    }

    return res.status(200).json({
      course: updatedCourse,
      module: updatedModule,
      message: "Course updated successfully.",
    });
  } catch (error) {
    console.error(`[EditCourse Error] ${error.message}`);
    return res.status(500).json({
      message: "Failed to update course. Please try again.",
      error: error.message,
    });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("modules")
      .populate("createdBy");

    return res.status(200).json({
      courses,
      message: "All courses fetched successfully.",
    });
  } catch (error) {
    console.error(`[GetAllCourses Error] ${error.message}`);
    return res.status(500).json({
      message: "Internal server error while fetching courses.",
      error: error.message,
    });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found. Please verify the course ID.",
      });
    }

    await LearningModule.deleteMany({ _id: { $in: course.modules } });
    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      message: "Course and its modules deleted successfully.",
    });
  } catch (error) {
    console.error(`[DeleteCourse Error] ${error.message}`);
    return res.status(500).json({
      message: "Failed to delete course. Please try again.",
      error: error.message,
    });
  }
};
