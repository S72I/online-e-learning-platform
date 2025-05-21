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
import { Controller, useForm } from 'react-hook-form';
import { levelOptions } from '@/lib/utils/constants';
import CustomDropDown from '../UI/CustomDropDown';
import { CldUploadWidget } from 'next-cloudinary';
import { useRouter } from 'next/navigation';

const MAX_IMAGES = 3;

const defaultVideo: Video = { title: '', description: '', uri: '', uriTiming: '' };
const defaultChapter: Chapter = { title: '', videoUri: [defaultVideo] };

const UpdateCourse = ({ courseID }: any) => {
  const { data, isLoading } = useGetCourseQuery(courseID);
  const [updateTask] = useUpdateCourseMutation();
  const router = useRouter();

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

  useEffect(() => {
    if (data?.findId) {
      reset(data.findId);
    }
  }, [data, reset]);

  const onSubmit = async (formData: Course) => {

    const payload = {
      ...formData,
    }

    try {
      const res = await updateTask({ id: courseID, payload }).unwrap();
      console.log('Course updated successfully:', res);
      router.push('/');
    } catch (err) {
      console.error('Error updating course:', err);
    }
  };

  const handleImageChange = (index: number, url: string) => {
    const images = [...control._formValues.images];
    images[index] = url;
    setValue('images', images);
  };

  const addImage = () => {
    const images = control._formValues.images || [];
    if (images.length >= MAX_IMAGES) {
      alert('You can only upload a maximum of 3 images.');
      return;
    }
    setValue('images', [...images, '']);
  };

  const removeImage = (index: number) => {
    const images = control._formValues.images.filter((_: any, i: any) => i !== index);
    setValue('images', images);
  };

  const addChapter = () => {
    const chapters = [...control._formValues.chapters];
    chapters.push(defaultChapter);
    setValue('chapters', chapters);
  };

  const removeChapter = (index: number) => {
    const chapters = control._formValues.chapters.filter((_: any, i: any) => i !== index);
    setValue('chapters', chapters);
  };

  const addVideo = (chapterIdx: number) => {
    const chapters = [...control._formValues.chapters];
    chapters[chapterIdx].videoUri.push({ ...defaultVideo });
    setValue('chapters', chapters);
  };

  const removeVideo = (chapterIdx: number, videoIdx: number) => {
    const chapters = [...control._formValues.chapters];
    chapters[chapterIdx].videoUri.splice(videoIdx, 1);
    setValue('chapters', chapters);
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
      {(control._formValues.images || []).map((img: any, idx: any) => (
        <Box key={idx} display="flex" alignItems="center" mb={2}>
          <CldUploadWidget
            uploadPreset="cloudinaryDemo"
            onSuccess={(res: any) => handleImageChange(idx, res.info.secure_url)}
          >
            {({ open }) => (
              <Button variant="outlined" onClick={() => open()} sx={{ mr: 2 }}>
                Upload Image
              </Button>
            )}
          </CldUploadWidget>
          {img && (
            <Box component="img" src={img} width={100} height="auto" sx={{ mr: 2 }} />
          )}
          <IconButton color="error" onClick={() => removeImage(idx)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      <Button onClick={addImage} startIcon={<AddIcon />} sx={{ mb: 4 }}>
        Add Image
      </Button>

      <Typography variant="h5" mt={4} mb={2}>Chapters</Typography>
      {(control._formValues.chapters || []).map((chapter: any, chapterIdx: any) => (
        <Box key={chapterIdx} sx={{ border: '1px solid #ccc', p: 2, mb: 3, borderRadius: 2 }}>
          <TextField
            label={`Chapter Title ${chapterIdx + 1}`}
            fullWidth
            sx={{ mb: 2 }}
            value={chapter.title}
            onChange={(e) => {
              const chapters = [...control._formValues.chapters];
              chapters[chapterIdx].title = e.target.value;
              setValue('chapters', chapters);
            }}
          />
          <IconButton
            color="error"
            onClick={() => removeChapter(chapterIdx)}
            disabled={control._formValues.chapters.length === 1}
          >
            <DeleteIcon />
          </IconButton>

          {chapter.videoUri.map((video: any, videoIdx: any) => (
            <Box key={videoIdx} sx={{ mb: 2 }}>
              <TextField
                label="Video Title"
                fullWidth
                value={video.title}
                sx={{ mb: 1 }}
                onChange={(e) => {
                  const chapters = [...control._formValues.chapters];
                  chapters[chapterIdx].videoUri[videoIdx].title = e.target.value;
                  setValue('chapters', chapters);
                }}
              />
              <TextField
                label="Video Description"
                fullWidth
                value={video.description}
                sx={{ mb: 1 }}
                onChange={(e) => {
                  const chapters = [...control._formValues.chapters];
                  chapters[chapterIdx].videoUri[videoIdx].description = e.target.value;
                  setValue('chapters', chapters);
                }}
              />
              <TextField
                label="Video Timing"
                fullWidth
                value={video.uriTiming}
                sx={{ mb: 1 }}
                onChange={(e) => {
                  const chapters = [...control._formValues.chapters];
                  chapters[chapterIdx].videoUri[videoIdx].uriTiming = e.target.value;
                  setValue('chapters', chapters);
                }}
              />

              <CldUploadWidget
                uploadPreset="cloudinaryDemo"
                options={{ resourceType: 'video' }}
                onSuccess={(res: any) => {
                  const videoUrl = res?.info?.secure_url;
                  if (videoUrl) {
                    const chapters = [...control._formValues.chapters];
                    chapters[chapterIdx].videoUri[videoIdx].uri = videoUrl;
                    setValue('chapters', chapters);
                  }
                }}
              >
                {({ open }) => (
                  <Button variant="contained" onClick={() => open()} sx={{ mb: 2, mr: 2 }}>
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
                onClick={() => removeVideo(chapterIdx, videoIdx)}
                disabled={chapter.videoUri.length === 1}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}

          <Button onClick={() => addVideo(chapterIdx)} size="small">+ Add Video</Button>
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