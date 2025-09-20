import mongoose from "mongoose";

const adminLogSchema = new mongoose.Schema(
  {
    actionType: {
      type: String,
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
        'system_settings',
        'quiz_complete'
      ]
    },
    userId: {
      type: String,
 
    },
    userRole: {
      type: String,
   
      enum: ['user', 'admin']
    },
    message: {
      type: String,
    
    },
    ipAddress: {
      type: String
    },
    userAgent: {
      type: String
    },
    additionalData: {
      type: mongoose.Schema.Types.Mixed
    },
    details:{
      type:String
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // 👈 User model ka naam
    },
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
