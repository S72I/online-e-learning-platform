'use client'

import React, { useEffect, useState } from 'react'
import Login from "@/app/(pages)/login/page"
import HomePage from './Home'
import CoursesPage from '../UI/CoursesPage'
import CourseDetailPage from '../UI/CourseDetailPage'
import ContactPage from '../UI/ContactPage'
import AboutUsPage from '../UI/AboutUsPage'
import SignUp from '@/components/Auth/signup'

import AddCourse from './AddCourse'
import GetCourses from './GetCourses'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Demo from './Demo'
import Home from './Home'


const Dashboard = () => {
    const [storedValue, setStoredValue] = useState<string | null>(null);
    const router = useRouter()
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        setStoredValue(token);
        router.refresh();
    }, []);

    return (
        <main>
            <Home /> 
        </main>
    );
};



export default Dashboard



