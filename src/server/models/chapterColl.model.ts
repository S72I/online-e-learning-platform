import mongoose, { Types } from "mongoose";

const chapterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  // videos_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }]
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }]
});

export const Chapter = mongoose.models.Chapter || mongoose.model("Chapter", chapterSchema);

export default Chapter;
