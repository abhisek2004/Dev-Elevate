import mongoose from "mongoose"

const FaqSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const FAQ = mongoose.model("FrequentAskedQuestion", FaqSchema);
export default FAQ;

