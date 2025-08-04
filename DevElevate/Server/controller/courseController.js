import Course from "../model/Course.js";
import LearningModule from "../model/LearningModule.js";

// CREATE NEW COURSE
export const createCourse = async (req, res) => {
  try {
    const { courseTitle, description, tags } = req.body;

    // VALIDATE REQUIRED FIELDS
    if (!courseTitle || !description || !tags) {
      return res.status(400).json({
        message: "Course title and category are required.",
      });
    }

    const course = await Course.create({
      courseTitle,
      description,
      tags,
      createdBy: req.id,
    });

    console.log("Course created successfully");
    return res.status(201).json({
      course,
      message: "Course created.",
    });
  } catch (error) {
    console.error("Error creating course:", error);
    return res.status(500).json({
      message: "failed to create course",
    });
  }
};

// EDIT COURSE AND OPTIONALLY A MODULE
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

    let course = await Course.findById(courseId);

    // CHECK IF COURSE EXISTS
    if (!course) {
      return res.status(404).json({
        message: "Course not found!",
      });
    }

    const updatedCourseData = {
      courseTitle,
      subTitle,
      description,
      dificulty,
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

    console.log("Course updated successfully");

    return res.status(200).json({
      course: updatedCourse,
      module: updatedModule,
      message: "Course updated successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to update course",
    });
  }
};

// FETCH ALL COURSES
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("modules")
      .populate("createdBy");
    console.log(`Fetched ${courses.length} courses successfully`);
    return res.status(200).json({
      courses,
      message: "All courses fetched successfully",
    });
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return res.status(500).json({
      message: "Internal server error while fetching courses",
    });
  }
};

// DELETE COURSE AND ITS MODULES
export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    // CHECK IF COURSE EXISTS
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await LearningModule.deleteMany({ _id: { $in: course.modules } });

    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      message: "Course and its modules deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({
      message: "Failed to delete course",
    });
  }
};
