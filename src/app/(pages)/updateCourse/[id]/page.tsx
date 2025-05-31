'use client'
import UpdateCourse from '@/components/Courses/UpdateCourse';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useGetCourseQuery } from '@/services/courseAPI';
import { useParams } from 'next/navigation';
import React from 'react';

const Page = () => {
    const params = useParams();

    return (
        <div>
            <ProtectedRoute>
                <UpdateCourse courseID={params.id as string} />
            </ProtectedRoute>
        </div>
    );
}

export default Page;

