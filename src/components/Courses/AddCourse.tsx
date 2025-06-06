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
import { Controller, useForm } from 'react-hook-form';
import { levelOptions } from '@/lib/utils/constants';
import CustomDropDown from '../UI/CustomDropDown';
import { useCreateCourseMutation } from '@/services/courseAPI';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// --- Types ---
interface Video {
    videoTitle: string;
    description: string;
    videoUri: string;
    videoTiming: string;
}
interface Chapter {
    title: string;
    videos: Video[];
}
interface Course {
    title: string;
    level: string;
    description: string;
    images: string[];
    chapters: Chapter[];
    totalVideosTiming: string;
}

const MAX_IMAGES = 3;

// const defaultVideo: Video = {
//     videoTitle: '',
//     description: '',
//     videoUri: '',
//     videoTiming: '',
// };

// const defaultChapter: Chapter = {
//     title: '',
//     videos: [defaultVideo],
// };

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
            images: [],
            chapters: [],
            totalVideosTiming: '',
        },
    });

    const [videoLoadingIndex, setVideoLoadingIndex] = useState<{ chapterIdx: number; videoIdx: number } | null>(null);

    const [createCourse] = useCreateCourseMutation();

    const [courseData, setCourseData] = useState<Course>({
        title: '',
        level: '',
        description: '',
        images: [],
        chapters: [],
        totalVideosTiming: '',
    });

    const [showChapters, setShowChapters] = useState(false);

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
        const updatedChapters = [...courseData.chapters];
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
                    updatedChapters[chapterIdx].videos[videoIdx].videoUri = data.secure_url;
                    updatedChapters[chapterIdx].videos[videoIdx].videoTiming = secondsToHms(data.duration || 0);
                    handleChange('chapters', updatedChapters);
                } else {
                    console.error("Upload failed:", data);
                }
            } catch (err) {
                console.error("Upload failed:", err);
            } finally {
                setVideoLoadingIndex(null);
            }
        } else if (key === "videoTitle" || key === "description" || key === "videoTiming") {
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
                { videoTitle: '', description: '', videoUri: '', videoTiming: '' }
            ],
        };
        handleChange('chapters', [...courseData.chapters, newChapter]);
    };

    const addVideo = (chapterIdx: number) => {
        const currentVideos = courseData.chapters[chapterIdx].videos;
        const lastVideo = currentVideos[currentVideos.length - 1];
        if (!lastVideo.videoTitle || !lastVideo.videoUri || !lastVideo.videoTiming) {
            alert("Please fill in the current video details first (title, video file, and timing).");
            return;
        }
        const newVideo = { videoTitle: '', description: '', videoUri: '', videoTiming: '' };
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
            });

            const data = await res.json();

            if (data.secure_url) {
                const updatedArray = [...imageArray, data.secure_url];
                setImageArray(updatedArray);

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
            courseData.chapters.length === 0 ||
            courseData.chapters.some(
                ch => !ch.title || ch.videos.length === 0 ||
                    ch.videos.some(v => !v.videoTitle || !v.videoUri || !v.videoTiming)
            )
        ) {
            alert('Please fill all required fields!');
            return false;
        }
        return true;
    };

    const onSubmit = async () => {
        if (!validateCourseData()) return;
        const totalSeconds = getTotalDuration();
        const formatted = secondsToHms(totalSeconds);
        const payload = { ...courseData, totalVideosTiming: formatted };
        try {
            await createCourse(payload).unwrap();
            toast.success("Course Added successfully!");
            setTimeout(() => {
                router.push("/");
            }, 1000);

            setCourseData({
                title: "",
                level: "",
                description: "",
                images: [],
                chapters: [],
                totalVideosTiming: ''
            });
            setShowChapters(false);
            reset();
        } catch (err) {
            toast.error("Failed to Add course.");

        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <ToastContainer />
            <Typography color="#FF9500" variant="h4" fontWeight={700} mb={4}>
                Add Course
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
                                error={!!errors.chapters?.[chapterIdx]?.title}
                                helperText={errors.chapters?.[chapterIdx]?.title?.message}
                                {...register(`chapters.${chapterIdx}.title`, {
                                    required: 'Chapter title is required',
                                    onChange: (e) => handleChapterChange(chapterIdx, e.target.value),
                                })}
                                value={chapter.title}
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
                                        error={!!errors.chapters?.[chapterIdx]?.videos?.[videoIdx]?.videoTitle}
                                        helperText={errors.chapters?.[chapterIdx]?.videos?.[videoIdx]?.videoTitle?.message}
                                        {...register(`chapters.${chapterIdx}.videos.${videoIdx}.videoTitle`, {
                                            required: 'Video title is required',
                                            onChange: (e) => handleVideoChange(chapterIdx, videoIdx, 'videoTitle', e.target.value)
                                        })}
                                    />

                                    <TextField
                                        label="Description"
                                        fullWidth
                                        sx={{ mb: 1 }}
                                        value={video.description}
                                        error={!!errors.chapters?.[chapterIdx]?.videos?.[videoIdx]?.description}
                                        helperText={errors.chapters?.[chapterIdx]?.videos?.[videoIdx]?.description?.message}
                                        {...register(`chapters.${chapterIdx}.videos.${videoIdx}.description`, {
                                            required: 'Description is required',
                                            onChange: (e) => handleVideoChange(
                                                chapterIdx,
                                                videoIdx,
                                                'description',
                                                e.target.value
                                            )
                                        })}
                                    />

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Button
                                            component="label"
                                            variant="outlined"
                                            size="small"
                                            sx={{ mb: 1 }}
                                            disabled={!!videoLoadingIndex && videoLoadingIndex.chapterIdx === chapterIdx && videoLoadingIndex.videoIdx === videoIdx}
                                        >
                                            {video.videoUri ? "Change Video" : "Upload Video"}
                                            <input
                                                type="file"
                                                hidden
                                                accept="video/*"
                                                onChange={(e) => handleVideoChange(chapterIdx, videoIdx, 'videoUri', e)}
                                            />
                                        </Button>
                                        {videoLoadingIndex && videoLoadingIndex.chapterIdx === chapterIdx && videoLoadingIndex.videoIdx === videoIdx && (
                                            <CircularProgress size={20} />
                                        )}
                                        {video.videoUri && (
                                            <video width="50%" height="auto" style={{ marginBottom: 30 }} controls>
                                                <source src={video.videoUri} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        )}
                                    </Box>

                                    <TextField
                                        disabled
                                        label="Video Timing (e.g. 00:08:30)"
                                        fullWidth
                                        sx={{ mb: 1 }}
                                        value={video.videoTiming}
                                        error={!!errors.chapters?.[chapterIdx]?.videos?.[videoIdx]?.videoTiming}
                                        helperText={errors.chapters?.[chapterIdx]?.videos?.[videoIdx]?.videoTiming?.message}
                                        {...register(`chapters.${chapterIdx}.videos.${videoIdx}.videoTiming`, {
                                            required: 'Video timing is required',
                                            onChange: (e) => handleVideoChange(chapterIdx, videoIdx, 'videoTiming', e.target.value)
                                        })}
                                    />

                                    <IconButton
                                        color="error"
                                        onClick={() => handleRemoveVideo(chapterIdx, videoIdx)}
                                        disabled={chapter.videos.length === 1}
                                        title={chapter.videos.length === 1 ? 'At least one video required' : undefined}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            ))}

                            <Button
                                variant="contained"
                                size="small"
                                startIcon={<AddIcon />}
                                onClick={() => addVideo(chapterIdx)}
                                sx={{ mt: 1 }}
                                disabled={
                                    chapter.videos.length > 0 &&
                                    (
                                        !chapter.videos[chapter.videos.length - 1].videoTitle ||
                                        !chapter.videos[chapter.videos.length - 1].videoUri ||
                                        !chapter.videos[chapter.videos.length - 1].videoTiming
                                    )
                                }
                            >
                                Add Video
                            </Button>
                        </Box>
                    ))}

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={addChapter}
                        sx={{ mt: 2, bgcolor: '#E9692C' }}
                    >
                        Add Another Chapter
                    </Button>
                </>
            )}

            {showChapters && (
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                    Total Course Video Timing: <b>{secondsToHms(getTotalDuration())}</b>
                </Typography>
            )}

            <Button
                variant="contained"

                fullWidth
                sx={{ mt: 4, bgcolor: '#E9692C' }}
                onClick={handleSubmit(onSubmit)}
            >
                Create Course
            </Button>

        </Container>
    );
}

export default AddCoursePage;
