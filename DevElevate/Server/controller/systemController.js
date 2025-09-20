import SystemSetting from "../model/SystemSettings.js";

// ✅ GET current system settings
export const getSystemSettings = async (req, res) => {
  try {
    let settings = await SystemSetting.findOne();

    // If no settings exist, create default one
    if (!settings) {
      settings = await SystemSetting.create({
        siteName: "DevElevate",
        maintenanceMode: false,
        registrationEnabled: true,
        emailNotifications: true,
        maxUsersPerCourse: 1000,
        sessionTimeout: 30,
      });
    }

    res.json({ success: true, settings });
  } catch (error) {
    console.error("Error fetching system settings:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const updateSystemSettings = async (req, res) => {
  try {
    const updates = req.body;

    // ✅ Find existing settings or create new
    let settings = await SystemSetting.findOne();

    if (!settings) {
      // No settings exist → create new
      settings = new SystemSetting(updates);
    } else {
      // Merge updates into existing settings
      Object.assign(settings, updates);
    }

    // ✅ Save changes
    await settings.save();

    return res.status(200).json({
      success: true,
      message: "System settings updated successfully",
      settings,
    });
  } catch (error) {
    console.error("❌ Error updating system settings:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update system settings",
      error: error.message,
    });
  }
};
