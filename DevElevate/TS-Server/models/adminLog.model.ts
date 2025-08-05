import mongoose, { Document, Model, Schema } from "mongoose";

export type ActionType =
  | "login"
  | "logout"
  | "view_logs"
  | "create"
  | "update"
  | "delete"
  | "export"
  | "import"
  | "user_management"
  | "course_management"
  | "content_management"
  | "news_management"
  | "system_settings";

export type UserRole = "user" | "admin";

export interface IAdminLog extends Document {
  actionType: ActionType;
  userId: string;
  userRole: UserRole;
  message: string;
  ipAddress?: string;
  userAgent?: string;
  additionalData?: any;
  createdAt: Date;
  updatedAt: Date;
}

const adminLogSchema: Schema<IAdminLog> = new mongoose.Schema(
  {
    actionType: {
      type: String,
      required: true,
      enum: [
        "login",
        "logout",
        "view_logs",
        "create",
        "update",
        "delete",
        "export",
        "import",
        "user_management",
        "course_management",
        "content_management",
        "news_management",
        "system_settings",
      ],
    },
    userId: {
      type: String,
      required: true,
    },
    userRole: {
      type: String,
      required: true,
      enum: ["user", "admin"],
    },
    message: {
      type: String,
      required: true,
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    additionalData: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for query performance
adminLogSchema.index({ actionType: 1, createdAt: -1 });
adminLogSchema.index({ userId: 1, createdAt: -1 });
adminLogSchema.index({ userRole: 1, createdAt: -1 });

export const AdminLog: Model<IAdminLog> = mongoose.model<IAdminLog>(
  "AdminLog",
  adminLogSchema
);
