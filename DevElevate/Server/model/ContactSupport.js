import mongoose from "mongoose"

const contactSupportSchema = new mongoose.Schema(
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

const ContactSupport = mongoose.model("ContactSupport", contactSupportSchema);

export default ContactSupport;
