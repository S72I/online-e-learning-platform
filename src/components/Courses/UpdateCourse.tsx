'use client'
import { useGetCourseQuery, useCreateCourseMutation, useUpdateCourseMutation } from '@/services/courseAPI';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Chapter, Course, Video } from '../types/course';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { levelOptions } from '@/lib/utils/constants';
import CustomDropDown from '../UI/CustomDropDown';
import { CldUploadWidget } from 'next-cloudinary';
import { useRouter } from 'next/navigation';



const MAX_IMAGES = 3;

const defaultVideo = { title: '', description: '', uri: '', uriTiming: '' };
const defaultChapter = { title: '', videoUri: [defaultVideo] };

const UpdateCourse = ({ courseID }: any) => {
  const { data, isLoading } = useGetCourseQuery(courseID);
  const [updateCourse] = useUpdateCourseMutation();
  const router = useRouter();

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
    if (data?.findId) {
      reset(data.findId);
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

  const handleImageChange = async (index: number, event: any) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log("Selected file:", file);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "images_present");
    const res = await fetch("https://api.cloudinary.com/v1_1/dmgkiiaqo/image/upload", {
      method: "POST",
      body: data,
    });

    if (!res.ok) {
      throw new Error(`Upload failed: ${res.status}`);
    }

    const uploadedUrl = await res.json();

    console.log("uploadedUrl.secure_url", uploadedUrl.secure_url);

    const updated = [...watchImages];
    updated[index] = uploadedUrl.secure_url;

    setValue('images', updated);
  };


  const addChapter = () => {
    setValue('chapters', [...watchChapters, defaultChapter]);
  };

  const removeChapter = (index: number) => {
    const updated = watchChapters.filter((_, i) => i !== index);
    setValue('chapters', updated);
  };

  const addVideo = (chapterIdx: number) => {
    const updated = [...watchChapters];
    updated[chapterIdx].videoUri.push({ ...defaultVideo });
    setValue('chapters', updated);
  };

  const removeVideo = (chapterIdx: number, videoIdx: number) => {
    const updated = [...watchChapters];
    updated[chapterIdx].videoUri.splice(videoIdx, 1);
    setValue('chapters', updated);
  };

  if (isLoading) return <Typography>Loading...</Typography>;

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

      <Typography variant="h6" mt={4}>Images</Typography>
      {watchImages.map((img, idx) => (
        <Box key={idx} display="flex" alignItems="center" mb={2}>
          <input type="file" accept='image/*' onChange={(event: any) => handleImageChange(idx, event)} />
          {img && <Box component="img" src={img} width={100} height="auto" sx={{ mr: 2 }} />}
          <IconButton color="error" onClick={() => removeImage(idx)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      <Button onClick={addImage} startIcon={<AddIcon />} sx={{ mb: 4 }}>
        Add Image
      </Button>

      <Typography variant="h5" mt={4} mb={2}>Chapters</Typography>
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
                onChange={(e) => {
                  const updated = [...watchChapters];
                  updated[chapterIdx].videoUri[videoIdx].title = e.target.value;
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
                  updated[chapterIdx].videoUri[videoIdx].description = e.target.value;
                  setValue('chapters', updated);
                }}
              />
              <TextField
                label="Video Timing"
                fullWidth
                sx={{ mb: 1 }}
                value={video.uriTiming}
                onChange={(e) => {
                  const updated = [...watchChapters];
                  updated[chapterIdx].videoUri[videoIdx].uriTiming = e.target.value;
                  setValue('chapters', updated);
                }}
              />
              <input
                type="file"
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;

                  console.log("Selected file:", file);

                  const data = new FormData();
                  data.append("file", file);
                  data.append("upload_preset", "videos_present");
                  const res = await fetch("https://api.cloudinary.com/v1_1/dmgkiiaqo/video/upload", {
                    method: "POST",
                    body: data,
                  });

                  if (!res.ok) {
                    throw new Error(`Upload failed: ${res.status}`);
                  }

                  const uploadedUrl = await res.json();

                  const updated = [...watchChapters];
                  updated[chapterIdx].videoUri[videoIdx].uri = uploadedUrl.secure_url;
                  setValue('chapters', updated);
                }}
                accept="video/*"
              />
              {video.uri && (
                <video width="80%" controls>
                  <source src={video.uri} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              <IconButton
                color="error"
                onClick={() => removeVideo(chapterIdx, videoIdx)}
                disabled={chapter.videoUri.length === 1}
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
};

export default UpdateCourse;