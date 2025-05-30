
'use client'
import { useGetCourseQuery } from '@/services/public/publicCourseApi';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react'
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';

const Page = () => {
    const params = useParams();
    const { data, isLoading, isError } = useGetCourseQuery(params.id);

    console.log("data", data);

    return (
        <>
            {isLoading ? (
                <Typography sx={{ mt: 5, textAlign: 'center' }}>Loading courses...</Typography>
            ) : isError ? (
                <Typography sx={{ mt: 5, textAlign: 'center' }}>Failed to load courses</Typography>
            ) : !data?.findId ? (
                <Typography sx={{ mt: 5, textAlign: 'center' }}>No course available</Typography>
            ) : (




                // ...inside your component
                <Grid container spacing={2} sx={{ mt: 5, px: { md: 4, xs: 2, lg: 6, xl: 6 } }}>
                    {data?.result?.chapters?.map((chapter: any, idx: number) => (
                        <Grid item xs={12} key={chapter._id || idx}>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                {chapter.title}
                            </Typography>
                            {chapter.videos?.map((video: any) => (
                                <div key={video._id} style={{ marginBottom: 16 }}>
                                    <Typography variant="subtitle1">{video.videoTitle}</Typography>
                                    <video width="320" height="180" controls style={{ display: "block", marginBottom: 8 }}>
                                        <source src={video.videoUri} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                    <Typography variant="body2">
                                        Lesson: {video.lessonNo} | Duration: {video.videoTiming} min
                                    </Typography>
                                </div>
                            ))}
                        </Grid>
                    ))}
                </Grid>

            )}
        </>
    );
}

export default Page;
