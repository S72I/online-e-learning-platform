import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    videoTitle:
    {
        type: String,
        required: true
    },
    description:
    {
        type: String,
        required: true
    },
    videoUri: {
        type: String,
        required: true
    },
    videoTiming: {
        type: String,
        required: true
    },
    chapter_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter", required: true
    }
});

export const Video = mongoose.models.Video || mongoose.model("Video", videoSchema);

export default Video;
