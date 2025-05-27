'use client'

import { useGetCoursesQuery } from '@/services/public/publicCourseApi'
import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { Be_Vietnam_Pro } from 'next/font/google'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const beVietnamPro = Be_Vietnam_Pro({
    weight: ["400", "500", "600", "700", "800", "900"],
    subsets: ["sans-serif"],
})


const courses = [
    {
        "thumbnail": "/images/thumbnails/Image1.png",
        "level": "beginner",
        "title": "Introduction to Python",
        "description": "Learn the basics of Python programming, including syntax, variables, and simple data structures.",
        "time": "4 weeks",
        "name": "By John Smith"
    },
    {
        "thumbnail": "/images/thumbnails/Image2.png",
        "level": "beginner",
        "title": "HTML & CSS Fundamentals",
        "description": "Build your first web pages by mastering HTML tags and CSS styling techniques.",
        "time": "3 weeks",
        "name": "By Emily Johnson"
    },
    {
        "thumbnail": "/images/thumbnails/Image3.png",
        "level": "intermediate",
        "title": "JavaScript Essentials",
        "description": "Deepen your web development skills with JavaScript functions, DOM manipulation, and events.",
        "time": "2 weeks",
        "name": "By David Brown"

    },
    {
        "thumbnail": "/images/thumbnails/Image4.png",
        "level": "intermediate",
        "title": "Data Analysis with Pandas",
        "description": "Analyze and visualize data efficiently using the Pandas library in Python.",
        "time": "1 week",
        "name": "By Sarah Thompson"

    },
    {
        "thumbnail": "/images/thumbnails/Image5.png",
        "level": "advanced",
        "title": "Machine Learning Foundations",
        "description": "Explore core machine learning concepts, algorithms, and model evaluation techniques.",
        "time": "6 days",
        "name": "By Michael Adams"

    },
    {
        "thumbnail": "/images/thumbnails/Image6.png",
        "level": "advanced",
        "title": "Full-Stack Web Development",
        "description": "Master both front-end and back-end technologies to build complete web applications.",
        "time": "2 days",
        "name": "By Jennifer Wilson"

    }
]

const CustomCard = () => {
    const [title, setTitle] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'' | 'asc' | 'desc'>('');
    const { data, isLoading, isError } = useGetCoursesQuery({ title, sortOrder });

    const router = useRouter();

    if (isLoading) return <>Loading....</>

    const handelClickCourse = (courseId: string) => {
        router.replace(`/courses/${courseId}`)
    }
    return (
        // <Grid container spacing={2} sx={{ px: { md: 4, xs: 2, lg: 6, xl: 6 } }}>
        //     {data && data.courses &&
        //         data.courses.map((course: any, index: any) => (
        //             <Grid key={index}
        //                 size={{ xs: 16, md: 6, sm: 6, lg: 6 }}
        //                 sx={{
        //                     bgcolor: "white",
        //                     height: "auto", overflow: "hidden", width: "100%",
        //                 }}>
        //                 <Image
        //                     src={`${course.thumbnail}`}
        //                     alt="Sarah L"
        //                     width={400}
        //                     height={200}
        //                     style={{
        //                         margin: "auto",
        //                         marginTop: "50px"
        //                     }}
        //                 />
        //                 <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", px: 4, mt: 2 }}>
        //                     <Stack direction={'row'} >
        //                         <Typography sx={{ mr: 1, color: "#4C4C4D", borderRadius: 2, px: 2, py: 1, bgcolor: "#F1F1F3", fontSize: 12 }} >{course.time}</Typography>
        //                         <Typography sx={{ borderRadius: 2, color: "#4C4C4D", textAlign: 'center', px: 2, py: 1, bgcolor: "#F1F1F3", fontSize: 12 }}>{course.level}</Typography>
        //                     </Stack>
        //                     <Box>
        //                         <Typography sx={{ bgcolor: "#F1F1F3", px: 3, py: 0.5, borderRadius: 2, fontSize: 12 }}>{course.name}</Typography>
        //                     </Box>
        //                 </Box>
        //                 <Typography sx={{ mt: 4, px: 4 }}>{course.title}</Typography>
        //                 <Typography sx={{ mt: 3, px: 4, color: "#4C4C4D", fontSize: 14 }}>{course.description}</Typography>
        //                 <Box width={"100%"} sx={{
        //                     mt: 3,
        //                     mb: 3,
        //                     display: "flex",
        //                     justifyContent: "center"
        //                 }}>
        //                     <Button sx={{ bgcolor: "#F1F1F3", fontSize: 12, width: "80%", color: "#262626" }}>Get it Now</Button>
        //                 </Box>
        //             </Grid>
        //         ))

        //     }

        // </Grid >

        <>
            {isLoading ? (
                <Typography sx={{ mt: 5, textAlign: 'center' }}>Loading courses...</Typography>
            ) : isError ? (
                <Typography sx={{ mt: 5, textAlign: 'center' }}>Failed to load courses</Typography>
            ) : !data?.courses || data.courses.length === 0 ? (
                <Typography sx={{ mt: 5, textAlign: 'center' }}>No courses available</Typography>
            ) : (
                <Grid container spacing={2} sx={{ mt: 5, px: { md: 4, xs: 2, lg: 6, xl: 6 } }}>
                    {data.courses.map((course: any) => (
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
                                        By {course.courseEducator}
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

                            <Box
                                width={"100%"}
                                sx={{ my: 5, display: "flex", justifyContent: "center" }}
                            >
                                <Button onClick={() => handelClickCourse(course._id as string)} sx={{ bgcolor: "#F1F1F3", fontSize: 12, width: "80%", color: "#262626" }}>Get it Now</Button>

                            </Box>
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    )
}

export default CustomCard