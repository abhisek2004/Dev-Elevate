import mongoose from "mongoose";

const adminLogSchema = new mongoose.Schema(
  {
    actionType: {
      type: String,
      required: true,
      enum: [
        'login',
        'logout', 
        'view_logs',
        'create',
        'update',
        'delete',
        'export',
        'import',
        'user_management',
        'course_management',
        'content_management',
        'news_management',
        'system_settings'
      ]
    },
    userId: {
      type: String,
      required: true
    },
    userRole: {
      type: String,
      required: true,
      enum: ['user', 'admin']
    },
    message: {
      type: String,
      required: true
    },
    ipAddress: {
      type: String
    },
    userAgent: {
      type: String
    },
    additionalData: {
      type: mongoose.Schema.Types.Mixed
    }
  },
  {
    timestamps: true
  }
);

// Index for better query performance
adminLogSchema.index({ actionType: 1, createdAt: -1 });
adminLogSchema.index({ userId: 1, createdAt: -1 });
adminLogSchema.index({ userRole: 1, createdAt: -1 });

const AdminLog = mongoose.model("AdminLog", adminLogSchema);
export default AdminLog;
