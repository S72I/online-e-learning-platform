'use client'
import { Box, CircularProgress, Container, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SectionHeader from './SectionHeader'
import Image from 'next/image'
import { useGetCoursesQuery } from '@/services/public/publicCourseApi'


const courses = [
    {
        "header": "Web Design Fundamentals",
        "thumbnail": ["/images/thumbnails/Image1.png", "/images/thumbnails/Image2.png", "/images/thumbnails/Image3.png"],
        "level": "beginner",
        "time": "4 weeks",
        "name": "By John Smith",
        "subtitle": ["Introduction to HTML", 'Styling with CSS', "Introduction to Responsive Design", "Design Principles for Web", "Building a Basic Website"]
    },
    {
        "header": "UI/UX Design",
        "thumbnail": ["/images/thumbnails/Image2.png", "/images/thumbnails/Image3.png", "/images/thumbnails/Image4.png"],
        "level": "beginner",
        "time": "3 weeks",
        "name": "By Emily Johnson",
        "subtitle": ["Introduction to HTML", "Introduction to UI/UX Design", "Wireframing and Prototyping", "Visual Design and Branding", "Usability Testing and Iteration"]
    },
    {

        "header": "Mobile App Development",
        "thumbnail": ["/images/thumbnails/Image3.png", "/images/thumbnails/Image4.png", "/images/thumbnails/Image5.png"],
        "level": "intermediate",
        "time": "2 weeks",
        "name": "By David Brown",
        "subtitle": ["Introduction to Mobile App Development", "Fundamentals of Swift Programming (iOS)", "Fundamentals of Kotlin Programming (Android)", "Building User Interfaces", "App Deployment and Testing"]

    },
    {
        "header": "Graphic Design for Beginners",
        "thumbnail": ["/images/thumbnails/Image4.png", "/images/thumbnails/Image5.png", "/images/thumbnails/Image6.png"],
        "level": "intermediate",
        "time": "1 week",
        "name": "By Sarah Thompson",
        "subtitle": ["Introduction to Graphic Design", "Typography and Color Theory", "Layout Design and Composition", "Image Editing and Manipulation", "Designing for Print and Digital Media"]

    },
    {
        "header": "Front-End Web Development",
        "thumbnail": ["/images/thumbnails/Image5.png", "/images/thumbnails/Image6.png", "/images/thumbnails/Image1.png"],
        "level": "advanced",

        "time": "6 days",
        "name": "By Michael Adams",
        "subtitle": ["HTML Fundamentals", "CSS Styling and Layouts", "JavaScript Basics", "Building Responsive Websites", "Introduction to Bootstrap and React"]

    }
]



const CoursesPage = () => {
    const [title, setTitle] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'' | 'asc' | 'desc'>('');

    const { data, isLoading, isError } = useGetCoursesQuery({ title, sortOrder });

    useEffect(() => {
        const token = localStorage.getItem('authToken')

        if (!token) {
            return
        }
        try {
            const base64Payload = token.split('.')[1]
            const decodedPayload = JSON.parse(atob(base64Payload))
            const userRole = decodedPayload.role

            console.log("userRole", userRole);


        } catch (error) {
            console.error('Error decoding token:', error)

        }
    }, [])

    return (
        <Container maxWidth={false} >
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 8, width: '92%', justifySelf: 'center' }}>
                <Typography sx={{ width: '50%', fontWeight: 'bold', fontSize: 30 }}>Online Courses on Design and Development</Typography>
                <Typography sx={{ width: '50%', color: '#59595A', fontSize: 12 }}>Welcome to our online course page, where you can enhance your skills in design and development. Choose from our carefully curated selection of 10 courses designed to provide you with comprehensive knowledge and practical experience. Explore the courses below and find the perfect fit for your learning journey.Welcome to our online course page, where you can enhance your skills in design and development. Choose from our carefully curated selection of 10 courses designed to provide you with comprehensive knowledge and practical experience. Explore the courses below and find the perfect fit for your learning journey.</Typography>
            </Box>
            <Box >
                {isLoading ? (
                    <Typography sx={{ mt: 5, textAlign: 'center' }}><CircularProgress /></Typography>
                ) : isError ? (
                    <Typography sx={{ mt: 5, textAlign: 'center' }}>Failed to load courses</Typography>
                ) : !data?.courses || data.courses.length === 0 ? (
                    <Typography sx={{ mt: 5, textAlign: 'center' }}>No courses available</Typography>
                ) : (
                    <Grid container spacing={2} mt={12} sx={{ px: { md: 4, xs: 2, lg: 6, xl: 6 } }}>
                        {

                            data?.courses.map((course: any, index: number) => (
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
                                        description="Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac cum eget habitasse in velit fringilla feugiat senectus in."
                                        // description={course.description}
                                        action={
                                            <Typography sx={{ border: "0.2px solid", px: 3, bgcolor: "#FCFCFD", borderColor: "transparent", fontSize: 13, }}>
                                                View All
                                            </Typography>
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
                                            <Typography sx={{ mr: 1, color: "#4C4C4D", borderRadius: 2, px: 2, py: 1, bgcolor: "#FCFCFD", fontSize: 12 }} >{course.totalVideosTiming}</Typography>
                                            <Typography sx={{ borderRadius: 2, color: "#4C4C4D", textAlign: 'center', px: 2, py: 1, bgcolor: "#FCFCFD", fontSize: 12 }}>{course.level}</Typography>
                                        </Stack>
                                        <Box>
                                            <Typography sx={{ bgcolor: "#FCFCFD", px: 3, py: 0.5, borderRadius: 2, fontSize: 12 }}>{course.name}</Typography>
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
                                                course.chapters.map((data: any, i: number) => (

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
