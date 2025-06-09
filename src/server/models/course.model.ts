import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
  },
  level: {
    type: String,
  },
  description: {
    type: String,
  },
  isPrivate: {
    type: Boolean,
    default: false
  },
  totalVideosTiming: {
    type: String,
  },
  images: [{
    type: String,
    required: true
  }],
  chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chapter" }]
}, { timestamps: true });

export const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);
