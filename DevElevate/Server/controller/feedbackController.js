// FeedbackController.js
import Feedback from "../model/Feedback.js";

// GET ALL FEEDBACKS
export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("userId", "name email");
    console.log(`Fetched ${feedbacks.length} feedbacks successfully`);
    res.status(200).json({ data: feedbacks });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res
      .status(500)
      .json({ message: "Error fetching feedbacks", error: error.message });
  }
};

// UPDATE FEEDBACK STATUS TO "REVIEWED"
export const updateFeedbackStatus = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { status: "Reviewed" },
      { new: true }
    );

    if (!feedback) {
      console.warn(`Feedback with ID ${req.params.id} not found`);
      return res.status(404).json({ message: "Feedback not found" });
    }

    console.log(`Feedback ${req.params.id} marked as Reviewed`);
    res.status(200).json({ message: "Feedback marked as Reviewed", feedback });
  } catch (error) {
    console.error("Error updating feedback status:", error);
    res
      .status(500)
      .json({
        message: "Error updating feedback status",
        error: error.message,
      });
  }
};

// DELETE FEEDBACK BY ID
export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);

    if (!feedback) {
      console.warn(`Feedback with ID ${req.params.id} not found`);
      return res.status(404).json({ message: "Feedback not found" });
    }

    console.log(`Feedback ${req.params.id} deleted successfully`);
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res
      .status(500)
      .json({ message: "Error deleting feedback", error: error.message });
  }
};
