'use client';
import { useGetCoursesQuery } from '@/services/public/publicCourseApi';
import React, { useState } from 'react';
import { withAuth } from '../withAuth';
import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { Be_Vietnam_Pro } from 'next/font/google'
import { useRouter } from 'next/navigation';

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["sans-serif"],
})


const GetUserCourse = () => {
  const [title, setTitle] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'' | 'asc' | 'desc'>('');

  const router = useRouter();

  const { data, isLoading, isError } = useGetCoursesQuery({ title, sortOrder });

  console.log("data", data);

  const handelClickCourse = (courseId: string) => {
    router.replace(`/courses/${courseId}`)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">All Courses</h1>

      <div className="my-4 flex gap-4">
        <input
          type="text"
          placeholder="Search by title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as '' | 'asc' | 'desc')}
          className="border p-2 rounded"
        >
          <option value="">No Sort</option>
          <option value="asc">Sort A-Z</option>
          <option value="desc">Sort Z-A</option>
        </select>
      </div>

      {isLoading ? (
        <Typography sx={{ mt: 5, textAlign: 'center' }}>Loading courses...</Typography>
      ) : isError ? (
        <Typography sx={{ mt: 5, textAlign: 'center' }}>Failed to load courses</Typography>
      ) : !data?.courses || data.courses.length === 0 ? (
        <Typography sx={{ mt: 5, textAlign: 'center' }}>No courses available</Typography>
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
                <Button onClick={() => handelClickCourse(course._id as string)} sx={{ bgcolor: "#F1F1F3", fontSize: 12, width: "80%", color: "#262626" }}>Get it Now</Button>

              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default withAuth(GetUserCourse);
