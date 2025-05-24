// 'use client'
// import { useDeleteCourseMutation, useGetCoursesQuery } from '@/services/courseAPI'
// import React, { useEffect } from 'react'
// import { Box, Button, Grid, Stack, Typography } from '@mui/material';
// import { CldImage } from 'next-cloudinary';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import { Be_Vietnam_Pro } from 'next/font/google';


// const beVietnamPro = Be_Vietnam_Pro({ weight: "800", subsets: ['sans-serif'] })
// const beVietnamPro500 = Be_Vietnam_Pro({ weight: "400", subsets: ['sans-serif'] })

// const GetCourses = () => {
//     let arg: any
//     const { data }: any = useGetCoursesQuery(arg)
//     useEffect(() => { }, [useGetCoursesQuery])

//     const router = useRouter();

//     const [deleteTask] = useDeleteCourseMutation();

//     const handleDeleteClick = async (courseID: String) => {
//         if (!window.confirm("Are you sure you want to delete this task?")) return;

//         try {
//             await deleteTask(courseID).unwrap();
//             router.push("/")
//         } catch (error) {
//             console.error("Delete error:", error);
//         }
//     }

//     const handleEditClick = (courseID: String) => {
//         console.log("GetCourses", courseID);
//         router.push(`/updateCourse/${courseID}`)
//     }


//     return (
//         <>
//             <Box>
//                 <Button component={Link} href='/addCourse' variant="contained" sx={{ ml: 10, mt: 5, bgcolor: '#FF9500', color: 'white', fontWeight: 'bold' }} >Add Course</Button>
//             </Box>

//             <Grid container spacing={2} sx={{ mt: 5, px: { md: 4, xs: 2, lg: 6, xl: 6 } }}>

//                 {data && data.courses ? (
//                     data.courses.map((course: any, index: any) => (
//                         <Grid key={index}
//                             size={{ xs: 16, md: 6, sm: 6, lg: 6 }}
//                             sx={{
//                                 bgcolor: "white",
//                                 height: "auto", overflow: "hidden", width: "100%",
//                             }}>

//                             <Box
//                                 sx={{
//                                     margin: 'auto',
//                                     mt: 10,
//                                     height: '350px',
//                                     overflow: 'hidden',
//                                     width: '90%',
//                                 }}
//                             >
//                                 <img
//                                     src={course.images[0] || "/images/thumbnails/Image-not-found.png"}
//                                     alt="Sarah L"
//                                     width={"100%"}
//                                     height={"100%"}
//                                     style={{ width: '100%', height: '100%', borderRadius: 12 }} />

//                             </Box>

//                             <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", px: 4, mt: 2 }}>
//                                 <Stack direction={'row'} sx={{ mt: 1 }}>
//                                     <Typography
//                                         sx={{
//                                             mr: 1,
//                                             color: "#4C4C4D",
//                                             borderRadius: 2,
//                                             px: 2,
//                                             py: 1,
//                                             alignSelf: 'center',
//                                             border: '0.5px #F1F1F3 solid',
//                                             fontSize: 15,
//                                             fontWeight: 'bold',
//                                             textAlign: 'center',
//                                         }} >{course.totalVideosTiming} Minutes</Typography>

//                                     <Typography
//                                         sx={{
//                                             borderRadius: 2,
//                                             color: "#4C4C4D",
//                                             textAlign: 'center',
//                                             px: 2,
//                                             py: 1,
//                                             alignSelf: 'center',
//                                             border: '0.5px #F1F1F3 solid',
//                                             fontSize: 15,
//                                             fontWeight: 'bold'
//                                         }}>{course.level}</Typography>
//                                 </Stack>
//                                 <Box>
//                                     <Typography
//                                         sx={{
//                                             textAlign: 'center',
//                                             px: 2,
//                                             py: 1,
//                                             alignSelf: 'center',
//                                             fontSize: 15,
//                                             fontWeight: 'bold'
//                                         }}>By {course.courseEducator}</Typography>
//                                 </Box>
//                             </Box>
//                             {/* <Typography
//                                 sx={{
//                                     mt: 4,
//                                     px: 4,
//                                     fontWeight: 'bold'
//                                 }}>{course.title}</Typography> */}

//                             <Typography

//                                 style={beVietnamPro.style}
//                                 sx={{
//                                     mt: 3,
//                                     px: 4,
//                                     fontSize: 18
//                                 }}
//                             >
//                                 {course.title}
//                             </Typography>

//                             <Typography
//                                 style={beVietnamPro500.style}
//                                 sx={{ mt: 2, px: 4, color: "#4C4C4D", fontSize: 15 }}>{course.description}</Typography>
//                             <Box width={"100%"} sx={{
//                                 mt: 3,
//                                 mb: 3,
//                                 display: "flex",
//                                 justifyContent: "center"
//                             }}>
//                                 <Button variant="contained" sx={{ mr: 1 }} onClick={() => handleEditClick(course._id)} color="success">Edit</Button>
//                                 <Button variant="contained" sx={{ ml: 1 }} onClick={() => handleDeleteClick(course._id)} color='error'>Delete</Button>

//                             </Box>
//                         </Grid>
//                     ))
//                 ) : (<Typography>loading...</Typography>)
//                 }

//             </Grid >

//         </>
//     )
// }

// export default GetCourses



'use client'

import { useDeleteCourseMutation, useGetCoursesQuery } from '@/services/courseAPI'
import React, { useEffect } from 'react'
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Be_Vietnam_Pro } from 'next/font/google';

const beVietnamPro = Be_Vietnam_Pro({
    weight: ["400", "500", "600", "700", "800", "900"],
    subsets: ["sans-serif"],
});



const GetCourses = () => {
    const { data, isLoading, isError }: any = useGetCoursesQuery(null)
    useEffect(() => { }, [useGetCoursesQuery])

    const router = useRouter();

    const [deleteTask] = useDeleteCourseMutation();

    useEffect(() => { }, [useGetCoursesQuery])


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

            {
                isLoading ? (
                    <Typography sx={{ mt: 5, textAlign: 'center' }}>Loading courses...</Typography>
                ) : isError ? (
                    <Typography sx={{ mt: 5, textAlign: 'center' }}>Failed to load courses</Typography>
                ) : data?.courses?.length === 0 ? (
                    <Typography sx={{ mt: 5, textAlign: 'center' }}>No courses available</Typography>
                ) : (
                    <Grid container spacing={2} sx={{ mt: 5, px: { md: 4, xs: 2, lg: 6, xl: 6 } }}>

                        {data && data.courses && (
                            data.courses.map((course: any, index: any) => (
                                <Grid key={index}
                                    size={{ xs: 16, md: 6, sm: 6, lg: 6 }}
                                    sx={{
                                        bgcolor: "white",
                                        height: "auto", overflow: "hidden", width: "100%",
                                    }}>

                                    <Box
                                        sx={{
                                            margin: 'auto',
                                            mt: 6,
                                            height: '350px',
                                            overflow: 'hidden',
                                            width: '90%',
                                        }}
                                    >
                                        <img
                                            src={course.images[0] || "/images/thumbnails/Image-not-found.png"}
                                            alt="Sarah L"
                                            width={"100%"}
                                            height={"100%"}
                                            style={{ width: '100%', height: '100%', borderRadius: 12 }} />

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
                                                }} >{course.totalVideosTiming} Minutes</Typography>

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
                                                    fontWeight: 'bold'
                                                }}>{course.level}</Typography>
                                        </Stack>
                                        <Box>
                                            <Typography
                                                sx={{
                                                    textAlign: 'center',
                                                    px: 2,
                                                    py: 1,
                                                    alignSelf: 'center',
                                                    fontSize: 15,
                                                    fontWeight: 'bold'
                                                }}>By {course.courseEducator}</Typography>
                                        </Box>
                                    </Box>
                                    {/* <Typography
                                sx={{
                                    mt: 4,
                                    px: 4,
                                    fontWeight: 'bold'
                                }}>{course.title}</Typography> */}

                                    <Typography
                                        style={beVietnamPro.style}
                                        fontWeight={"700"}
                                        sx={{
                                            mt: 3,
                                            px: 4,
                                            fontSize: 18
                                        }}
                                    >
                                        {course.title}
                                    </Typography>

                                    {/* <Typography
                                        height={70}
                                        overflow={' hidden'}
                                        textOverflow={'ellipsis'}
                                        style={beVietnamPro.style}
                                        fontFamily={"500"}
                                        sx={{ mt: 2, px: 4, color: "#4C4C4D", fontSize: 15 }}>{course.description}</Typography> */}

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

                                    <Box width={"100%"} sx={{
                                        my: 5,
                                        display: "flex",
                                        justifyContent: "center"
                                    }}>
                                        <Button
                                            variant="contained"
                                            disabled={isLoading}
                                            sx={{ mr: 1, px: 4 }}
                                            onClick={() => handleEditClick(course._id)}
                                            color="success"
                                        >{isLoading ? "Loading" : "Edit"}</Button>

                                        <Button variant="contained" sx={{ ml: 1, px: 3 }} onClick={() => handleDeleteClick(course._id)} color='error'>Delete</Button>

                                    </Box>
                                </Grid>
                            ))
                        )

                        }

                    </Grid >
                )

            }
        </>
    )
}

export default GetCourses
