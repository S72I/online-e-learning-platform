'use client'

import React, { useState } from 'react'
import { useDeleteCourseMutation, useGetCoursesQuery } from '@/services/courseAPI'
import { Box, Button, Grid, Stack, Typography, TextField, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useRouter } from 'next/navigation'
import { Be_Vietnam_Pro } from 'next/font/google'

const beVietnamPro = Be_Vietnam_Pro({
    weight: ["400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
})

const GetAdminCourse = () => {
    const router = useRouter()

    const [title, setTitle] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'' | 'asc' | 'desc'>('');
    const [level, setLevel] = useState<string>('');


    const { data, isLoading, isError } = useGetCoursesQuery({ title, sortOrder, level })

    console.log("data", data);


    const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation()

    const handleDeleteClick = async (courseID: string) => {
        if (!window.confirm("Are you sure you want to delete this course?")) return

        try {
            await deleteCourse(courseID).unwrap()
            router.refresh()
        } catch (error) {
            console.error("Delete error:", error)
        }
    }

    const [loading, setLoading] = useState(false);

    const handleEditClick = (courseID: string) => {
        setLoading(true);
        router.push(`/updateCourse/${courseID}`)
    }

    console.log("data", data);



    const handleClick = () => {
        setLoading(true);
        router.push("/addCourse")
    };



    return (
        <>
            {loading ? (
                <Typography sx={{ mt: 5, textAlign: 'center' }}><CircularProgress /></Typography>
            ) : (
                <>
                    <Box sx={{ ml: 10, mt: 5, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button
                            onClick={handleClick}
                            variant="contained"
                            sx={{ bgcolor: '#FF9500', color: 'white', fontWeight: 'bold' }}
                        >
                            Add Course
                        </Button>

                        <TextField
                            label="Search by Title"
                            variant="outlined"
                            size="small"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            sx={{ width: 300 }}
                        />

                        <FormControl sx={{ width: '180px' }} size="small">
                            <InputLabel id="sort-order-label">Sort</InputLabel>
                            <Select
                                labelId="sort-order-label"
                                value={sortOrder}
                                label="Sort"
                                onChange={(e) => setSortOrder(e.target.value as '' | 'asc' | 'desc')}
                            >
                                <MenuItem value="No Sort">No Sort</MenuItem>
                                <MenuItem value="asc">Sort A-Z</MenuItem>
                                <MenuItem value="desc">Sort Z-A</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ width: '180px' }} size="small">
                            <InputLabel id="sort-level-label">Sort Level</InputLabel>
                            <Select
                                labelId="sort-level-label"
                                value={level}
                                label="Sort Level"
                                onChange={(e) => setLevel(e.target.value)}
                            >
                                <MenuItem value="">No Sort</MenuItem>
                                <MenuItem value="Beginner">Beginner</MenuItem>
                                <MenuItem value="Intermediate">Intermediate</MenuItem>
                                <MenuItem value="Advance">Advance</MenuItem>
                            </Select>
                        </FormControl>

                    </Box>

                    {isLoading ? (
                        <Typography sx={{ mt: 5, textAlign: 'center' }}><CircularProgress /></Typography>
                    ) : isError ? (
                        <Typography sx={{ mt: 5, textAlign: 'center' }}>Failed to load courses</Typography>
                    ) : !data?.courses || data.courses.length === 0 ? (
                        <Typography sx={{ mt: 5, textAlign: 'center' }}>No courses found</Typography>
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
                                            src={course.images?.[0] || "images/thumbnails/Image-not-found.png"}
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
                                        <Button
                                            variant="contained"
                                            disabled={isDeleting}
                                            sx={{ mr: 1, px: 4 }}
                                            onClick={() => handleEditClick(course._id)}
                                            color="success"
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            variant="contained"
                                            sx={{ ml: 1, px: 3 }}
                                            onClick={() => handleDeleteClick(course._id)}
                                            color='error'
                                            disabled={isDeleting}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </>
            )}
        </>

    )
}

export default GetAdminCourse
