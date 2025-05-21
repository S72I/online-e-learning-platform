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
import { Box, Button } from '@mui/material';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import UpdateCourse from './UpdateCourse';

const GetCourses = () => {
    let arg: any
    const { data }: any = useGetCoursesQuery(arg)
    useEffect(() => { }, [useGetCoursesQuery])
    console.log("data", data);

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
        <div>
            <Box>
                <Button component={Link} href='/addCourse' variant="contained" sx={{ ml: 10, mt: 5, bgcolor: '#FF9500', color: 'white', fontWeight: 'bold' }} >Add Course</Button>
            </Box>
            <TableContainer component={Paper} sx={{ mt: 5, width: "90%", justifySelf: 'center' }}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow >
                            <TableCell sx={{ py: 2, fontWeight: 'bold', fontSize: 20 }}>Title</TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: 20 }}>Description&nbsp;</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 20 }}>Image&nbsp;</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 20 }}>Actions&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data ? (
                            data.map((course: any, idx: any) => (
                                <TableRow
                                    key={idx}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {course.title}
                                    </TableCell>
                                    <TableCell >{course.description}</TableCell>
                                    <TableCell >
                                        <CldImage
                                            width="100"
                                            height="100"
                                            src={course.images[0]}
                                            sizes="100vw"
                                            alt="Description of my image"
                                        />
                                    </TableCell>
                                    <TableCell sx={{ py: 2, display: 'flex' }}>
                                        <Button variant="contained" sx={{ mr: 1 }} onClick={() => handleEditClick(course._id)} color="success">Edit</Button>
                                        <Button variant="contained" sx={{ ml: 1 }} onClick={() => handleDeleteClick(course._id)} color='error'>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (<TableRow>
                            <TableCell>isLoading...</TableCell>
                        </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}

export default GetCourses