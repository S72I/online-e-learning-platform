
'use client'
import { useGetCourseQuery } from '@/services/public/publicCourseApi';
import { Box, CircularProgress, Container, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react'
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import CourseDetailPage from '@/components/UI/CourseDetailPage';

const Page = () => {

    return (
      <CourseDetailPage/>
    );
}

export default Page;
