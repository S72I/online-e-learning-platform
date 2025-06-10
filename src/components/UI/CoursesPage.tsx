'use client'
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import SectionHeader from './SectionHeader'
import Image from 'next/image'
import { useGetCoursesQuery, useGetPurchasedCoursesQuery } from '@/services/public/publicCourseApi'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { IChapter, ICourse } from '../types/course'
import CustomLoading from './CustomLoading'


const CoursesPage = () => {
    const [title, setTitle] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'' | 'asc' | 'desc'>('');
    const { currentUserId } = useAuth()

    const { data, isLoading, isError } = currentUserId ? useGetPurchasedCoursesQuery(currentUserId) : useGetCoursesQuery({ title, sortOrder });

    const router = useRouter();

    const handelViewAll = (courseId: string) => {
        router.push(`/courses/${courseId}`)
    }


    function formatVideoTiming(totalVideosTiming: string): string {

        let totalSeconds: number;

        if (totalVideosTiming.includes(":")) {
            const [minutes, seconds] = totalVideosTiming.split(":").map(Number);
            totalSeconds = minutes * 60 + seconds;
        } else {
            totalSeconds = parseInt(totalVideosTiming) || 0;
        }

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);

        const ss = seconds.toString().padStart(2, '0');
        const mm = minutes.toString().padStart(2, '0');
        const hh = hours.toString().padStart(2, '0');

        if (hours > 0) {
            return `${hh}:${mm} minutes`;
        } else if (minutes > 0) {
            return `${mm}:${ss} seconds`;
        } else {
            return `00:${ss} seconds`;
        }
    }

    return (
        <Container maxWidth={false} >
            <Box >
                {isLoading ? (
                    <Typography sx={{ mt: 5, textAlign: 'center' }}>
                        {/* <CircularProgress /> */}
                        <CustomLoading sx={{ mt: 5, display: 'block', mx: 'auto' }} />

                    </Typography>
                ) : isError ? (
                    <Typography sx={{ mt: 5, textAlign: 'center' }}>Failed to load courses</Typography>
                ) : !data?.courses || data.courses.length === 0 ? (
                    <Typography sx={{ mt: 5, textAlign: 'center' }}>No courses found</Typography>
                ) : (
                    <Grid container spacing={2} mt={12} sx={{ px: { md: 4, xs: 2, lg: 6, xl: 6 } }}>
                        {

                            data?.courses.map((course: ICourse, index: number) => (
                                <Grid
                                    key={index}
                                    sx={{
                                        bgcolor: "white",
                                        borderRadius: 2,
                                        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                                        height: "auto", overflow: "hidden", width: "100%",
                                    }}>
                                    <SectionHeader
                                        title={course.title}
                                        description={course.description}
                                        action={
                                            <Button onClick={() => handelViewAll(course._id)} sx={{ border: "0.2px solid", px: 3, bgcolor: "#FCFCFD", borderColor: "transparent", fontSize: 13, }}>
                                                View All
                                            </Button>
                                        }
                                    />
                                    <Stack direction={'row'} sx={{ width: "100%", px: 6, overflow: 'hidden' }}>
                                        {
                                            course.images.map((images: string, i: number) => (
                                                <Image
                                                    unoptimized
                                                    key={i}
                                                    src={images}
                                                    alt="Sarah L"
                                                    width={385}
                                                    height={200}
                                                    style={{
                                                        margin: "auto",
                                                    }}
                                                />
                                            ))
                                        }
                                    </Stack>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", px: 6, mt: 2 }}>
                                        <Stack direction={'row'} >
                                            <Typography sx={{ mr: 1, color: "#4C4C4D", borderRadius: 2, px: 2, py: 1, bgcolor: "#FCFCFD", fontSize: 12 }} >{formatVideoTiming(course.totalVideosTiming)}</Typography>
                                            <Typography sx={{ borderRadius: 2, color: "#4C4C4D", textAlign: 'center', px: 2, py: 1, bgcolor: "#FCFCFD", fontSize: 12 }}>{course.level}</Typography>
                                        </Stack>
                                        <Box>
                                            <Typography sx={{ bgcolor: "#FCFCFD", px: 3, py: 0.5, borderRadius: 2, fontSize: 15, fontWeight: 'bold' }}>By {course.user_name}</Typography>
                                        </Box>
                                    </Box>

                                    <Box width={"92%"} sx={{
                                        mt: 3,
                                        justifySelf: 'center',
                                        mb: 3,
                                        justifyContent: "center"
                                    }}>
                                        <Typography sx={{ py: 1, fontSize: 14, fontWeight: 600, borderRadius: 2, pl: 1, border: "0.5px solid", borderColor: "#F2F0EF" }}>Curriculum</Typography>
                                        <Stack direction={'row'}
                                            sx={{
                                                border: '0.5px solid',
                                                borderColor: '#F2F0EF',
                                                borderRadius: 2,
                                                justifyContent: 'space-between'
                                            }}>
                                            {
                                                course.chapters.map((data: IChapter, i: number) => (

                                                    <Box key={i} sx={{
                                                        borderRight: '0.5px solid',
                                                        borderRightColor: '#F2F0EF',
                                                        py: 1, px: 4,
                                                        width: '100%',
                                                    }}>
                                                        <Typography key={i} sx={{ fontSize: 40, fontWeight: 700 }}>0{i + 1}</Typography>
                                                        <Typography sx={{ fontSize: 15, fontWeight: 'bold-500', color: '#333333' }}>{data.title}</Typography>
                                                    </Box>
                                                ))
                                            }
                                        </Stack>
                                    </Box>
                                </Grid>

                            ))
                        }

                    </Grid >
                )}
            </Box>
        </Container>
    )
}

export default CoursesPage
