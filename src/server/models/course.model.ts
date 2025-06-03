import mongoose from "mongoose";


const courseSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  level: { type: String, required: true },
  description: { type: String, required: true },
  totalVideosTiming: { type: String, required: true },
  images: [{ type: String, required: true }],
  chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chapter" }]
}, { timestamps: true });

export const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);
