
'use client'
import { useGetCourseQuery } from '@/services/public/publicCourseApi';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react'
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';

const Page = () => {
    const params = useParams();
    const { data, isLoading, isError } = useGetCourseQuery(params.id);

    console.log("data", data);

    return (
        <>
            {isLoading ? (
                <Typography sx={{ mt: 5, textAlign: 'center' }}>Loading courses...</Typography>
            ) : isError ? (
                <Typography sx={{ mt: 5, textAlign: 'center' }}>Failed to load courses</Typography>
            ) : !data?.findId ? (
                <Typography sx={{ mt: 5, textAlign: 'center' }}>No course available</Typography>
            ) : (
                // <Container maxWidth={false}>
                //     <Box sx={{
                //         display: 'flex',
                //         alignItems: 'center',
                //         mt: 8,
                //         width: '92%',
                //         borderBottom: '0.5px solid',
                //         borderBottomColor: "#DCDCDC",
                //         justifySelf: 'center',
                //         pb: 8
                //     }}>
                //         <Typography sx={{ width: '50%', fontWeight: 'bold', fontSize: 30 }}>
                //             Online Courses on Design and Development
                //         </Typography>
                //         <Typography sx={{ width: '50%', color: '#59595A', fontSize: 12 }}>
                //             Welcome to our online course page, where you can enhance your skills in design and development. Choose from our carefully curated selection of 10 courses designed to provide you with comprehensive knowledge and practical experience. Explore the courses below and find the perfect fit for your learning journey.
                //         </Typography>
                //     </Box>

                //     <Grid container spacing={2} sx={{ margin: 'auto', justifyContent: 'center', px: { md: 4, xs: 2, lg: 6, xl: 6 }, }}>
                //         <Image style={{ marginTop: 50 }} width={1400} height={500} src={"/Container.svg"} alt='Course illustration' />
                //     </Grid>

                //     <Grid container spacing={2} sx={{ mt: 8, px: { md: 4, xs: 2, lg: 6, xl: 6 } }}>
                //         <Grid
                //             size={{ xs: 16, md: 6, sm: 6, lg: 6, }}
                //             sx={{
                //                 borderRadius: 4,
                //                 bgcolor: "white",
                //                 height: "auto", overflow: "hidden", width: "100%",
                //             }}
                //         >
                //             <Stack sx={{
                //                 border: '0.5px solid',
                //                 borderColor: '#F2F0EF',
                //                 pb: 5,
                //                 justifyContent: 'space-between'
                //             }}>
                //                 <Box sx={{ py: 2, px: 4 }}>
                //                     <Typography sx={{ fontWeight: 'bold', fontSize: 28 }}>
                //                         {data.findId.title}
                //                     </Typography>
                //                     <Typography sx={{ color: '#59595A', fontSize: 14, mt: 1 }}>
                //                         Level: {data.findId.level}
                //                     </Typography>
                //                     <Typography sx={{ color: '#999', fontSize: 12, mt: 1 }}>
                //                         Educator: {data.findId.courseEducator}
                //                     </Typography>
                //                 </Box>

                //                 {data.findId.chapter && (
                //                     <Box className="chapterBox" sx={{
                //                         width: "92%",
                //                         alignContent: 'center',
                //                         margin: 'auto',
                //                         height: 100,
                //                         border: '1px solid',
                //                         borderColor: '#F1F1F3',
                //                         mt: 3,
                //                         borderRadius: 2,
                //                         p: 2
                //                     }}>
                //                         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                //                             <Typography sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
                //                                 {data.findId.chapter.title}
                //                             </Typography>
                //                             <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: "#F7F7F8", px: 1, py: 0.5, borderRadius: 1 }}>
                //                                 <WatchLaterOutlinedIcon fontSize="small" />
                //                                 <Typography sx={{ ml: 1, fontSize: 14 }}>{data.findId.chapter.time}</Typography>
                //                             </Box>
                //                         </Box>
                //                         <Typography sx={{ mt: 1, color: '#59595A', fontSize: 12 }}>
                //                             Lesson 01
                //                         </Typography>
                //                     </Box>
                //                 )}
                //             </Stack>
                //         </Grid>
                //     </Grid>
                // </Container>

                <Grid container spacing={2} sx={{ mt: 5, px: { md: 4, xs: 2, lg: 6, xl: 6 } }}>
                    {
                        // data.findId.chapters.map((course: any) => (
                        //     <Grid
                        //         key={course._id}
                        //         size={{ xs: 16, md: 6, sm: 6, lg: 6 }}
                        //         sx={{ bgcolor: "white", height: "auto", overflow: "hidden", width: "100%" }}
                        //     >
                        //         <Box sx={{ margin: 'auto', mt: 6, height: '350px', overflow: 'hidden', width: '90%' }}>
                        //             <img
                        //                 src={data.findId.images?.[0] || "/images/thumbnails/Image-not-found.png"}
                        //                 alt={course.title || "Course Image"}
                        //                 width={"100%"}
                        //                 height={"100%"}
                        //                 style={{ width: '100%', height: '100%', borderRadius: 12 }}
                        //             />
                        //         </Box>

                        //         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", px: 4, mt: 2 }}>
                        //             <Stack direction={'row'} sx={{ mt: 1 }}>
                        //                 <Typography
                        //                     sx={{
                        //                         mr: 1,
                        //                         color: "#4C4C4D",
                        //                         borderRadius: 2,
                        //                         px: 2,
                        //                         py: 1,
                        //                         alignSelf: 'center',
                        //                         border: '0.5px #F1F1F3 solid',
                        //                         fontSize: 15,
                        //                         fontWeight: 'bold',
                        //                         textAlign: 'center',
                        //                     }}
                        //                 >
                        //                     {course.totalVideosTiming} Minutes
                        //                 </Typography>

                        //                 <Typography
                        //                     sx={{
                        //                         borderRadius: 2,
                        //                         color: "#4C4C4D",
                        //                         textAlign: 'center',
                        //                         px: 2,
                        //                         py: 1,
                        //                         alignSelf: 'center',
                        //                         border: '0.5px #F1F1F3 solid',
                        //                         fontSize: 15,
                        //                         fontWeight: 'bold',
                        //                     }}
                        //                 >
                        //                     {course.level}
                        //                 </Typography>
                        //             </Stack>
                        //             <Box>
                        //                 <Typography
                        //                     sx={{
                        //                         textAlign: 'center',
                        //                         px: 2,
                        //                         py: 1,
                        //                         alignSelf: 'center',
                        //                         fontSize: 15,
                        //                         fontWeight: 'bold',
                        //                     }}
                        //                 >
                        //                     By {course.courseEducator}
                        //                 </Typography>
                        //             </Box>
                        //         </Box>

                        //         <Typography
                        //             style={beVietnamPro.style}
                        //             fontWeight={"700"}
                        //             sx={{ mt: 3, px: 4, fontSize: 18 }}
                        //         >
                        //             {course.title}
                        //         </Typography>

                        //         <Typography
                        //             height={70}
                        //             overflow="hidden"
                        //             textOverflow="ellipsis"
                        //             style={beVietnamPro.style}
                        //             fontWeight={400}
                        //             sx={{ mt: 2, px: 4, color: "#4C4C4D", fontSize: 15 }}
                        //         >
                        //             {course.description}
                        //         </Typography>

                        //         <Box
                        //             width={"100%"}
                        //             sx={{ my: 5, display: "flex", justifyContent: "center" }}
                        //         >
                        //             <Button onClick={() => handelClickCourse(course._id as string)} sx={{ bgcolor: "#F1F1F3", fontSize: 12, width: "80%", color: "#262626" }}>Get it Now</Button>

                        //         </Box>
                        //     </Grid>
                        // ))

                        data.findId.chapters.map((course: any, idx: number) => (
                            <Typography>{course.title}</Typography>
                        ))
                    }
                </Grid>
            )}
        </>
    );
}

export default Page;
