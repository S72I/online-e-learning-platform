import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
  title:
  {
    type: String,
  },
  course_id:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video"
    }]
});

export const Chapter = mongoose.models.Chapter || mongoose.model("Chapter", chapterSchema);

export default Chapter;
