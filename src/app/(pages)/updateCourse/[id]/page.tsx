'use client'
import UpdateCourse from '@/components/Courses/UpdateCourse';
import { useGetCourseQuery } from '@/services/courseAPI';
import { useParams } from 'next/navigation';
import React from 'react';

const Page = () => {
    const params = useParams();
    
    return (
        <div>
            <UpdateCourse courseID={params.id as string} />
        </div>
    );
}

export default Page;

