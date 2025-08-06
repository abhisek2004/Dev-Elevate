// FeedbackController.js
import Feedback from "../model/Feedback.js";

// GET all feedbacks
export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("userId", "name email");

    res.status(200).json({
      data: feedbacks,
      message: "Feedbacks fetched successfully.",
    });
  } catch (error) {
    console.error(`[GetAllFeedbacks Error] ${error.message}`);
    res.status(500).json({
      message: "Failed to fetch feedbacks. Please try again later.",
      error: error.message,
    });
  }
};

// UPDATE feedback status to "Reviewed"
export const updateFeedbackStatus = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { status: "Reviewed" },
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({
        message: "Feedback not found. Please check the feedback ID.",
      });
    }

    res.status(200).json({
      message: 'Feedback status updated to "Reviewed".',
      feedback,
    });
  } catch (error) {
    console.error(`[UpdateFeedbackStatus Error] ${error.message}`);
    res.status(500).json({
      message: "Failed to update feedback status. Please try again.",
      error: error.message,
    });
  }
};

// DELETE a feedback entry
export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        message: "Feedback not found. It may have already been deleted.",
      });
    }

    res.status(200).json({
      message: "Feedback deleted successfully.",
    });
  } catch (error) {
    console.error(`[DeleteFeedback Error] ${error.message}`);
    res.status(500).json({
      message: "Failed to delete feedback. Please try again later.",
      error: error.message,
    });
  }
};
