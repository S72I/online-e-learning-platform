import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ChapterItem from './ChapterItem';
import { ICourse } from '@/components/Types/course';
import { UseFormSetValue } from 'react-hook-form';


type VideoLoadingIndex = { chapterIdx: number; videoIdx: number } | null;

type ChapterListProps = {
    courseData: ICourse;
    setCourseData: React.Dispatch<React.SetStateAction<ICourse>>;
    setValue: UseFormSetValue<ICourse>;
    // videoLoadingIndex: number | null;
    // setVideoLoadingIndex: React.Dispatch<React.SetStateAction<number | null>>;
    videoLoadingIndex: VideoLoadingIndex;
    setVideoLoadingIndex: React.Dispatch<React.SetStateAction<VideoLoadingIndex>>;
    secondsToHms: (seconds: number) => string;
    hmsToSeconds: (hms: string) => number;
};


const ChapterList: React.FC<ChapterListProps> = ({
    courseData,
    setCourseData,
    setValue,
    videoLoadingIndex,
    setVideoLoadingIndex,
    secondsToHms,
    hmsToSeconds
}) => {
    const addChapter = () => {
        const newChapter = {
            title: '',
            videos: [{ videoTitle: '', description: '', videoUri: '', videoTiming: '' }],
        };
        setCourseData((prev: ICourse) => ({
            ...prev,
            chapters: [...prev.chapters, newChapter]
        }));
        setValue('chapters', [...courseData.chapters, newChapter], { shouldValidate: true });
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Chapters</Typography>
            {courseData.chapters.map((chapter, idx: number) => (
                <ChapterItem
                    key={idx}
                    chapter={chapter}
                    chapterIdx={idx}
                    courseData={courseData}
                    setCourseData={setCourseData}
                    setValue={setValue}
                    videoLoadingIndex={videoLoadingIndex}
                    setVideoLoadingIndex={setVideoLoadingIndex}
                    secondsToHms={secondsToHms}
                    hmsToSeconds={hmsToSeconds}
                />
            ))}
            <Button startIcon={<AddIcon />} onClick={addChapter} sx={{ mt: 2 }}>
                Add Chapter
            </Button>
        </Box>
    );
};

export default ChapterList;
