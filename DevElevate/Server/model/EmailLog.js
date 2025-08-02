import mongoose from "mongoose";

const EmailLogSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  recipients: {
    type: [String],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
  sentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const EmailLog = mongoose.model("EmailLog", EmailLogSchema);
export default EmailLog;
