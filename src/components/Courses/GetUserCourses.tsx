'use client';
import { useCreatePurchaseCourseMutation, useGetCoursesQuery } from '@/services/public/publicCourseApi';
import React, { useState } from 'react';
import {
  Box, Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select, Stack, TextField, Typography
} from '@mui/material'
import { Be_Vietnam_Pro } from 'next/font/google'
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
})
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GetUserCourse = () => {
  const [title, setTitle] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'' | 'asc' | 'desc'>('');
  const [level, setLevel] = useState<string>('');

  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const [isPurchaseModal, setIsPurchaseModal] = useState(false)

  const router = useRouter();
  const { data, isLoading, isError } = useGetCoursesQuery({ title, sortOrder, level });
  const [purchaseCourse] = useCreatePurchaseCourseMutation();

  const handelViewClick = (courseId: string) => {
    router.push(`/courses/${courseId}`)
  }

  const { sessionCourseId } = useAuth();

  if (sessionCourseId) {
    alert('you have to purchase this')
  }

  const { currentUserId } = useAuth()

  interface IPurchaseCourse {
    _id: string,
    title: string
  }

  const handlePurchaseClick = (course: IPurchaseCourse) => {
    setSelectedCourse({ userId: currentUserId, courseId: course._id, })
    setShowPurchaseModal(true)
  }

  const confirmPurchase = async () => {
    if (!selectedCourse) return
    setIsPurchaseModal(true)
    try {
      const res = await purchaseCourse(selectedCourse).unwrap()
      setShowPurchaseModal(false)
      setSelectedCourse(null)
      if (res.result.status == 403) {
        return toast.error("This course already purchased.", { autoClose: 1000, });
      } else {
        toast.success("Course purchased successfully!", { autoClose: 1000, });
        router.refresh()
      }
    } catch (error) {
      console.error('Delete error:', error)
    } finally {
      setIsPurchaseModal(false)
    }
  }

  const cancelPurchase = () => {
    setShowPurchaseModal(false)
    setSelectedCourse(null)
  }

  return (
    <Box className="p-4">
      <Box className="my-4 flex gap-4" pl={10}>
        <h1 className="text-2xl font-semibold">All Courses</h1>
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
        <>
          <ToastContainer />
          <Grid container spacing={2} sx={{ mt: 5, px: { md: 4, xs: 2, lg: 6, xl: 6 } }}>

            {data.courses.map((course: any) => (

              <Grid
                key={course._id}
                size={{ xs: 16, md: 6, sm: 6, lg: 6 }}
                sx={{ bgcolor: "white", height: "auto", overflow: "hidden", width: "100%" }}
              >
                <Box sx={{ margin: 'auto', mt: 6, height: '350px', overflow: 'hidden', width: '90%' }}>
                  <img
                    src={course.images?.[0] || "/images/thumbnails/Image-not-found.png"}
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
                      By {course.user_name}
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

                <Box width={"100%"}
                  sx={{ px: 2, mb: 5, display: "flex", justifyContent: "center" }}>
                  <Button
                    onClick={() => handelViewClick(course._id)}
                    sx={{
                      mx: 1,
                      bgcolor: "#F1F1F3",
                      fontSize: 12,
                      width: "50%",
                      fontWeight: 'bold',
                      py: 1.5,
                      color: "#262626"
                    }}>View</Button>
                  <Button
                    onClick={() => handlePurchaseClick(course)}
                    sx={{
                      mx: 1,
                      bgcolor: "#FF9500",
                      '&:hover': { bgcolor: "#e68600" },
                      fontSize: 12,
                      width: "50%",
                      color: "#fff",
                      fontWeight: 'bold',
                      py: 1.5
                    }}>Purchase</Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
        // <CustomCard action={
        //   <Box width={"100%"}
        //     sx={{ px: 2, my: 5, display: "flex", justifyContent: "center" }}>
        //     <Button
        //       sx={{
        //         mx: 1,
        //         bgcolor: "#F1F1F3",
        //         fontSize: 12,
        //         width: "50%",
        //         fontWeight: 'bold',
        //         py: 1.5,
        //         color: "#262626"
        //       }}>View</Button>
        //     <Button
        //       onClick={() => handelModalClick()}
        //       sx={{
        //         mx: 1,
        //         bgcolor: "#FF9500",
        //         '&:hover': { bgcolor: "#e68600" },
        //         fontSize: 12,
        //         width: "50%",
        //         color: "#fff",
        //         fontWeight: 'bold',
        //         py: 1.5
        //       }}>Purchase</Button>

        //   </Box>
        // } />
      )}
      <Dialog open={showPurchaseModal} onClose={cancelPurchase}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: 'rgba(0,0,0,0.2)',
            },
          },
        }}>
        <DialogTitle>Purchase Confirmation</DialogTitle>
        <DialogContent >
          Are you sure you want to purchase this course ?
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelPurchase} disabled={isPurchaseModal}>
            Cancel
          </Button>
          <Button
            onClick={confirmPurchase}
            color="success"
            disabled={isPurchaseModal}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: 100 }}
          >
            {isPurchaseModal ? (
              <CircularProgress size={24} />
            ) : (
              'Purchase'
            )}
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default GetUserCourse;
