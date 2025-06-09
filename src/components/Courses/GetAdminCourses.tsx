'use client'
import React, { useState } from 'react'
import {
    Box,
    Button,
    Grid,
    Stack,
    Typography,
    TextField,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { useDeleteCourseMutation, useGetCoursesQuery } from '@/services/courseAPI'
import { Be_Vietnam_Pro } from 'next/font/google'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ICourse, levelOptions, sortOrderOptions } from '@/components/Types/course'
import CustomDropDown from '../UI/CustomDropDown'
import CustomDialog from '../UI/CustomDialog'
import CustomLoading from '../UI/CustomLoading'

const beVietnamPro = Be_Vietnam_Pro({
    weight: ['400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
})

const GetAdminCourse = () => {
    const router = useRouter()

    const [title, setTitle] = useState<string>('')
    const [sortOrder, setSortOrder] = useState<'' | 'asc' | 'desc'>('')
    const [level, setLevel] = useState<string>('')
    const [minMinutes, setMinMinutes] = useState<number | ''>('');
    const [maxMinutes, setMaxMinutes] = useState<number | ''>('');


    const { data, isLoading, isError } = useGetCoursesQuery({
        title, sortOrder, level, minSeconds: minMinutes === '' ? undefined : minMinutes * 60,
        maxSeconds: maxMinutes === '' ? undefined : maxMinutes * 60,
    })




    const [deleteCourse] = useDeleteCourseMutation()

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null)

    const [isDeletingModal, setIsDeletingModal] = useState(false)

    const handleEditClick = (courseID: string) => {
        router.push(`/updateCourse/${courseID}`)
    }

    const handleClick = () => {
        router.push('/addCourse')
    }

    const handleDeleteClick = (course: ICourse) => {
        setSelectedCourse(course)
        setShowDeleteModal(true)
    }

    const confirmDelete = async () => {
        if (!selectedCourse) return
        setIsDeletingModal(true)
        try {
            await deleteCourse(selectedCourse._id).unwrap()
            setShowDeleteModal(false)
            setSelectedCourse(null)
            router.refresh()
            toast.success("Course deleted successfully!", { autoClose: 1000 });
        } catch (error) {
            console.error('Delete error:', error)
        } finally {
            setIsDeletingModal(false)
        }
    }

    const cancelDelete = () => {
        setShowDeleteModal(false)
        setSelectedCourse(null)
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
        <>
            <ToastContainer />
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

                <CustomDropDown
                    label="Sort"
                    value={sortOrder}
                    setValue={(val: string) => setSortOrder(val as '' | 'asc' | 'desc')}
                    options={sortOrderOptions}
                    sx={{ width: '180px' }}
                />

                <CustomDropDown
                    label="Sort Level"
                    value={level}
                    setValue={setLevel}
                    options={levelOptions}
                    sx={{ width: '180px' }}
                />

                <TextField
                    label="Min Minutes"
                    variant="outlined"
                    size="small"
                    type="number"
                    value={minMinutes}
                    onChange={e => setMinMinutes(e.target.value === '' ? '' : Number(e.target.value))}
                    sx={{ width: 140 }}
                />
                <TextField
                    label="Max Minutes"
                    variant="outlined"
                    size="small"
                    type="number"
                    value={maxMinutes}
                    onChange={e => setMaxMinutes(e.target.value === '' ? '' : Number(e.target.value))}
                    sx={{ width: 140 }}
                />

            </Box>

            {isLoading ? (
                <Typography sx={{ mt: 5, textAlign: 'center' }}>
                    <CustomLoading sx={{ mt: 5, display: 'block', mx: 'auto' }} />

                </Typography>
            ) : isError ? (
                <Typography sx={{ mt: 5, textAlign: 'center' }}>Failed to load courses</Typography>
            ) : !data?.courses || data.courses.length === 0 ? (
                <Typography sx={{ mt: 5, textAlign: 'center' }}>No courses found</Typography>
            ) : (
                <Grid container spacing={2} sx={{ mt: 5, px: { md: 4, xs: 2, lg: 6, xl: 6 } }}>
                    {data.courses.map((course: ICourse) => (
                        <Grid
                            key={course._id}
                            size={{ xs: 16, md: 6, sm: 6, lg: 6 }}
                            sx={{ bgcolor: 'white', height: 'auto', overflow: 'hidden', width: '100%' }}
                        >
                            <Box sx={{ margin: 'auto', mt: 6, height: '350px', overflow: 'hidden', width: '90%' }}>
                                <img
                                    src={course.images?.[0] || 'images/thumbnails/Image-not-found.png'}
                                    alt={course.title || 'Course Image'}
                                    width={'100%'}
                                    height={'100%'}
                                    style={{ width: '100%', height: '100%', borderRadius: 12 }}
                                />
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    px: 4,
                                    mt: 2,
                                }}
                            >
                                <Stack direction={'row'} sx={{ mt: 1 }}>
                                    <Typography
                                        sx={{
                                            mr: 1,
                                            color: '#4C4C4D',
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
                                        {formatVideoTiming(course.totalVideosTiming)}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            borderRadius: 2,
                                            color: '#4C4C4D',
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
                                fontWeight={'700'}
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
                                sx={{ mt: 2, px: 4, color: '#4C4C4D', fontSize: 15 }}
                            >
                                {course.description}
                            </Typography>

                            <Box width={'100%'} sx={{ my: 5, display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    variant="contained"
                                    sx={{ mr: 1, px: 4 }}
                                    onClick={() => handleEditClick(course._id)}
                                    color="success"
                                >
                                    Edit
                                </Button>

                                <Button
                                    variant="contained"
                                    sx={{ ml: 1, px: 3 }}
                                    onClick={() => handleDeleteClick(course)}
                                    color="error"
                                >
                                    Delete
                                </Button>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            )}

            <CustomDialog
                open={showDeleteModal}
                onClose={cancelDelete}
                onConfirm={confirmDelete}
                title="Delete Confirmation"
                content={`Are you sure you want to delete the course "${selectedCourse?.title}"?`}
                confirmText="Delete"
                confirmColor="error"
                isLoading={isDeletingModal}
            />

        </>
    )
}

export default GetAdminCourse
