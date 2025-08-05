import { Request, Response, NextFunction } from "express";
import { Feedback } from "../models/feedback.model";
// GET all feedbacks
export const getAllFeedbacks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const feedbacks = await Feedback.find().populate("userId", "name email");
    res.status(200).json({ data: feedbacks });
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching feedbacks", error: error.message });
  }
};

// UPDATE feedback status to "Reviewed"
export const updateFeedbackStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { status: "Reviewed" },
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json({ message: "Feedback marked as Reviewed", feedback });
  } catch (error: any) {
    res.status(500).json({ message: "Error updating feedback status", error: error.message });
  }
};

// DELETE feedback
export const deleteFeedback = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting feedback", error: error.message });
  }
};
