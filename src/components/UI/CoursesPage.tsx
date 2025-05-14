import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import SectionHeader from './SectionHeader'
import Image from 'next/image'




const courses = [
    {
        "thumbnail": ["/images/thumbnails/Image1.png", "/images/thumbnails/Image2.png", "/images/thumbnails/Image3.png"],
        "level": "beginner",
        "title": "Introduction to Python",
        "description": "Learn the basics of Python programming, including syntax, variables, and simple data structures.",
        "time": "4 weeks",
        "name": "By John Smith",
        "subtitle": ["Introduction to HTML", 'Styling with CSS', "Introduction to Responsive Design", "Design Principles for Web", "Building a Basic Website"]
    },
    {
        "thumbnail": ["/images/thumbnails/Image2.png", "/images/thumbnails/Image3.png", "/images/thumbnails/Image4.png"],
        "level": "beginner",
        "title": "HTML & CSS Fundamentals",
        "description": "Build your first web pages by mastering HTML tags and CSS styling techniques.",
        "time": "3 weeks",
        "name": "By Emily Johnson",
        "subtitle": ["Introduction to HTML", "Introduction to UI/UX Design", "Wireframing and Prototyping", "Visual Design and Branding", "Usability Testing and Iteration"]
    },
    {
        "thumbnail": ["/images/thumbnails/Image3.png", "/images/thumbnails/Image4.png", "/images/thumbnails/Image5.png"],
        "level": "intermediate",
        "title": "JavaScript Essentials",
        "description": "Deepen your web development skills with JavaScript functions, DOM manipulation, and events.",
        "time": "2 weeks",
        "name": "By David Brown",
        "subtitle": ["Introduction to Mobile App Development", "Fundamentals of Swift Programming (iOS)", "Fundamentals of Kotlin Programming (Android)", "Building User Interfaces", "App Deployment and Testing"]

    },
    {
        "thumbnail": ["/images/thumbnails/Image4.png", "/images/thumbnails/Image5.png", "/images/thumbnails/Image6.png"],
        "level": "intermediate",
        "title": "Data Analysis with Pandas",
        "description": "Analyze and visualize data efficiently using the Pandas library in Python.",
        "time": "1 week",
        "name": "By Sarah Thompson",
        "subtitle": ["Introduction to Graphic Design", "Typography and Color Theory", "Layout Design and Composition", "Image Editing and Manipulation", "Designing for Print and Digital Media"]

    },
    {
        "thumbnail": ["/images/thumbnails/Image5.png", "/images/thumbnails/Image6.png", "/images/thumbnails/Image1.png"],
        "level": "advanced",
        "title": "Machine Learning Foundations",
        "description": "Explore core machine learning concepts, algorithms, and model evaluation techniques.",
        "time": "6 days",
        "name": "By Michael Adams",
        "subtitle": ["HTML Fundamentals", "CSS Styling and Layouts", "JavaScript Basics", "Building Responsive Websites", "Introduction to Bootstrap and React"]

    },
    {
        "thumbnail": ["/images/thumbnails/Image6.png", "/images/thumbnails/Image2.png", "/images/thumbnails/Image4.png"],
        "level": "advanced",
        "title": "Full-Stack Web Development",
        "description": "Master both front-end and back-end technologies to build complete web applications.",
        "time": "2 days",
        "name": "By Jennifer Wilson"

    }
]



const CoursesPage = () => {
    return (
        <Container maxWidth={false}>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 10, width: '92%', justifySelf: 'center' }}>
                <Typography sx={{ width: '50%', fontWeight: 'bold', fontSize: 30 }}>Online Courses on Design and Development</Typography>
                <Typography sx={{ width: '50%', color: '#59595A', fontSize: 12 }}>Welcome to our online course page, where you can enhance your skills in design and development. Choose from our carefully curated selection of 10 courses designed to provide you with comprehensive knowledge and practical experience. Explore the courses below and find the perfect fit for your learning journey.</Typography>
            </Box>
            <Box sx={{ bgcolor: 'white', height: "auto" }}>
                <SectionHeader
                    title="Benefits"
                    description="Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac cum eget habitasse in velit fringilla feugiat senectus in."
                    action={
                        <Typography sx={{ border: "0.2px solid", px: 3, bgcolor: "#FCFCFD", borderColor: "transparent", fontSize: 13, py: 1 }}>
                            View All
                        </Typography>
                    }
                />

                <Grid container spacing={1} sx={{ px: { md: 4, xs: 2, lg: 6, xl: 6 } }}>
                    {
                        courses.map((course, index) => (
                            <Grid key={index}
                                size={{ xs: 16, md: 6, sm: 6, lg: 3 }}
                                sx={{
                                    bgcolor: "white",
                                    height: "auto", overflow: "hidden", width: "100%",
                                }}>

                                <Image
                                    src={""}
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
                                        <Typography sx={{ mr: 1, color: "#4C4C4D", borderRadius: 2, px: 2, py: 1, bgcolor: "#F1F1F3", fontSize: 12 }} >{"course.time"}</Typography>
                                        <Typography sx={{ borderRadius: 2, color: "#4C4C4D", textAlign: 'center', px: 2, py: 1, bgcolor: "#F1F1F3", fontSize: 12 }}>{"course.level"}</Typography>
                                    </Stack>
                                    <Box>
                                        <Typography sx={{ bgcolor: "#F1F1F3", px: 3, py: 0.5, borderRadius: 2, fontSize: 12 }}>{"course.name"}</Typography>
                                    </Box>
                                </Box>
                                <Typography sx={{ mt: 4, px: 4 }}>{"course.title"}</Typography>
                                <Typography sx={{ mt: 3, px: 4, color: "#4C4C4D", fontSize: 14 }}>{"course.description"}</Typography>
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

                </Grid>
            </Box>
        </Container>
    )
}

export default CoursesPage