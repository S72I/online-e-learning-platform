'use client';
import { useCreatePurchaseCourseMutation, useGetCoursesQuery } from '@/services/public/publicCourseApi';
import React, { useState } from 'react';
import {
  Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack, TextField, Typography
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
import { ICourse, IPurchaseCourse, levelOptions, sortOrderOptions } from '../Types/course';
import CustomDropDown from '../UI/CustomDropDown';
import CustomDialog from '../UI/CustomDialog';
import CustomLoading from '../UI/CustomLoading';

const GetUserCourse = () => {
  const [title, setTitle] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'' | 'asc' | 'desc'>('');
  const [level, setLevel] = useState<string>('');

  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<{ userId: string; courseId: string } | null>(null)
  const [isPurchaseModal, setIsPurchaseModal] = useState(false)
  const [minMinutes, setMinMinutes] = useState<number | ''>('');
  const [maxMinutes, setMaxMinutes] = useState<number | ''>('');

  const router = useRouter();
  const { data, isLoading, isError } = useGetCoursesQuery({
    title, sortOrder, level, minSeconds: minMinutes === '' ? undefined : minMinutes * 60,
    maxSeconds: maxMinutes === '' ? undefined : maxMinutes * 60,
  });
  const [purchaseCourse] = useCreatePurchaseCourseMutation();

  const handelViewClick = (courseId: string) => {
    router.push(`/courses/${courseId}`)
  }

  const { sessionCourseId, currentUserId } = useAuth();

  React.useEffect(() => {
    if (sessionCourseId && data?.courses) {
      const courseToPurchase = data.courses.find(c => c._id === sessionCourseId);
      if (courseToPurchase) {
        setSelectedCourse({ userId: currentUserId as string, courseId: courseToPurchase._id });
        setShowPurchaseModal(true);
      }
    }
  }, [sessionCourseId, data?.courses, currentUserId]);


  const handlePurchaseClick = (course: IPurchaseCourse) => {
    setSelectedCourse({ userId: currentUserId as string, courseId: course._id })
    setShowPurchaseModal(true)
  }

  const confirmPurchase = async () => {
    if (!selectedCourse) return
    setIsPurchaseModal(true)
    try {
      const res = await purchaseCourse(selectedCourse).unwrap()
      setShowPurchaseModal(false)
      setSelectedCourse(null)
      sessionStorage.removeItem('courseId');
      if (res.result.status == 403) {
        return toast.error("This course already purchased.", { autoClose: 1000, });
      } else {
        toast.success("Course purchased successfully!", { autoClose: 1000, });
        setTimeout(() => {
          router.push(`/courses/${selectedCourse.courseId}`)
        }, 1000);
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

    sessionStorage.removeItem('courseId');

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
    <Box className="p-4">
      <Box
        className="my-4 flex gap-4 items-center"
        pl={10}
        sx={{
          width: '100%',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
        }}
      >
        <h1 className="text-2xl font-semibold">All Courses</h1>
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
        <>
          <ToastContainer />
          <Grid container spacing={2} sx={{ mt: 5, px: { md: 4, xs: 2, lg: 6, xl: 6 } }}>

            {data.courses.map((course: ICourse) => (
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
                      {formatVideoTiming(course.totalVideosTiming)}
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
        <DialogContent>
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
