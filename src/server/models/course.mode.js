// import mongoose from "mongoose";

// const courseSchema = mongoose.Schema(
//   {
//     user_id: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: "users",
//     },
//     courseEducator: {
//       type: String,
//       required: [true, "Please enter a courseEducator"],
//     },
//     title: {
//       type: String,
//       required: [true, "Please enter a title"],
//     },
//     level: {
//       type: String,
//       required: [true, "Please enter a level"],
//     },
//     description: {
//       type: String,
//       required: [true, "Please enter a description"],
//     },
//     images: {
//       type: [String],
//       required: [true, "Please select images"],
//     },
//     chapters: [
//       {
//         title: {
//           type: String,
//           required: true,
//         },
//         videoUri: [
//           {
//             title: { type: String, required: true },
//             description: { type: String, required: true },
//             uri: { type: String, required: true },
//             uriTiming: { type: String, required: true },
//           },
//         ],
//       },
//     ],
//     totalVideosTiming: {
//       type: String,
//     },
//     isDeleted: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true }
// );

// const Course = mongoose.model.course || mongoose.model("course", courseSchema);
// export default Course;

import mongoose from "mongoose";

const chapter = {
  title: {
    type: String,
    required: true,
  },
  videos: [
    {
      videoTitle: { type: String, required: true },
      lessonNo: { type: Number, required: true },
      videoUri: { type: String, required: true },
      videoTiming: { type: String, required: true },
    },
  ],
};

const courseSchema = new mongoose.Schema(
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

    chapters: [chapter],

    totalVideosTiming: {
      type: String,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("course", courseSchema);
export default Course;
