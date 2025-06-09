'use client';

import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, CircularProgress, Button, TextField } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { levelOptions } from '@/lib/utils/constants';

import CourseImages from './CourseImages';
import ChapterList from './ChapterList';
import { IChapter, ICourse } from '@/components/Types/course';
import CustomDropDown from '@/components/UI/CustomDropDown';
import CustomLoading from '@/components/UI/CustomLoading';

const MAX_IMAGES = 3;

function secondsToHms(seconds: number) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) {
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function hmsToSeconds(hms: string) {
    if (!hms) return 0;
    const parts = hms.split(':').map(Number);
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    return 0;
}

function formatDuration(seconds: number): string {
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
    // Otherwise, show M:SS minutes
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')} minutes`;
}


const CourseForm = ({
    initialData,
    mode = "add",
    onSubmitCourse,
    isLoading = false,
    submitText = "Add Course"
}: {
    initialData?: ICourse;
    mode?: "add" | "update";
    onSubmitCourse?: (payload: ICourse) => Promise<void>;
    isLoading?: boolean;
    submitText?: string;
}) => {
    const {
        control,
        handleSubmit,
        setValue,
        register,
        reset,
        formState: { errors },
    } = useForm<ICourse>({
        defaultValues: initialData || {
            title: '',
            level: '',
            description: '',
            images: [],
            chapters: [],
            totalVideosTiming: '',
        },
    });

    const [videoLoadingIndex, setVideoLoadingIndex] = useState<{ chapterIdx: number; videoIdx: number } | null>(null);
    const [courseData, setCourseData] = useState<ICourse>(initialData || {
        title: '',
        level: '',
        description: '',
        images: [],
        chapters: [],
        totalVideosTiming: '',
        _id: '',
        user_name: '',
    });
    const [imageArray, setImageArray] = useState<string[]>(initialData?.images || []);
    const [imageLoading, setImageLoading] = useState(false);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        if (initialData) {
            setCourseData(initialData);
            setImageArray(initialData.images || []);
            reset(initialData);
        }
    }, [initialData, reset]);

    const handleChange = (field: keyof ICourse, value: string | string[] | IChapter[]) => {
        if (field === 'chapters') {
            const chapters = value as IChapter[];
            const totalSeconds = chapters.reduce((chapterSum, chapter) => (
                chapterSum + chapter.videos.reduce((videoSum, video) => videoSum + hmsToSeconds(video.videoTiming || "0:00"), 0)
            ), 0);
            const totalVideosTiming = secondsToHms(totalSeconds);
            setCourseData((prev) => ({ ...prev, chapters, totalVideosTiming }));
            setValue('chapters', chapters, { shouldValidate: true });
            setValue('totalVideosTiming', totalVideosTiming, { shouldValidate: true });
        } else {
            setCourseData((prev) => ({ ...prev, [field]: value }));
            setValue(field, value as string, { shouldValidate: true });
        }
    };

    const router = useRouter();

    const getTotalDuration = () => {
        return courseData.chapters.reduce((chapterSum, chapter) => (
            chapterSum + chapter.videos.reduce((videoSum, video) => videoSum + hmsToSeconds(video.videoTiming || "0:00"), 0)
        ), 0);
    };

    const validateCourseData = () => {
        if (
            !courseData.title ||
            !courseData.level ||
            !courseData.description ||
            courseData.images.length === 0 ||
            courseData.images.length > MAX_IMAGES ||
            courseData.chapters.length === 0 ||
            courseData.chapters.some(
                ch => !ch.title || ch.videos.length === 0 ||
                    ch.videos.some(v => !v.videoTitle || !v.videoUri || !v.videoTiming)
            )
        ) {
            if (courseData.images.length === 0) {
                toast.error('Please upload at least one image!');
            } else if (courseData.images.length > MAX_IMAGES) {
                toast.error(`You can upload up to ${MAX_IMAGES} images.`);
            } else {
                toast.error('Please fill all required fields!');
            }
            return false;
        }
        return true;
    };

    const onSubmit = async () => {
        if (!validateCourseData()) return;
        setUpdating(true);
        const payload = { ...courseData };
        try {
            if (onSubmitCourse) {
                await onSubmitCourse(payload);
                toast.success(mode === "add" ? "Course Added successfully!" : "Course Updated successfully!");
            }
            setTimeout(() => {
                router.push("/");
            }, 1000);

            setCourseData({
                title: "",
                level: "",
                description: "",
                images: [],
                chapters: [],
                totalVideosTiming: '',
                _id: '',
                user_name: '',
            });
            reset();
        } catch (err) {
            toast.error(mode === "add" ? "Failed to Add course." : "Failed to Update course.");
        } finally {
            setUpdating(false);
        }
    };

    return (
        <>
            {updating && (
                <Box
                    sx={{
                        position: 'fixed',
                        zIndex: 2000,
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        bgcolor: 'rgba(255,255,255,0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {/* <CircularProgress size={80} color="primary" /> */}
                    <CustomLoading sx={{ mt: 5, display: 'block', mx: 'auto' }} />

                </Box>
            )}
            <Container maxWidth="md" sx={{ py: 6 }}>
                <ToastContainer />
                <Typography color="#FF9500" variant="h4" fontWeight={700} mb={4}>
                    {mode === "add" ? "Add Course" : "Update Course"}
                </Typography>
                <TextField
                    label="Course Title"
                    fullWidth
                    sx={{ mb: 2 }}
                    error={!!errors.title}
                    helperText={errors.title && 'Title is required'}
                    {...register('title', {
                        required: 'Title is required',
                        onChange: (e) => handleChange('title', e.target.value),
                    })}
                    value={courseData.title}
                />

                <Controller
                    name="level"
                    control={control}
                    rules={{ required: 'Level is required' }}
                    render={({ field }) => (
                        <CustomDropDown
                            label="Level"
                            value={courseData.level}
                            setValue={(val: string) => {
                                field.onChange(val);
                                handleChange('level', val);
                            }}
                            options={levelOptions}
                        />
                    )}
                />

                <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    sx={{ mb: 2 }}
                    error={!!errors.description}
                    helperText={errors.description && 'Description is required'}
                    {...register('description', {
                        required: 'Description is required',
                        onChange: (e) => handleChange('description', e.target.value),
                    })}
                    value={courseData.description}
                />

                <CourseImages
                    imageArray={imageArray}
                    imageLoading={imageLoading}
                    setImageLoading={setImageLoading}
                    setImageArray={setImageArray}
                    setCourseData={setCourseData}
                    setValue={setValue}
                />

                <ChapterList
                    courseData={courseData}
                    setCourseData={setCourseData}
                    setValue={setValue}
                    videoLoadingIndex={videoLoadingIndex}
                    setVideoLoadingIndex={setVideoLoadingIndex}
                    secondsToHms={secondsToHms}
                    hmsToSeconds={hmsToSeconds}
                />

                {/* <Typography sx={{ mt: 2, fontWeight: 500 }}>
          Total Video Duration: {secondsToHms(getTotalDuration())}
        </Typography> */}

                <Typography sx={{ mt: 2, fontWeight: 500 }}>
                    Total Video Duration: {formatDuration(getTotalDuration())}
                </Typography>



                <Button
                    sx={{ mt: 4 }}
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit(onSubmit)}
                    disabled={isLoading || updating}
                >
                    {submitText}
                </Button>
            </Container>
        </>
    );
};

export default CourseForm;
