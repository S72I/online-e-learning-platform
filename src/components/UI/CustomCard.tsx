'use client'

import { useGetCoursesQuery } from '@/services/public/publicCourseApi'
import { Box, Grid, Stack, Typography } from '@mui/material'
import { Be_Vietnam_Pro } from 'next/font/google'
import { useRouter } from 'next/navigation'
import React, { ReactNode, useState } from 'react'
import { ICourse } from '../types/course'
import CustomLoading from './CustomLoading'

const beVietnamPro = Be_Vietnam_Pro({
    weight: ["400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
})

interface Props {
    limit?: number;
    action?: ReactNode;
}

const CustomCard = ({ limit, action }: Props) => {
    const [title, setTitle] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'' | 'asc' | 'desc'>('');
    const { data, isLoading, isError } = useGetCoursesQuery({ title, sortOrder });


    const coursesToShow = limit ? data?.courses?.slice(0, limit) : data?.courses;


    return (

        <>
            {isLoading ? (
                <Box sx={{ mt: 5, textAlign: 'center' }}>
                        <CustomLoading sx={{ mt: 5, display: 'block', mx: 'auto' }} />

                </Box>
            ) : isError ? (
                <Typography sx={{ mt: 5, textAlign: 'center' }}>Failed to load courses</Typography>
            ) : !data?.courses || data.courses.length === 0 ? (
                <Typography sx={{ mt: 5, textAlign: 'center' }}>No courses found</Typography>
            ) : (
                <Grid container spacing={2} sx={{ mt: 5, px: { md: 4, xs: 2, lg: 6, xl: 6 } }}>
                    {coursesToShow?.map((course: ICourse) => (
                        <Grid
                            key={course._id}
                            size={{ xs: 16, md: 6, sm: 6, lg: 6 }}
                            sx={{ bgcolor: "white", height: "auto", overflow: "hidden", width: "100%" }}
                        >
                            <Box sx={{ margin: 'auto', mt: 6, height: '350px', overflow: 'hidden', width: '90%' }}>
                                <img
                                    src={course.images?.[0] || "/images/thumbnails/Image-not-found.png"}
                                    alt={course.title || "Course Image"}
                                    width={"100%"}
                                    height={"100%"}
                                    style={{ width: '100%', height: '100%', borderRadius: 12 }}
                                />
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", px: 4, mt: 2 }}>
                                <Stack direction={'row'} sx={{ mt: 1 }}>
                                    <Typography
                                        sx={{
                                            mr: 1,
                                            color: "#4C4C4D",
                                            borderRadius: 2,
                                            px: 2,
                                            py: 1,
                                            alignSelf: 'center',
                                            border: '0.5px #F1F1F3 solid',
                                            fontSize: 15,
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {course.totalVideosTiming} Minutes
                                    </Typography>

                                    <Typography
                                        sx={{
                                            borderRadius: 2,
                                            color: "#4C4C4D",
                                            textAlign: 'center',
                                            px: 2,
                                            py: 1,
                                            alignSelf: 'center',
                                            border: '0.5px #F1F1F3 solid',
                                            fontSize: 15,
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {course.level}
                                    </Typography>
                                </Stack>
                                <Box>
                                    <Typography
                                        sx={{
                                            textAlign: 'center',
                                            px: 2,
                                            py: 1,
                                            alignSelf: 'center',
                                            fontSize: 15,
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        By {course.user_name}
                                    </Typography>
                                </Box>
                            </Box>

                            <Typography
                                style={beVietnamPro.style}
                                fontWeight={"700"}
                                sx={{ mt: 3, px: 4, fontSize: 18 }}
                            >
                                {course.title}
                            </Typography>

                            <Typography
                                height={70}
                                overflow="hidden"
                                textOverflow="ellipsis"
                                style={beVietnamPro.style}
                                fontWeight={400}
                                sx={{ mt: 2, px: 4, color: "#4C4C4D", fontSize: 15 }}
                            >
                                {course.description}
                            </Typography>

                            {action && (
                                <Box width={"100%"}>
                                    {action}
                                </Box>
                            )}

                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    )
}

export default CustomCard