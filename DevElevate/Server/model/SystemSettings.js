import mongoose from "mongoose";

const systemSettingsSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      default: "DevElevate",
    },
    maintenanceMode: {
      type: Boolean,
      default: false,
    },
    registrationEnabled: {
      type: Boolean,
      default: true,
    },
    emailNotifications: {
      type: Boolean,
      default: true,
    },
    maxUsersPerCourse: {
      type: Number,
      default: 1000,
    },
    sessionTimeout: {
      type: Number,
      default: 30, // minutes
    },
    // optional: store who last updated settings
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

// Ensure there’s always only 1 document for system settings
systemSettingsSchema.statics.getSettings = async function () {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

const SystemSettings = mongoose.model("SystemSettings", systemSettingsSchema);

export default SystemSettings;
