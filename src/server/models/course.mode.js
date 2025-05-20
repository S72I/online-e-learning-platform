import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    title: {
      type: String,
      required: [true, "Please enter a title"],
    },
    level: {
      type: String,
      required: [true, "Please enter a level"],
    },
    description: {
      type: String,
      required: [true, "Please enter a description"],
    },
    images: {
      type: [String],
      required: [true, "Please select images"],
    },
    chapters: [
      {
        title: {
          type: String,
          required: true,
        },
        videoUri: [
          {
            title: { type: String, required: true },
            description: { type: String, required: true },
            uri: { type: String, required: true },
            uriTiming: { type: String, required: true },
          },
        ],
      },
    ],
    totalVideosTiming: {
      type: String,
      default: "00:00:00",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model.course || mongoose.model("course", courseSchema);
export default Course;
