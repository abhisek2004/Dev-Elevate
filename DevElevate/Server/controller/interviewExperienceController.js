import { success } from "zod";
import InterviewExperience from "../model/InterviewExperience.js";
export const createInterviewExperience = async (req, res) => {
  try {
    const {
      company,
      position,
      author,
      date,
      duration,
      rounds,
      level,
      result,
      tags,
      preview,
      tips,
    } = req.body;

    console.log("Received data:", req.body);

    if (
      !company ||
      !position ||
      !author ||
      !date ||
      !duration ||
      !rounds ||
      !level ||
      !result ||
      !preview
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled...." });
    }

    const interviewExperience = new InterviewExperience({
      company,
      position,
      author,
      date,
      duration,
      rounds,
      level,
      result,
      tags: tags ? tags.map((tag) => tag.trim()) : [],
      preview,
      tips: tips ? tips.map((tip) => tip.trim()) : [],
    });

    await interviewExperience.save();

    res.status(201).json({
      success: true,
      message: "Interview experience added successfully!",
      data: interviewExperience,
    });
  } catch (error) {
    console.error("Error creating experience:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getInterviewExperiences = async (req, res) => {
  try {
    const interviewExperiences = await InterviewExperience.find();
    res.status(200).json({
      success: true,
      message: "Interview experiences fetched successfully!",
      data: interviewExperiences,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
