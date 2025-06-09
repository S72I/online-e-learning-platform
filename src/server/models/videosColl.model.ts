import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    videoTitle:
    {
        type: String,
    },
    description:
    {
        type: String,
    },
    videoUri: {
        type: String,
    },
    videoTiming: {
        type: String,
    },
    chapter_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter",
    }
});

export const Video = mongoose.models.Video || mongoose.model("Video", videoSchema);

export default Video;
