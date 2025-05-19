'use client';

import {
    Box, Button, Container, IconButton, TextField, Typography
} from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Chapter, Course, Video } from '../types/course';
import { Controller, useForm } from 'react-hook-form';
import { levelOptions } from '@/lib/utils/constants';
import CustomDropDown from '../UI/CustomDropDown';
import { useCreateCourseMutation } from '@/services/courseAPI';

const MAX_IMAGES = 3;

const defaultVideo: Video = {
    title: '',
    description: '',
    uri: '',
    uriTiming: ''
};

const defaultChapter: Chapter = {
    title: '',
    videoUri: [defaultVideo]
};

export default function AddCoursePage() {
    const {
        control,
        handleSubmit,
        setValue,
        register,
        formState: { errors }
    } = useForm({
        defaultValues: {
            level: '',
            title: '',
            description: '',
            totalVideosTiming: ''
        }
    });

    const [courseData, setCourseData] = useState<Course>({
        title: '',
        level: '',
        description: '',
        images: [''],
        totalVideosTiming: '',
        chapters: [defaultChapter]
    });

    const [createCourse] = useCreateCourseMutation();

    const handleChange = (field: keyof Course, value: string | string[]) => {
        setCourseData(prev => ({ ...prev, [field]: value }));
    };

    // const handleImageChange = (index: number, value: string) => {
    //     const updatedImages = [...courseData.images];
    //     updatedImages[index] = value;
    //     handleChange('images', updatedImages);
    // };
    const handleImageChange = (index: number, value: string) => {
        const updatedImages = [...courseData.images];
        updatedImages[index] = value;
        handleChange('images', updatedImages);
    };

    const handleRemoveImage = (index: number) => {
        const updatedImages = [...courseData.images];
        updatedImages.splice(index, 1);
        handleChange('images', updatedImages);
    };

    const handleChapterChange = (index: number, value: string) => {
        const updatedChapters = [...courseData.chapters];
        updatedChapters[index].title = value;
        setCourseData(prev => ({ ...prev, chapters: updatedChapters }));
    };

    const handleRemoveChapter = (index: number) => {
        const updatedChapters = [...courseData.chapters];
        updatedChapters.splice(index, 1);
        setCourseData(prev => ({ ...prev, chapters: updatedChapters }));
    };

    const handleVideoChange = (
        chapterIdx: number,
        videoIdx: number,
        key: keyof Video,
        value: string
    ) => {
        const updatedChapters = [...courseData.chapters];
        updatedChapters[chapterIdx].videoUri[videoIdx][key] = value;
        setCourseData(prev => ({ ...prev, chapters: updatedChapters }));
    };

    const handleRemoveVideo = (chapterIdx: number, videoIdx: number) => {
        const updatedChapters = [...courseData.chapters];
        updatedChapters[chapterIdx].videoUri.splice(videoIdx, 1);
        setCourseData(prev => ({ ...prev, chapters: updatedChapters }));
    };

    const addImage = () => {
        if (courseData.images.length < MAX_IMAGES) {
            handleChange('images', [...courseData.images, '']);
        } else {
            alert('You can only upload a maximum of 3 images.');
        }
    };
    const addChapter = () => {
        setCourseData(prev => ({
            ...prev,
            chapters: [...prev.chapters, { title: '', videoUri: [defaultVideo] }]
        }));
    };

    const addVideo = (chapterIdx: number) => {
        const updatedChapters = [...courseData.chapters];
        updatedChapters[chapterIdx].videoUri.push({ ...defaultVideo });
        setCourseData(prev => ({ ...prev, chapters: updatedChapters }));
    };

    const onSubmit = async () => {
        try {
            const res = await createCourse(courseData).unwrap();
            console.log('Course created successfully:', res);
        } catch (err) {
            console.error('Error creating course:', err);
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Typography color='#FF9500' variant="h4" fontWeight={700} mb={4}>
                Add Course
            </Typography>

            <TextField
                label="Course Title"
                fullWidth
                sx={{ mb: 2 }}
                value={courseData.title}
                error={!!errors.title}
                helperText={errors.title && "Title is required"}
                {...register('title', {
                    required: true,
                    onChange: (e) => handleChange('title', e.target.value)
                })}
            />

            <Controller
                name="level"
                control={control}
                rules={{ required: "Level is required" }}
                render={({ field }) => (
                    <CustomDropDown
                        label="Level"
                        value={courseData.level}
                        setValue={(val: any) => {
                            setValue('level', val);
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
                value={courseData.description}
                error={!!errors.description}
                helperText={errors.description && "Description is required"}
                {...register('description', {
                    required: true,
                    onChange: (e) => handleChange('description', e.target.value)
                })}
            />

            <TextField
                label="Total Video Timing"
                fullWidth
                sx={{ mb: 2 }}
                value={courseData.totalVideosTiming}
                error={!!errors.totalVideosTiming}
                helperText={errors.totalVideosTiming && "Total video timing is required"}
                {...register('totalVideosTiming', {
                    required: true,
                    onChange: (e) => handleChange('totalVideosTiming', e.target.value)
                })}
            />

            <Typography variant="h6" mt={4}>
                Images
            </Typography>

            {courseData.images.map((img, idx) => (
                <Box display="flex" alignItems="center" mb={2} key={idx}>
                    <Button variant="contained" component="label" sx={{ mr: 2 }}>
                        Upload Image
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const fileUrl = URL.createObjectURL(file);
                                    handleImageChange(idx, fileUrl);
                                }
                            }}
                        />
                    </Button>
                    {img && (
                        <Box component="img" src={img} alt={`Image ${idx}`} width={100} height="auto" />
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
                <Box key={chapterIdx} sx={{ border: '1px solid #ccc', p: 2, mb: 3, borderRadius: 2, position: 'relative' }}>
                    <TextField
                        label={`Chapter Title ${chapterIdx + 1}`}
                        fullWidth
                        sx={{ mb: 2 }}
                        value={chapter.title}
                        onChange={e => handleChapterChange(chapterIdx, e.target.value)}
                    />

                    <IconButton
                        color="error"
                        onClick={() => handleRemoveChapter(chapterIdx)}
                        sx={{ position: 'absolute', top: 8, right: 8 }}
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
                                onChange={e => handleVideoChange(chapterIdx, videoIdx, 'title', e.target.value)}
                            />

                            <Button variant="contained" component="label" sx={{ mb: 2, mr: 2 }}>
                                Upload Video
                                <input
                                    type="file"
                                    accept="video/*"
                                    hidden
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const fileUrl = URL.createObjectURL(file);
                                            handleVideoChange(chapterIdx, videoIdx, 'uri', fileUrl);
                                        }
                                    }}
                                />
                            </Button>
                            {video.uri && (
                                <video width="100%" height="auto" controls>
                                    <source src={video.uri} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            )}

                            <IconButton
                                color="error"
                                onClick={() => handleRemoveVideo(chapterIdx, videoIdx)}
                                sx={{ mt: 2 }}
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
                <Button variant="contained" size="large" color="primary" onClick={handleSubmit(onSubmit)}>
                    Submit Course
                </Button>
            </Box>
        </Container>
    );
}