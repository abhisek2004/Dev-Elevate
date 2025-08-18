import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    topicId: {
      type: String,
      required: true,
    },
    moduleId: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create compound index for efficient queries
notesSchema.index({ userId: 1, topicId: 1 });

const Notes = mongoose.model("Notes", notesSchema);

export default Notes;