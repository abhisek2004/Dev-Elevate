import mongoose from "mongoose";

const OtpTokenSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, index: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], required: true },
    passwordHash: { type: String, required: true },
    otpHash: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

// Automatically remove expired docs when using a TTL index
OtpTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const OtpToken = mongoose.model("OtpToken", OtpTokenSchema);

export default OtpToken;


