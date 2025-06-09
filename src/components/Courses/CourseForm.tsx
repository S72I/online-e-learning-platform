'use client';

import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Container,
    FormControlLabel,
    IconButton,
    Radio,
    RadioGroup,
    TextField,
    Typography,

} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomDropDown from '../UI/CustomDropDown';
import { IChapter, ICourse, IVideo, levelOptions } from '../Types/course';
import CustomLoading from '../UI/CustomLoading';
import { Controller, useForm } from "react-hook-form";

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
            isPrivate: false,
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
        isPrivate: false,
    });
    const [showChapters, setShowChapters] = useState(!!(initialData && initialData.chapters.length));
    const [imageArray, setImageArray] = useState<string[]>(initialData?.images || []);
    const [imageLoading, setImageLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (initialData) {
            setCourseData(initialData);
            setImageArray(initialData.images || []);
            setShowChapters(initialData.chapters.length > 0);
            reset(initialData);
        }
    }, [initialData, reset]);

    const handleChange = (
        field: keyof ICourse,
        value: string | string[] | IChapter[] | boolean
    ) => {
        if (field === 'chapters') {
            const chapters = value as IChapter[];
            const totalSeconds = chapters.reduce((chapterSum, chapter) => (
                chapterSum + chapter.videos.reduce((videoSum, video) => videoSum + hmsToSeconds(video.videoTiming || "0:00"), 0)
            ), 0);
            const totalVideosTiming = secondsToHms(totalSeconds);
            setCourseData((prev) => ({ ...prev, chapters, totalVideosTiming }));
            setValue('chapters', chapters, { shouldValidate: true });
            setValue('totalVideosTiming', totalVideosTiming, { shouldValidate: true });
        } else if (field === 'isPrivate') {
            setCourseData((prev) => ({ ...prev, isPrivate: value as boolean }));
            setValue('isPrivate', value as boolean, { shouldValidate: true });
        } else if (field === 'images') {
            setCourseData((prev) => ({ ...prev, images: value as string[] }));
            setValue('images', value as string[], { shouldValidate: true });
        } else {
            setCourseData((prev) => ({ ...prev, [field]: value as string }));
            setValue(field, value as string, { shouldValidate: true });
        }
    };

    const handleChapterChange = (index: number, value: string) => {
        const updatedChapters = deepCloneChapters(courseData.chapters);
        updatedChapters[index].title = value;
        handleChange('chapters', updatedChapters);
    };


    const handleRemoveChapter = (index: number) => {
        const updatedChapters = [...courseData.chapters];
        updatedChapters.splice(index, 1);
        handleChange('chapters', updatedChapters);
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


    const handleVideoChange = async (
        chapterIdx: number,
        videoIdx: number,
        key: keyof IVideo,
        event: React.ChangeEvent<HTMLInputElement> | string
    ): Promise<void> => {
        const updatedChapters = courseData.chapters.map((chapter, cIdx) => {
            if (cIdx !== chapterIdx) return chapter;
            const newVideos = chapter.videos.map((video, vIdx) =>
                vIdx === videoIdx ? { ...video } : video
            );
            return { ...chapter, videos: newVideos };
        });

        if (key === "videoUri") {
            const fileEvent = event as React.ChangeEvent<HTMLInputElement>;
            const file = fileEvent.target.files?.[0];
            if (!file) return;

            setVideoLoadingIndex({ chapterIdx, videoIdx });

            const fileData = new FormData();
            fileData.append("file", file);
            fileData.append("upload_preset", "videos_present");

            try {
                const res = await fetch("https://api.cloudinary.com/v1_1/dmgkiiaqo/video/upload", {
                    method: "POST",
                    body: fileData,
                });

                const data = await res.json();

                if (data.secure_url) {
                    updatedChapters[chapterIdx].videos[videoIdx].videoUri = data.secure_url;
                    updatedChapters[chapterIdx].videos[videoIdx].videoTiming = secondsToHms(data.duration || 0);
                    handleChange('chapters', updatedChapters);
                } else {
                    toast.error("Video upload failed.");
                }
            } catch (err) {
                toast.error("Video upload failed.");
            } finally {
                setVideoLoadingIndex(null);
            }
        } else {
            updatedChapters[chapterIdx].videos[videoIdx][key] = event as string;
            handleChange('chapters', updatedChapters);
            setValue(`chapters.${chapterIdx}.videos.${videoIdx}.${key}`, event as string, { shouldValidate: true });
        }
    };

    const handleRemoveVideo = (chapterIdx: number, videoIdx: number) => {
        const updatedChapters = [...courseData.chapters];
        updatedChapters[chapterIdx].videos.splice(videoIdx, 1);
        handleChange('chapters', updatedChapters);
    };

    const addChapter = () => {
        const newChapter: IChapter = {
            title: '',
            videos: [
                { videoTitle: '', description: '', videoUri: '', videoTiming: '' }
            ],
        };
        handleChange('chapters', [...courseData.chapters, newChapter]);
    };

    const addVideo = (chapterIdx: number) => {
        const currentVideos = courseData.chapters[chapterIdx].videos;
        const lastVideo = currentVideos[currentVideos.length - 1];
        if (!lastVideo.videoTitle || !lastVideo.videoUri || !lastVideo.videoTiming) {
            toast.error("Please fill in the current video details first (title, video file, and timing).");
            return;
        }
        const newVideo = { videoTitle: '', description: '', videoUri: '', videoTiming: '' };
        const updatedChapters = [...courseData.chapters];
        const updatedChapter = { ...updatedChapters[chapterIdx] };
        updatedChapter.videos = [...updatedChapter.videos, newVideo];
        updatedChapters[chapterIdx] = updatedChapter;
        handleChange('chapters', updatedChapters);
    };


    function deepCloneChapters(chapters: IChapter[]): IChapter[] {
        return chapters.map(chapter => ({
            ...chapter,
            videos: chapter.videos.map(video => ({ ...video }))
        }));
    }

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        if (imageArray.length >= MAX_IMAGES) {
            toast.error(`You can upload up to ${MAX_IMAGES} images.`);
            return;
        }

        setImageLoading(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append('upload_preset', 'images_present');

        try {
            const res = await fetch("https://api.cloudinary.com/v1_1/dmgkiiaqo/image/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (data.secure_url) {
                const updatedArray = [...imageArray, data.secure_url];
                setImageArray(updatedArray);

                setCourseData((prev) => ({
                    ...prev,
                    images: updatedArray,
                }));
                setValue('images', updatedArray, { shouldValidate: true });
            } else {
                toast.error("Image upload failed.");
            }
        } catch (err) {
            toast.error("Image upload failed.");
        } finally {
            setImageLoading(false);
        }
    };

    const handleRemoveImage = (index: number) => {
        const updatedArray = imageArray.filter((_, i) => i !== index);
        setImageArray(updatedArray);
        setCourseData((prev) => ({
            ...prev,
            images: updatedArray,
        }));
        setValue('images', updatedArray, { shouldValidate: true });
    };


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
            courseData.images.length > MAX_IMAGES
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
        if (courseData.chapters.length > 0) {
            if (
                courseData.chapters.some(
                    ch => !ch.title || ch.videos.length === 0 ||
                        ch.videos.some(v => !v.videoTitle || !v.videoUri || !v.videoTiming)
                )
            ) {
                toast.error('Please fill all required chapter and video fields!');
                return false;
            }
        }

        return true;
    };


    // const validateCourseData = () => {
    //     if (
    //         !courseData.title ||
    //         !courseData.level ||
    //         !courseData.description ||
    //         courseData.images.length === 0 ||
    //         courseData.images.length > MAX_IMAGES
    //     ) {
    //         if (courseData.images.length === 0) {
    //             toast.error('Please upload at least one image!');
    //         } else if (courseData.images.length > MAX_IMAGES) {
    //             toast.error(`You can upload up to ${MAX_IMAGES} images.`);
    //         } else {
    //             toast.error('Please fill all required fields!');
    //         }
    //         return false;
    //     }

    //     // Only in update mode: enforce at least one chapter and one video per chapter
    //     if (mode === "update") {
    //         if (
    //             courseData.chapters.length === 0 ||
    //             courseData.chapters.some(
    //                 ch => !ch.title || ch.videos.length === 0 ||
    //                     ch.videos.some(v => !v.videoTitle || !v.videoUri || !v.videoTiming)
    //             )
    //         ) {
    //             toast.error('Please add at least one chapter with at least one complete video!');
    //             return false;
    //         }
    //     } else if (courseData.chapters.length > 0) {
    //         // In add mode, if chapters exist, validate them
    //         if (
    //             courseData.chapters.some(
    //                 ch => !ch.title || ch.videos.length === 0 ||
    //                     ch.videos.some(v => !v.videoTitle || !v.videoUri || !v.videoTiming)
    //             )
    //         ) {
    //             toast.error('Please fill all required chapter and video fields!');
    //             return false;
    //         }
    //     }

    //     return true;
    // };

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
                isPrivate: false
            });
            setShowChapters(false);
            reset();
        } catch (err) {
            toast.error(mode === "add" ? "Failed to Add course." : "Failed to Update course.");
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
                            error={!!errors.level}
                            helperText={errors.level?.message}
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

                <TextField
                    label="Total Video Timing"
                    fullWidth
                    sx={{ mb: 2 }}
                    value={formatDuration(getTotalDuration())}
                    disabled
                />

                <Controller
                    name="isPrivate"
                    control={control}
                    render={({ field }) => (
                        <RadioGroup
                            row
                            value={field.value ? "true" : "false"}
                            onChange={(e) => {
                                const val = e.target.value === "true";
                                field.onChange(val);
                                handleChange("isPrivate", val);
                            }}
                        >
                            <FormControlLabel checked={!courseData.isPrivate} value="false" control={<Radio />} label="Public" />
                            <FormControlLabel checked={courseData.isPrivate} value="true" control={<Radio />} label="Private" />
                        </RadioGroup>
                    )}
                />

                <Typography variant="h6" mt={4}>
                    Images
                </Typography>

                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
                    {imageArray.map((img, idx) => (
                        <Box key={idx} position="relative" display="inline-block">
                            <Box
                                component="img"
                                src={img}
                                alt={`Uploaded Image ${idx + 1}`}
                                width={100}
                                height="auto"
                                sx={{ borderRadius: 1, border: "1px solid #ccc" }}
                            />
                            <IconButton
                                color="error"
                                onClick={() => handleRemoveImage(idx)}
                                sx={{ position: "absolute", top: 0, right: 0 }}
                                size="small"
                                aria-label={`Remove image ${idx + 1}`}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    ))}
                </Box>

                {imageLoading &&
                    // <CircularProgress size={24} sx={{ mb: 2 }} />
                    <CustomLoading size={24} sx={{ ml: 2 }} />
                }

                {!imageLoading && imageArray.length < MAX_IMAGES && (
                    <Button
                        component="label"
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{ mb: 2, bgcolor: '#E9692C' }}
                    >
                        Add Image
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </Button>
                )}

                {!showChapters && (
                    <Box >
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => {
                                setShowChapters(true);
                                if (courseData.chapters.length === 0) addChapter();
                            }}
                            sx={{ bgcolor: '#E9692C' }}
                        >
                            Add Chapter
                        </Button>
                    </Box>
                )}

                {showChapters && (
                    <>
                        <Typography variant="h5" mt={4} mb={2}>
                            Chapters
                        </Typography>

                        {courseData.chapters.map((chapter, chapterIdx) => {
                            const allVideosUploaded = chapter.videos.every(v => !!v.videoUri) &&
                                !(videoLoadingIndex && videoLoadingIndex.chapterIdx === chapterIdx);

                            return (
                                <Box
                                    key={chapterIdx}
                                    sx={{
                                        border: '1px solid #ccc',
                                        p: 2,
                                        mb: 3,
                                        borderRadius: 2,
                                        position: 'relative',
                                    }}
                                >
                                    <TextField
                                        label={`Chapter Title ${chapterIdx + 1}`}
                                        fullWidth
                                        sx={{ mb: 2 }}
                                        error={!!errors.chapters?.[chapterIdx]?.title}
                                        helperText={errors.chapters?.[chapterIdx]?.title?.message}
                                        value={chapter.title}
                                        onChange={e => handleChapterChange(chapterIdx, e.target.value)}
                                    />
                                    <IconButton
                                        color="error"
                                        onClick={() => handleRemoveChapter(chapterIdx)}
                                        sx={{ position: 'absolute', top: 8, right: 8 }}
                                        disabled={courseData.chapters.length === 1}
                                    >
                                        <DeleteIcon />
                                    </IconButton>

                                    <Typography variant="subtitle1" mt={2}>Videos</Typography>
                                    {chapter.videos.map((video, videoIdx) => (
                                        <Box key={videoIdx} sx={{ mb: 2 }}>
                                            <TextField
                                                label="Video Title"
                                                fullWidth
                                                sx={{ mb: 1 }}
                                                value={video.videoTitle}
                                                onChange={e => handleVideoChange(chapterIdx, videoIdx, "videoTitle", e.target.value)}
                                            />
                                            <TextField
                                                label="Video Description"
                                                fullWidth
                                                sx={{ mb: 1 }}
                                                value={video.description}
                                                onChange={e => handleVideoChange(chapterIdx, videoIdx, "description", e.target.value)}
                                            />
                                            <Box my={2} alignItems="center">
                                                <input
                                                    type="file"
                                                    accept="video/*"
                                                    onChange={e => handleVideoChange(chapterIdx, videoIdx, "videoUri", e)}
                                                    disabled={
                                                        videoLoadingIndex?.chapterIdx === chapterIdx &&
                                                        videoLoadingIndex?.videoIdx === videoIdx
                                                    }
                                                />
                                                {videoLoadingIndex?.chapterIdx === chapterIdx &&
                                                    videoLoadingIndex?.videoIdx === videoIdx ? (
                                                    // <CircularProgress size={24} sx={{ ml: 2 }}/>
                                                    <CustomLoading size={24} sx={{ ml: 2 }} />
                                                ) : video.videoUri ? (
                                                    <Box marginTop={2}>
                                                        <video
                                                            key={video.videoUri}
                                                            width="80%"
                                                            height="auto"
                                                            controls
                                                        >
                                                            <source src={video.videoUri} />
                                                        </video>
                                                    </Box>
                                                ) : null}
                                                {video.videoTiming && (
                                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                                        Video Duration: {formatVideoTiming(hmsToSeconds(video.videoTiming))}
                                                    </Typography>
                                                )}

                                            </Box>

                                            <Button
                                                color="error"
                                                onClick={() => handleRemoveVideo(chapterIdx, videoIdx)}
                                                disabled={chapter.videos.length === 1}
                                            >
                                                Remove Video
                                            </Button>
                                        </Box>
                                    ))}

                                    {allVideosUploaded && (
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => addVideo(chapterIdx)}
                                            startIcon={<AddIcon />}
                                            sx={{ mt: 1 }}
                                        >
                                            Add Video
                                        </Button>
                                    )}
                                </Box>
                            );
                        })}
                        <Button
                            variant="contained"
                            sx={{ bgcolor: '#E9692C' }}
                            onClick={addChapter} startIcon={<AddIcon />}>
                            Add Chapter
                        </Button> <br />
                    </>
                )}

                <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit(onSubmit)}
                    sx={{ mt: 3 }}
                    disabled={isLoading}
                >
                    {isLoading ? <CustomLoading sx={{ mt: 5, display: 'block', mx: 'auto' }} />
                        : submitText}
                </Button>
            </Container>
        </>
    );
};

export default CourseForm;

