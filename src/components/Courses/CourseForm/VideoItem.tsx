import React from 'react';
import { Box, TextField, IconButton, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from "react-toastify";
import { IChapter, ICourse, IVideo } from '@/components/Types/course';
import CustomLoading from '@/components/UI/CustomLoading';



type VideoLoadingIndex = { chapterIdx: number; videoIdx: number } | null;

type VideoItemProps = {
    video: IVideo;
    videoIdx: number;
    chapterIdx: number;
    courseData: ICourse;
    setCourseData: React.Dispatch<React.SetStateAction<ICourse>>;
    setValue: (field: 'chapters', value: IChapter[], options?: { shouldValidate: boolean }) => void;
    videoLoadingIndex: VideoLoadingIndex;
    setVideoLoadingIndex: React.Dispatch<React.SetStateAction<VideoLoadingIndex>>;
    secondsToHms: (seconds: number) => string;
    hmsToSeconds: (hms: string) => number;
};



const VideoItem: React.FC<VideoItemProps> = ({
    video,
    videoIdx,
    chapterIdx,
    courseData,
    setCourseData,
    setValue,
    videoLoadingIndex,
    setVideoLoadingIndex,
    secondsToHms,
    hmsToSeconds
}) => {
    const handleFieldChange = (key: keyof IVideo, value: string) => {
        const updatedChapters = [...courseData.chapters];
        updatedChapters[chapterIdx].videos[videoIdx][key] = value;
        setCourseData((prev) => ({ ...prev, chapters: updatedChapters }));
        setValue('chapters', updatedChapters, { shouldValidate: true });
    };

    const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setVideoLoadingIndex({ chapterIdx, videoIdx });
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "videos_present");
        try {
            const res = await fetch("https://api.cloudinary.com/v1_1/dmgkiiaqo/video/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.secure_url) {
                handleFieldChange('videoUri', data.secure_url);
                handleFieldChange('videoTiming', secondsToHms(data.duration || 0));
            } else {
                toast.error("Video upload failed.");
            }
        } catch {
            toast.error("Video upload failed.");
        } finally {
            setVideoLoadingIndex(null);
        }
    };


    function formatVideoTiming(seconds: number): string {
        if (seconds < 60) {
            return `${seconds} second${seconds !== 1 ? 's' : ''}`;
        }
        if (seconds % 3600 === 0) {
            const hours = seconds / 3600;
            return `${hours} hour${hours !== 1 ? 's' : ''}`;
        }
        if (seconds % 60 === 0) {
            const mins = seconds / 60;
            return `${mins} minute${mins !== 1 ? 's' : ''}`;
        }
        if (seconds >= 3600) {
            const hours = Math.floor(seconds / 3600);
            const mins = Math.floor((seconds % 3600) / 60);
            return `${hours}:${mins.toString().padStart(2, '0')} hours`;
        }
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')} minutes`;
    }


    const removeVideo = () => {
        const updatedChapters = [...courseData.chapters];
        updatedChapters[chapterIdx].videos.splice(videoIdx, 1);
        setCourseData((prev) => ({ ...prev, chapters: updatedChapters }));
        setValue('chapters', updatedChapters, { shouldValidate: true });
    };

    return (
        <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
                label="Video Title"
                value={video.videoTitle}
                onChange={e => handleFieldChange('videoTitle', e.target.value)}
            />
            <TextField
                label="Description"
                value={video.description}
                onChange={e => handleFieldChange('description', e.target.value)}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    disabled={
                        !!videoLoadingIndex &&
                        videoLoadingIndex.chapterIdx === chapterIdx &&
                        videoLoadingIndex.videoIdx === videoIdx
                    } />
                {videoLoadingIndex && videoLoadingIndex.chapterIdx === chapterIdx && videoLoadingIndex.videoIdx === videoIdx &&
                    // <CircularProgress size={22} />
                    <CustomLoading sx={{ mt: 5, display: 'block', mx: 'auto' }} />

                }
            </Box>
            <TextField
                label="Video Timing"
                value={formatVideoTiming(hmsToSeconds(video.videoTiming))}
                InputProps={{ readOnly: true }}
            />

            <IconButton onClick={removeVideo}>
                <DeleteIcon />
            </IconButton>
        </Box>
    );
};

export default VideoItem;
