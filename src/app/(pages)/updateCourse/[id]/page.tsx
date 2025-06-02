'use client'
import UpdateCourse from '@/components/Courses/UpdateCourse';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useParams } from 'next/navigation';
import React from 'react';

const Page = () => {
    const params = useParams();

    return (
        <div>
            <ProtectedRoute allowedRoles={['admin']}>
                <UpdateCourse courseID={params.id as string} />
            </ProtectedRoute>
        </div>
    );
}

export default Page;

