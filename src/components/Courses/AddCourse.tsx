'use client'
import React from 'react';
import { useCreateCourseMutation } from '@/services/courseAPI';
import { ICourse } from '../Types/course';
import CourseForm from './CourseForm';
const AddCoursePage: React.FC = () => {
    const [createCourse] = useCreateCourseMutation();

    const handleAdd = async (payload: ICourse) => {
        await createCourse(payload).unwrap();
    };
    return (
        <CourseForm
            mode="add"
            onSubmitCourse={handleAdd}
            submitText="Add Course"
        />
    );
};

export default AddCoursePage;
