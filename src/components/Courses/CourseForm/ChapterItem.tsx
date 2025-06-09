import React from 'react';
import { Box, TextField, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VideoItem from './VideoItem';
import { IChapter, ICourse, IVideo } from '@/components/Types/course';
import { UseFormSetValue } from 'react-hook-form';



type VideoLoadingIndex = { chapterIdx: number; videoIdx: number } | null;

// type ChapterItemProps = {
//     chapter: IChapter;
//     chapterIdx: number;
//     courseData: ICourse;
//     setCourseData: React.Dispatch<React.SetStateAction<ICourse>>;
//     setValue: <T extends keyof ICourse>(field: T, value: ICourse[T], options?: { shouldValidate: boolean }) => void;
//     videoLoadingIndex: number | null;
//     setVideoLoadingIndex: React.Dispatch<React.SetStateAction<number | null>>;
//     secondsToHms: (seconds: number) => string;
//     hmsToSeconds: (hms: string) => number;
// };
type ChapterItemProps = {
    chapter: IChapter;
    chapterIdx: number;
    courseData: ICourse;
    setCourseData: React.Dispatch<React.SetStateAction<ICourse>>;
    setValue: UseFormSetValue<ICourse>;
    videoLoadingIndex: VideoLoadingIndex;
    setVideoLoadingIndex: React.Dispatch<React.SetStateAction<VideoLoadingIndex>>;
    secondsToHms: (seconds: number) => string;
    hmsToSeconds: (hms: string) => number;
};
const ChapterItem: React.FC<ChapterItemProps> = ({
    chapter,
    chapterIdx,
    courseData,
    setCourseData,
    setValue,
    videoLoadingIndex,
    setVideoLoadingIndex,
    secondsToHms,
    hmsToSeconds
}) => {
    const handleChapterChange = (value: string) => {
        const updatedChapters = [...courseData.chapters];
        updatedChapters[chapterIdx].title = value;
        setCourseData((prev) => ({ ...prev, chapters: updatedChapters }));
        setValue('chapters', updatedChapters, { shouldValidate: true });
    };

    const handleRemoveChapter = () => {
        const updatedChapters = [...courseData.chapters];
        updatedChapters.splice(chapterIdx, 1);
        setCourseData((prev) => ({ ...prev, chapters: updatedChapters }));
        setValue('chapters', updatedChapters, { shouldValidate: true });
    };

    const addVideo = () => {
        const currentVideos = chapter.videos;
        const lastVideo = currentVideos[currentVideos.length - 1];
        if (!lastVideo.videoTitle || !lastVideo.videoUri || !lastVideo.videoTiming) {
            return;
        }
        const newVideo = { videoTitle: '', description: '', videoUri: '', videoTiming: '' };
        const updatedChapters = [...courseData.chapters];
        updatedChapters[chapterIdx].videos = [...currentVideos, newVideo];
        setCourseData((prev) => ({ ...prev, chapters: updatedChapters }));
        setValue('chapters', updatedChapters, { shouldValidate: true });
    };

    return (
        <Box sx={{ mb: 3, border: '1px solid #eee', borderRadius: 2, p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TextField
                    label="Chapter Title"
                    fullWidth
                    value={chapter.title}
                    onChange={e => handleChapterChange(e.target.value)}
                />
                <IconButton onClick={handleRemoveChapter}>
                    <DeleteIcon />
                </IconButton>
            </Box>
            {chapter.videos.map((video: IVideo, videoIdx: number) => (
                <VideoItem
                    key={videoIdx}
                    video={video}
                    videoIdx={videoIdx}
                    chapterIdx={chapterIdx}
                    courseData={courseData}
                    setCourseData={setCourseData}
                    setValue={setValue}
                    videoLoadingIndex={videoLoadingIndex}
                    setVideoLoadingIndex={setVideoLoadingIndex}
                    secondsToHms={secondsToHms}
                    hmsToSeconds={hmsToSeconds}
                />
            ))}
            <Button
                variant="outlined"
                onClick={addVideo}
                disabled={
                    !chapter.videos[chapter.videos.length - 1].videoTitle ||
                    !chapter.videos[chapter.videos.length - 1].videoUri ||
                    !chapter.videos[chapter.videos.length - 1].videoTiming
                }
            >
                Add Video
            </Button>
        </Box>
    );
};

export default ChapterItem;
