import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
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
      },
      videoUri: [
        {
          title: String,
          description: String,  
          uri: String,
          uriTimeing: String,
        },
      ],
    },
  ],
  totalVideosTimeing: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    enum: ["false", "true"],
    default: "false",
  },
});

const Course =
  mongoose.models.courses || mongoose.model("courses", courseSchema);
export default Course;
