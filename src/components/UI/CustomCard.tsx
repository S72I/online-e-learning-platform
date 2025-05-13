'use client'

import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'


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
    return (
        <Grid container spacing={2} sx={{ px: { md: 4, xs: 2, lg: 6, xl: 6 } }}>
            {
                courses.map((course, index) => (
                    <Grid key={index}
                        size={{ xs: 16, md: 6, sm: 6, lg: 6 }}
                        sx={{
                            bgcolor: "white",
                            height: "auto", overflow: "hidden", width: "100%",
                        }}>
                        <Image
                            src={`${course.thumbnail}`}
                            alt="Sarah L"
                            width={400}
                            height={200}
                            style={{
                                margin: "auto",
                                marginTop: "50px"
                            }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", px: 4, mt: 2 }}>
                            <Stack direction={'row'} >
                                <Typography sx={{ mr: 1, color: "#4C4C4D", borderRadius: 2, px: 2, py: 1, bgcolor: "#F1F1F3", fontSize: 12 }} >{course.time}</Typography>
                                <Typography sx={{ borderRadius: 2, color: "#4C4C4D", textAlign: 'center', px: 2, py: 1, bgcolor: "#F1F1F3", fontSize: 12 }}>{course.level}</Typography>
                            </Stack>
                            <Box>
                                <Typography sx={{ bgcolor: "#F1F1F3", px: 3, py: 0.5, borderRadius: 2, fontSize: 12 }}>{course.name}</Typography>
                            </Box>
                        </Box>
                        <Typography sx={{ mt: 4, px: 4 }}>{course.title}</Typography>
                        <Typography sx={{ mt: 3, px: 4, color: "#4C4C4D", fontSize: 14 }}>{course.description}</Typography>
                        <Box width={"100%"} sx={{
                            mt: 3,
                            mb: 3,
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <Button sx={{ bgcolor: "#F1F1F3", fontSize: 12, width: "80%", color: "#262626" }}>Get it Now</Button>
                        </Box>
                    </Grid>
                ))
            }

        </Grid >
    )
}

export default CustomCard