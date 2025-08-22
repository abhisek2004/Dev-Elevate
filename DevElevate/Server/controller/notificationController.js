import Notification from "../model/Notification.js";

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching notifications", error: error.message });
  }
};

export const markNotificationRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.json(notification);
  } catch (error) {
    res.status(500).json({
      message: "Error marking notification as read",
      error: error.message,
    });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting notification",
      error: error.message,
    });
  }
};

export const createNotification = async (userId, message, type = "info") => {
  try {
    const notification = new Notification({ userId, message, type });
    await notification.save();
    return notification;
  } catch (error) {
    // Optionally log error
    return null;
  }
};
