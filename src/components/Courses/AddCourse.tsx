'use client';

import {
    Box,
    Button,
    Container,
    IconButton,
    TextField,
    Typography,
    CircularProgress,
} from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Chapter, Course, Video } from '../types/course';
import { Controller, useForm } from 'react-hook-form';
import { levelOptions } from '@/lib/utils/constants';
import CustomDropDown from '../UI/CustomDropDown';
import { useCreateCourseMutation } from '@/services/courseAPI';
import { useRouter } from 'next/navigation';

const MAX_IMAGES = 3;

const defaultVideo: Video = {
    videoTitle: '',
    lessonNo: '',
    videoUri: '',
    videoTiming: '',
};

const defaultChapter: Chapter = {
    title: '',
    videos: [defaultVideo],
};

function AddCoursePage() {
    const {
        control,
        handleSubmit,
        setValue,
        register,
        reset,
        formState: { errors },
    } = useForm<Course>({
        defaultValues: {
            title: '',
            level: '',
            description: '',
            totalVideosTiming: '',
            images: [''],
            chapters: [defaultChapter],
        },
    });


    const [videoLoadingIndex, setVideoLoadingIndex] = useState<{ chapterIdx: number; videoIdx: number } | null>(null);

    const [createCourse] = useCreateCourseMutation();

    const [courseData, setCourseData] = useState<Course>({
        title: '',
        level: '',
        description: '',
        images: [''],
        totalVideosTiming: '',
        chapters: [defaultChapter],
    });

    const handleChange = (field: keyof Course, value: any) => {
        setCourseData((prev) => ({ ...prev, [field]: value }));
        setValue(field, value, { shouldValidate: true });
    };

    const handleChapterChange = (index: number, value: string) => {
        const updatedChapters = [...courseData.chapters];
        updatedChapters[index].title = value;
        handleChange('chapters', updatedChapters);
    };

    const handleRemoveChapter = (index: number) => {
        const updatedChapters = [...courseData.chapters];
        updatedChapters.splice(index, 1);
        handleChange('chapters', updatedChapters);
    };

    const handleVideoChange = async (
        chapterIdx: number,
        videoIdx: number,
        key: keyof Video,
        event: any
    ) => {
        if (key === "videoUri") {
            const file = event.target.files?.[0];
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
                    const updatedChapters = [...courseData.chapters];
                    updatedChapters[chapterIdx].videos[videoIdx][key] = data.secure_url;

                    handleChange('chapters', updatedChapters);
                } else {
                    console.error("Upload failed:", data);
                }
            } catch (err) {
                console.error("Upload failed:", err);
            } finally {
                setVideoLoadingIndex(null);
            }
        }
        else {
            const updatedChapters = [...courseData.chapters];
            updatedChapters[chapterIdx].videos[videoIdx][key] = event;
            handleChange('chapters', updatedChapters);
        }
    };


    const handleRemoveVideo = (chapterIdx: number, videoIdx: number) => {
        const updatedChapters = [...courseData.chapters];
        updatedChapters[chapterIdx].videos.splice(videoIdx, 1);
        handleChange('chapters', updatedChapters);
    };

    const addChapter = () => {
        const newChapter: Chapter = {
            title: '',
            videos: [
                { videoTitle: '', lessonNo: '', videoUri: '', videoTiming: '' }
            ],
        };
        handleChange('chapters', [...courseData.chapters, newChapter]);
    };


    const addVideo = (chapterIdx: number) => {
        const newVideo = { videoTitle: '', lessonNo: '', videoUri: '', videoTiming: '' };
        const updatedChapters = [...courseData.chapters];
        const updatedChapter = { ...updatedChapters[chapterIdx] };
        updatedChapter.videos = [...updatedChapter.videos, newVideo];
        updatedChapters[chapterIdx] = updatedChapter;
        handleChange('chapters', updatedChapters);
    };

    const [imageArray, setImageArray] = useState<string[]>([]);
    const [imageLoading, setImageLoading] = useState(false);

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        if (imageArray.length >= MAX_IMAGES) {
            alert(`You can upload up to ${MAX_IMAGES} images.`);
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
            }
            );

            const data = await res.json();

            if (data.secure_url) {
                const updatedArray = [...imageArray, data.secure_url];
                setImageArray(updatedArray);

                // Update your course data with the new images array
                setCourseData((prev) => ({
                    ...prev,
                    images: updatedArray,
                }));
            } else {
                console.error("Upload failed:", data);
            }
        } catch (err) {
            console.error("Upload error:", err);
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
    };

    const addImage = () => {
        if (courseData.images.length < MAX_IMAGES) {
            handleChange('images', [...courseData.images, '']);
        } else {
            alert('You can only upload a maximum of 3 images.');
        }
    };

    const router = useRouter();


    const onSubmit = async () => {
        try {
            const res = await createCourse(courseData).unwrap();
            console.log("Course created successfully:", res);
            reset();
            router.push("/")
            setCourseData({
                title: "",
                level: "",
                description: "",
                totalVideosTiming: "",
                images: [],
                chapters: [defaultChapter],
            });
        } catch (err: any) {
            console.error("Error creating course:", err.message || err);
        }
    };


    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Typography color="#FF9500" variant="h4" fontWeight={700} mb={4}>
                Add Course
            </Typography>

            {/* <TextField
                label="Course Educator"
                fullWidth
                sx={{ mb: 2 }}
                error={!!errors.courseEducator}
                helperText={errors.courseEducator && 'courseEducator name is required'}
                {...register('courseEducator', {
                    required: 'courseEducator name is required',
                    onChange: (e) => handleChange('courseEducator', e.target.value),
                })}
                value={courseData.courseEducator}
            /> */}
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
                label="Total Video Timing (e.g. 3:25)"
                fullWidth
                sx={{ mb: 2 }}
                error={!!errors.totalVideosTiming}
                helperText={errors.totalVideosTiming && 'Total video timing is required'}
                {...register('totalVideosTiming', {
                    required: 'Total video timing is required',
                    onChange: (e) => handleChange('totalVideosTiming', e.target.value),
                })}
                value={courseData.totalVideosTiming}
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

            {imageLoading && <CircularProgress size={24} sx={{ mb: 2 }} />}

            {!imageLoading && imageArray.length < MAX_IMAGES && (
                <Button
                    component="label"
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{ mb: 2 }}
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

            <Typography variant="h5" mt={4} mb={2}>
                Chapters
            </Typography>

            {courseData.chapters.map((chapter, chapterIdx) => (
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
                        value={chapter.title}
                        onChange={(e) => handleChapterChange(chapterIdx, e.target.value)}
                    />

                    <IconButton
                        color="error"
                        onClick={() => handleRemoveChapter(chapterIdx)}
                        sx={{ position: 'absolute', top: 8, right: 8 }}
                        disabled={courseData.chapters.length === 1}
                        title={
                            courseData.chapters.length === 1
                                ? 'At least one chapter required'
                                : undefined
                        }
                    >
                        <DeleteIcon />
                    </IconButton>

                    {chapter.videos.map((video, videoIdx) => (
                        <Box key={videoIdx} sx={{ mb: 2 }}>
                            <TextField
                                label="Video Title"
                                fullWidth
                                sx={{ mb: 1 }}
                                value={video.videoTitle}
                                onChange={(e) =>
                                    handleVideoChange(chapterIdx, videoIdx, 'videoTitle', e.target.value)
                                }
                            />

                            <TextField
                                label="lessonNo"
                                type='number'
                                fullWidth
                                sx={{ mb: 1 }}
                                value={video.lessonNo}
                                onChange={(e) =>
                                    handleVideoChange(
                                        chapterIdx,
                                        videoIdx,
                                        'lessonNo',
                                        e.target.value
                                    )
                                }
                            />

                            <TextField
                                label="Video Timing (e.g. 3:25)"
                                fullWidth
                                sx={{ mb: 1 }}
                                value={video.videoTiming}
                                onChange={(e) =>
                                    handleVideoChange(chapterIdx, videoIdx, 'videoTiming', e.target.value)
                                }
                            />

                            <input
                                type="file"
                                onChange={(event) => handleVideoChange(chapterIdx, videoIdx, 'videoUri', event)}
                                accept="video/*"
                                disabled={
                                    videoLoadingIndex?.chapterIdx === chapterIdx &&
                                    videoLoadingIndex?.videoIdx === videoIdx
                                }
                            />
                            {videoLoadingIndex?.chapterIdx === chapterIdx &&
                                videoLoadingIndex?.videoIdx === videoIdx ? (
                                <CircularProgress size={24} sx={{ ml: 2 }} />
                            ) : video.videoUri ? (
                                <video width="80%" height="auto" controls>
                                    <source src={video.videoUri} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (video.videoUri == "" ? "Select Video" : "loading...")}

                            <IconButton
                                color="error"
                                onClick={() => handleRemoveVideo(chapterIdx, videoIdx)}
                                sx={{ mt: 2 }}
                                disabled={chapter.videos.length === 1}
                                title={
                                    chapter.videos.length === 1
                                        ? 'At least one video required'
                                        : undefined
                                }
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ))}
                    <Button onClick={() => addVideo(chapterIdx)} size="small">
                        + Add Video
                    </Button>
                </Box>
            ))}

            <Button onClick={addChapter} startIcon={<AddIcon />} sx={{ mt: 2 }}>
                Add Chapter
            </Button>

            <Box mt={5}>
                <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={handleSubmit(onSubmit)}
                >
                    Submit Course
                </Button>
            </Box>
        </Container>
    );
}

export default AddCoursePage