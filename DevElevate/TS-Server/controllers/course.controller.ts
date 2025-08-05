import { Request, Response, NextFunction } from "express";
import { Course } from "../models/course.model";
import { LearningModule } from "../models/learningModule.model";
// Extend Request interface to include id (creator's user ID)

export const createCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { courseTitle, description, tags } = req.body;

    if (!courseTitle || !description || !tags) {
      return res.status(400).json({
        message: "Course title, description and tags are required.",
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
      message: "Course created.",
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to create course",
      error: error.message,
    });
  }
};

export const editCourse = async (req: Request, res: Response, next: NextFunction) => {
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

    const updatedCourse = await Course.findByIdAndUpdate(courseId, updatedCourseData, {
      new: true,
    });

    let updatedModule = null;
    if (moduleId) {
      const moduleData = {
        moduleTitle,
        videoUrl,
        resourceLinks,
        duration,
      };
      updatedModule = await LearningModule.findByIdAndUpdate(moduleId, moduleData, {
        new: true,
      });
    }

    return res.status(200).json({
      course: updatedCourse,
      module: updatedModule,
      message: "Course updated successfully.",
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to update course",
      error: error.message,
    });
  }
};

export const getAllCourses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courses = await Course.find()
      .populate("modules")
      .populate("createdBy");

    return res.status(200).json({
      courses,
      message: "All courses fetched successfully",
    });
  } catch (error: any) {
    console.error("Failed to fetch courses:", error);
    return res.status(500).json({
      message: "Internal server error while fetching courses",
      error: error.message,
    });
  }
};

export const deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await LearningModule.deleteMany({ _id: { $in: course.modules } });

    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      message: "Course and its modules deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete error:", error);
    return res.status(500).json({
      message: "Failed to delete course",
      error: error.message,
    });
  }
};
