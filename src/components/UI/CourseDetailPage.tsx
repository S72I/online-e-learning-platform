import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';


const courses = [
    {
        "header": "Introduction to UI/UX Design",
        "chapters": [
            {
                "title": "Understanding UI/UX Design Principles",
                "time": "45 Minutes",
            },
            {
                "title": "Importance of User-Centered Design",
                "time": "1 Hour",
            },
            {
                "title": "The Role of UI/UX Design in Product Development",
                "time": "45 Minutes",
            },
        ],

    },
    {
        "header": "User Research and Analysis",
        "chapters": [
            {
                "title": "Conducting User Research and Interviews",
                "time": "1 Hour",
            },
            {
                "title": "Analyzing User Needs and Behavior",
                "time": "1 Hour",
            },
            {
                "title": "Creating User Personas and Scenarios",
                "time": "45 Minutes",
            },
        ],

    },
    {
        "header": "Wireframing and Prototyping",
        "chapters": [
            {
                "title": "Introduction to Wireframing Tools and Techniques",
                "time": "1 Hour",
            },
            {
                "title": "Creating Low-Fidelity Wireframes",
                "time": "1 Hour",
            },
            {
                "title": "Prototyping and Interactive Mockups",
                "time": "1 Hour",
            },
        ],

    },
    {
        "header": "Visual Design and Branding",
        "chapters": [
            {
                "title": "Color Theory and Typography in UI Design",
                "time": "1 Hour",
            },
            {
                "title": "Visual Hierarchy and Layout Design",
                "time": "1 Hour",
            },
            {
                "title": "Creating a Strong Brand Identity",
                "time": "45 Minutes",
            },
        ],
    },
    {
        "header": "Usability Testing and Iteration",
        "chapters": [
            {
                "title": "Usability Testing Methods and Techniques",
                "time": "1 Hour",
            },
            {
                "title": "Analyzing Usability Test Results",
                "time": "45 Minutes",
            },
            {
                "title": "Iterating and Improving UX Designs",
                "time": "45 Minutes",
            },
        ],
    },
]

const CourseDetailPage = () => {
    return (
        <Container maxWidth={false}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                mt: 8,
                width: '92%',
                borderBottom: '0.5px solid',
                borderBottomColor: "#DCDCDC",
                justifySelf: 'center',
                pb: 8
            }}>
                <Typography sx={{ width: '50%', fontWeight: 'bold', fontSize: 30 }}>Online Courses on Design and Development</Typography>
                <Typography sx={{ width: '50%', color: '#59595A', fontSize: 12 }}>Welcome to our online course page, where you can enhance your skills in design and development. Choose from our carefully curated selection of 10 courses designed to provide you with comprehensive knowledge and practical experience. Explore the courses below and find the perfect fit for your learning journey.Welcome to our online course page, where you can enhance your skills in design and development. Choose from our carefully curated selection of 10 courses designed to provide you with comprehensive knowledge and practical experience. Explore the courses below and find the perfect fit for your learning journey.</Typography>
            </Box>
            <Grid container spacing={2} sx={{ margin: 'auto', justifyContent: 'center', px: { md: 4, xs: 2, lg: 6, xl: 6 }, }}>
                <Image style={{ marginTop: 50, }} width={1400} height={500} src={"/Container.svg"} alt='' />
            </Grid>

            <Grid container spacing={2} sx={{ mt: 8, px: { md: 4, xs: 2, lg: 6, xl: 6 } }}>
                {
                    courses.map((data, i) => (
                        <Grid
                            key={i}
                            size={{ xs: 16, md: 6, sm: 6, lg: 6, }}
                            sx={{
                                borderRadius: 4,
                                bgcolor: "white",
                                height: "auto", overflow: "hidden", width: "100%",
                            }}>
                            <Stack
                                sx={{
                                    border: '0.5px solid',
                                    borderColor: '#F2F0EF',
                                    pb: 5,
                                    justifyContent: 'space-between'
                                }}>

                                <Box sx={{
                                    borderRight: '0.5px solid',
                                    borderRightColor: '#F2F0EF',
                                    py: 1, px: 4
                                }}>
                                    <Typography sx={{ fontSize: 50, fontWeight: 'bold', fontFamily: "cursive", justifySelf: 'flex-end' }}>0{i + 1}</Typography>
                                    <Typography sx={{ textDecoration: 'underline', fontWeight: 'bold', color: '#333333' }}>{data.header}</Typography>
                                </Box>
                                {
                                    data.chapters.map((chapter, index) => (
                                        <Box className="chapterBox" key={index} sx={{

                                            width: "92%", alignContent: 'center', margin: 'auto', height: 100,
                                            border: '1px solid', borderColor: '#F1F1F3', mt: 1, borderRadius: 2
                                        }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography sx={{ px: 2, width: "70%", fontSize: 'normal', fontWeight: 600 }}>{chapter.title}</Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: "#F7F7F8", width: "30%", p: 1, mr: 4, borderRadius: 1 }}>
                                                    <WatchLaterOutlinedIcon />
                                                    <Typography className="chapterBox" sx={{ ml: 1, }}>{chapter.time}</Typography>
                                                </Box>
                                            </Box>
                                            <Typography sx={{ px: 2, color: '#59595A' }}>Lesson 0{index + 1}</Typography>
                                        </Box>
                                    ))
                                }
                            </Stack>
                        </Grid>
                    ))
                }

            </Grid >
        </Container>
    )
}

export default CourseDetailPage