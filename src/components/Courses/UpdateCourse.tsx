'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { useGetCourseQuery, useUpdateCourseMutation } from '@/services/courseAPI';
import CustomDropDown from '../UI/CustomDropDown';
import { levelOptions } from '@/lib/utils/constants';
import { Chapter, Video } from '../types/course';

const MAX_IMAGES = 3;

const defaultVideo: Video = { videoTitle: '', description: '', videoUri: '', videoTiming: '' };
const defaultChapter: Chapter = { title: '', videos: [defaultVideo] };

const UpdateCourse = ({ courseID }: { courseID: string }) => {
  const { data, isLoading } = useGetCourseQuery(courseID);

  console.log("data", data);


  const [updateCourse] = useUpdateCourseMutation();
  const router = useRouter();

  const [imageLoadingIndex, setImageLoadingIndex] = useState<number | null>(null);
  const [videoLoadingIndex, setVideoLoadingIndex] = useState<{ chapterIdx: number; videoIdx: number } | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      level: '',
      description: '',
      totalVideosTiming: '',
      images: [''],
      chapters: [defaultChapter],
    },
  });

  const watchImages = useWatch({ control, name: 'images' });
  const watchChapters = useWatch({ control, name: 'chapters' });

  useEffect(() => {
    if (data?.result) {
      reset(data.result);
    }
  }, [data, reset]);

  const onSubmit = async (formData: any) => {
    try {
      const res = await updateCourse({ id: courseID, payload: formData }).unwrap();
      console.log('Course updated successfully:', res);
      router.push('/');
    } catch (err) {
      console.error('Error updating course:', err);
    }
  };

  // Image handlers
  const addImage = () => {
    if (watchImages.length >= MAX_IMAGES) {
      alert('You can only upload a maximum of 3 images.');
      return;
    }
    setValue('images', [...watchImages, '']);
  };

  const removeImage = (index: number) => {
    const updated = watchImages.filter((_, i) => i !== index);
    setValue('images', updated);
  };

  const handleImageChange = async (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImageLoadingIndex(index);

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'images_present');

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dmgkiiaqo/image/upload', {
        method: 'POST',
        body: data,
      });

      if (!res.ok) throw new Error('Upload failed');

      const uploadedUrl = await res.json();
      const updated = [...watchImages];
      updated[index] = uploadedUrl.secure_url;
      setValue('images', updated);
    } catch (err) {
      console.error('Image upload failed', err);
    } finally {
      setImageLoadingIndex(null);
    }
  };

  // Chapter handlers
  const addChapter = () => {
    setValue('chapters', [...watchChapters, defaultChapter]);
  };

  const removeChapter = (index: number) => {
    const updated = watchChapters.filter((_, i) => i !== index);
    setValue('chapters', updated);
  };

  // Video handlers
  const addVideo = (chapterIdx: number) => {
    const updated = [...watchChapters];
    updated[chapterIdx].videos.push({ ...defaultVideo });
    setValue('chapters', updated);
  };

  const removeVideo = (chapterIdx: number, videoIdx: number) => {
    const updated = [...watchChapters];
    updated[chapterIdx].videos.splice(videoIdx, 1);
    setValue('chapters', updated);
  };

  const handleVideoChange = async (
    chapterIdx: number,
    videoIdx: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setVideoLoadingIndex({ chapterIdx, videoIdx });

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'videos_present');

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dmgkiiaqo/video/upload', {
        method: 'POST',
        body: data,
      });

      if (!res.ok) throw new Error('Upload failed');

      const uploadedUrl = await res.json();
      const updated = [...watchChapters];
      updated[chapterIdx].videos[videoIdx].videoUri = uploadedUrl.secure_url;
      setValue('chapters', updated);
    } catch (err) {
      console.error('Video upload failed', err);
    } finally {
      setVideoLoadingIndex(null);
    }
  };

  if (isLoading) return <Box sx={{
    alignSelf: 'center',
    justifySelf: 'center',
    mt: 20,
    display: 'flex'
  }}><CircularProgress size={50} sx={{ margin: 'auto' }} /></Box>

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography color="#FF9500" variant="h4" fontWeight={700} mb={4}>
        Update Course
      </Typography>

      <TextField
        label="Course Title"
        fullWidth
        sx={{ mb: 2 }}
        error={!!errors.title}
        helperText={errors.title?.message}
        {...register('title', { required: 'Title is required' })}
      />

      <Controller
        name="level"
        control={control}
        rules={{ required: 'Level is required' }}
        render={({ field }) => (
          <CustomDropDown
            label="Level"
            value={field.value}
            setValue={field.onChange}
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
        helperText={errors.description?.message}
        {...register('description', { required: 'Description is required' })}
      />

      <TextField
        label="Total Video Timing"
        fullWidth
        sx={{ mb: 2 }}
        error={!!errors.totalVideosTiming}
        helperText={errors.totalVideosTiming?.message}
        {...register('totalVideosTiming', { required: 'Required' })}
      />

      <Typography variant="h6" mt={4}>
        Images
      </Typography>
      {watchImages.map((img, idx) => (
        <Box key={idx} display="flex" alignItems="center" mb={2}>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => handleImageChange(idx, event)}
            disabled={imageLoadingIndex === idx}
          />
          {imageLoadingIndex === idx ? (
            <CircularProgress size={24} sx={{ ml: 2 }} />
          ) : (
            img && <Box component="img" src={img} width={100} height="auto" sx={{ ml: 2, mr: 2 }} />
          )}
          <IconButton color="error" onClick={() => removeImage(idx)} disabled={imageLoadingIndex === idx}>
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
      {watchChapters.map((chapter, chapterIdx) => (
        <Box key={chapterIdx} sx={{ border: '1px solid #ccc', p: 2, mb: 3, borderRadius: 2 }}>
          <TextField
            label={`Chapter Title ${chapterIdx + 1}`}
            fullWidth
            sx={{ mb: 2 }}
            value={chapter.title}
            onChange={(e) => {
              const updated = [...watchChapters];
              updated[chapterIdx].title = e.target.value;
              setValue('chapters', updated);
            }}
          />
          <IconButton
            color="error"
            onClick={() => removeChapter(chapterIdx)}
            disabled={watchChapters.length === 1}
            sx={{ mb: 2 }}
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
                onChange={(e) => {
                  const updated = [...watchChapters];
                  updated[chapterIdx].videos[videoIdx].videoTitle = e.target.value;
                  setValue('chapters', updated);
                }}
              />
              <TextField
                label="Video Description"
                fullWidth
                sx={{ mb: 1 }}
                value={video.description}
                onChange={(e) => {
                  const updated = [...watchChapters];
                  updated[chapterIdx].videos[videoIdx].description = e.target.value;
                  setValue('chapters', updated);
                }}
              />
              <Box my={5} alignItems="center">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleVideoChange(chapterIdx, videoIdx, e)}
                  disabled={
                    videoLoadingIndex?.chapterIdx === chapterIdx &&
                    videoLoadingIndex?.videoIdx === videoIdx
                  }
                />
                {videoLoadingIndex?.chapterIdx === chapterIdx &&
                  videoLoadingIndex?.videoIdx === videoIdx ? (
                  <CircularProgress size={24} sx={{ ml: 2 }} />
                ) : video.videoUri ? (
                  <Box marginTop={6}>
                    <video width="80%" height="auto" controls>
                      <source src={video.videoUri} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </Box>
                ) : null}
              </Box>
              <TextField
                label="Video Timing"
                fullWidth
                value={video.videoTiming}
                onChange={(e) => {
                  const updated = [...watchChapters];
                  updated[chapterIdx].videos[videoIdx].videoTiming = e.target.value;
                  setValue('chapters', updated);
                }}
              />
              <IconButton
                color="error"
                onClick={() => removeVideo(chapterIdx, videoIdx)}
                disabled={chapter.videos.length === 1}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}

          <Button
            variant="outlined"
            onClick={() => addVideo(chapterIdx)}
            startIcon={<AddIcon />}
            sx={{ mt: 1, }}
          >
            Add Video
          </Button>
        </Box>
      ))}

      <Button onClick={addChapter} startIcon={<AddIcon />} sx={{ mt: 2 }}>
        Add Chapter
      </Button>

      <Button variant="contained"
        disabled={isLoading}
        sx={{ mt: 5 }}
        color="warning" fullWidth onClick={handleSubmit(onSubmit)}>
        {isLoading ? "Loading..." : "Update Course"}
      </Button>
    </Container>
  );
};

export default UpdateCourse;
