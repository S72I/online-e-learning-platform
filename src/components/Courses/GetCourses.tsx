'use client'
import { useDeleteCourseMutation, useGetCoursesQuery } from '@/services/courseAPI'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useEffect } from 'react'
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const GetCourses = () => {
    let arg: any
    const { data }: any = useGetCoursesQuery(arg)
    useEffect(() => { }, [useGetCoursesQuery])


    const router = useRouter();

    const [deleteTask] = useDeleteCourseMutation();

    const handleDeleteClick = async (courseID: String) => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;

        try {
            await deleteTask(courseID).unwrap();
            router.push("/")
        } catch (error) {
            console.error("Delete error:", error);
        }
    }

    const handleEditClick = (courseID: String) => {
        console.log("GetCourses", courseID);
        router.push(`/updateCourse/${courseID}`)
    }


    return (
        <>
            <Box>
                <Button component={Link} href='/addCourse' variant="contained" sx={{ ml: 10, mt: 5, bgcolor: '#FF9500', color: 'white', fontWeight: 'bold' }} >Add Course</Button>
            </Box>
            <Grid container spacing={2} sx={{ mt: 5, px: { md: 4, xs: 2, lg: 6, xl: 6 } }}>

                {data && data.courses ? (
                    data.courses.map((course: any, index: any) => (
                        <Grid key={index}
                            size={{ xs: 16, md: 6, sm: 6, lg: 6 }}
                            sx={{
                                bgcolor: "white",
                                height: "auto", overflow: "hidden", width: "100%",
                            }}>
                            <CldImage
                                src={course.images[0]}
                                alt="Sarah L"
                                width="400"
                                height="200"
                                style={{
                                    margin: "auto",
                                    marginTop: "50px"
                                }}
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", px: 4, mt: 2 }}>
                                <Stack direction={'row'} >
                                    <Typography sx={{ mr: 1, color: "#4C4C4D", borderRadius: 2, px: 2, py: 1, bgcolor: "#F1F1F3", fontSize: 12 }} >{course.uriTiming}</Typography>
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
                                <Button variant="contained" sx={{ mr: 1 }} onClick={() => handleEditClick(course._id)} color="success">Edit</Button>
                                <Button variant="contained" sx={{ ml: 1 }} onClick={() => handleDeleteClick(course._id)} color='error'>Delete</Button>

                            </Box>
                        </Grid>
                    ))
                ) : (data && data.courses ? <Typography>loading...</Typography> : <Typography> No Courses Found</Typography>)
                }

            </Grid >

        </>
    )
}

export default GetCourses