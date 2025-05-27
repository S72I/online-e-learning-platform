'use client'
import { useGetCourseQuery } from '@/services/public/publicCourseApi';
import { useParams } from 'next/navigation';
import React from 'react'

const page = () => {
    const params = useParams();
    const { data, isLoading, isError } = useGetCourseQuery(params.id);

    console.log("data", data);

    return (
        <>{params?.id}</>
    )
}

export default page

