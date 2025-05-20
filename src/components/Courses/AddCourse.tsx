'use client';

import {
    Box,
    Button,
    Container,
    IconButton,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Chapter, Course, Video } from '../types/course';
import { Controller, useForm } from 'react-hook-form';
import { levelOptions } from '@/lib/utils/constants';
import CustomDropDown from '../UI/CustomDropDown';
import { useCreateCourseMutation } from '@/services/courseAPI';
import { CldUploadWidget } from 'next-cloudinary';

const MAX_IMAGES = 3;

const defaultVideo: Video = {
    title: '',
    description: '',
    uri: '',
    uriTiming: '',
};

const defaultChapter: Chapter = {
    title: '',
    videoUri: [defaultVideo],
};

export default function AddCoursePage() {
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

    const [createCourse] = useCreateCourseMutation();

    // We keep local state to allow dynamic changes
    const [courseData, setCourseData] = useState<Course>({
        title: '',
        level: '',
        description: '',
        images: [''],
        totalVideosTiming: '',
        chapters: [defaultChapter],
    });

    // Sync form values into courseData state (if needed)
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

    const handleVideoChange = (
        chapterIdx: number,
        videoIdx: number,
        key: keyof Video,
        value: string
    ) => {
        const updatedChapters = [...courseData.chapters];
        updatedChapters[chapterIdx].videoUri[videoIdx][key] = value;
        handleChange('chapters', updatedChapters);
    };

    const handleRemoveVideo = (chapterIdx: number, videoIdx: number) => {
        const updatedChapters = [...courseData.chapters];
        updatedChapters[chapterIdx].videoUri.splice(videoIdx, 1);
        handleChange('chapters', updatedChapters);
    };

    const addChapter = () => {
        const newChapter: Chapter = {
            title: '',
            videoUri: [
                { title: '', description: '', uri: '', uriTiming: '' }
            ],
        };
        handleChange('chapters', [...courseData.chapters, newChapter]);
    };


    const addVideo = (chapterIdx: number) => {
        const newVideo = { title: '', description: '', uri: '', uriTiming: '' };
        const updatedChapters = [...courseData.chapters];
        const updatedChapter = { ...updatedChapters[chapterIdx] };
        updatedChapter.videoUri = [...updatedChapter.videoUri, newVideo];
        updatedChapters[chapterIdx] = updatedChapter;
        handleChange('chapters', updatedChapters);
    };

    const handleImageChange = (index: number, value: string) => {
        const updatedImages = [...courseData.images];
        updatedImages[index] = value;
        handleChange('images', updatedImages);
    };

    const handleRemoveImage = (index: number) => {
        handleChange(
            'images',
            courseData.images.filter((_, idx) => idx !== index)
        );
    };

    const addImage = () => {
        if (courseData.images.length < MAX_IMAGES) {
            handleChange('images', [...courseData.images, '']);
        } else {
            alert('You can only upload a maximum of 3 images.');
        }
    };

    // const onSubmit = async (data: Course) => {
    //     try {
    //         const res = await createCourse(courseData).unwrap();
    //         console.log('Course created successfully:', res);
    //     } catch (err: any) {
    //         console.error('Error creating course:', err);
    //     }
    // };


    const onSubmit = async (data: Course) => {
        try {
            const res = await createCourse(courseData).unwrap();
            console.log('Course created successfully:', res);

            // Reset react-hook-form fields
            reset();

            // Reset local state to default values
            setCourseData({
                title: '',
                level: '',
                description: '',
                totalVideosTiming: '',
                images: [''],
                chapters: [defaultChapter],
            });
        } catch (err: any) {
            console.error('Error creating course:', err);
        }
    };


    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
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

            <TextField
                label="Total Video Timing"
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

            {courseData.images.map((img, idx) => (
                <Box display="flex" alignItems="center" mb={2} key={idx}>
                    <CldUploadWidget
                        uploadPreset="cloudinaryDemo"
                        onSuccess={(result: any) => {
                            const imageUrl = result?.info?.url;
                            if (imageUrl) {
                                handleImageChange(idx, imageUrl);
                            }
                        }}
                    >
                        {({ open }) => (
                            <Button variant="outlined" onClick={() => open()} sx={{ mr: 2 }}>
                                Upload an Image
                            </Button>
                        )}
                    </CldUploadWidget>

                    {img && (
                        <Box
                            component="img"
                            src={img}
                            alt={`Uploaded Image ${idx}`}
                            width={100}
                            height="auto"
                            sx={{ mr: 2 }}
                        />
                    )}

                    <IconButton color="error" onClick={() => handleRemoveImage(idx)}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ))}

            <Button onClick={addImage} startIcon={<AddIcon />} sx={{ mb: 4 }}>
                Add Image
            </Button>

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

                    {chapter.videoUri.map((video, videoIdx) => (
                        <Box key={videoIdx} sx={{ mb: 2 }}>
                            <TextField
                                label="Video Title"
                                fullWidth
                                sx={{ mb: 1 }}
                                value={video.title}
                                onChange={(e) =>
                                    handleVideoChange(chapterIdx, videoIdx, 'title', e.target.value)
                                }
                            />

                            <TextField
                                label="Video Description"
                                fullWidth
                                sx={{ mb: 1 }}
                                value={video.description}
                                onChange={(e) =>
                                    handleVideoChange(
                                        chapterIdx,
                                        videoIdx,
                                        'description',
                                        e.target.value
                                    )
                                }
                            />

                            <TextField
                                label="Video Timing (e.g. 3:25)"
                                fullWidth
                                sx={{ mb: 1 }}
                                value={video.uriTiming}
                                onChange={(e) =>
                                    handleVideoChange(chapterIdx, videoIdx, 'uriTiming', e.target.value)
                                }
                            />

                            <CldUploadWidget
                                uploadPreset="cloudinaryDemo"
                                options={{ resourceType: 'video' }}
                                onSuccess={(result: any) => {
                                    const videoUrl = result?.info?.secure_url;
                                    if (videoUrl) {
                                        handleVideoChange(chapterIdx, videoIdx, 'uri', videoUrl);
                                    }
                                }}
                            >
                                {({ open }) => (
                                    <Button
                                        variant="contained"
                                        onClick={() => open()}
                                        sx={{ mb: 2, mr: 2 }}
                                    >
                                        Upload Video
                                    </Button>
                                )}
                            </CldUploadWidget>

                            {video.uri && (
                                <video width="80%" height="auto" controls>
                                    <source src={video.uri} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            )}

                            <IconButton
                                color="error"
                                onClick={() => handleRemoveVideo(chapterIdx, videoIdx)}
                                sx={{ mt: 2 }}
                                disabled={chapter.videoUri.length === 1}
                                title={
                                    chapter.videoUri.length === 1
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
