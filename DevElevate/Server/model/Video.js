// models/Video.js
const videoSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      description: String,
      videoUrl: {
        type: String,
        required: true,
      },
      duration: {
        type: Number, // Duration in seconds
        required: true,
      },
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },
      order: {
        type: Number,
        required: true,
      },
      thumbnail: String,
    },
    {
      timestamps: true,
    }
  );
  
  export default mongoose.model("Video", videoSchema);
  
  
  