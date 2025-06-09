'use client'
import React from 'react';
import { useGetCourseQuery, useUpdateCourseMutation } from '@/services/courseAPI';
import { ICourse } from '../Types/course';
import CourseForm from './CourseForm';
import CustomLoading from '../UI/CustomLoading';

interface UpdateCoursePageProps {
  courseID: string;
}

const UpdateCoursePage: React.FC<UpdateCoursePageProps> = ({ courseID }) => {
  const { data, isLoading: loadingData } = useGetCourseQuery(courseID);

  const [updateCourse] = useUpdateCourseMutation();

  const handleUpdate = async (payload: ICourse) => {
    await updateCourse({ id: courseID, payload }).unwrap();
  };

  if (loadingData) return <CustomLoading sx={{ mt: 5, display: 'block', mx: 'auto' }} />;

  return (
    <CourseForm
      mode="update"
      initialData={data?.course}
      onSubmitCourse={handleUpdate}
      submitText="Update Course"
    />
  );
};

export default UpdateCoursePage;
