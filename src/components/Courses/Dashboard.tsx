'use client'

import React, { useEffect, useState } from 'react'
import Login from "@/app/login/page"
import HomePage from './Home'
import CoursesPage from '../UI/CoursesPage'
import CourseDetailPage from '../UI/CourseDetailPage'
import ContactPage from '../UI/ContactPage'
import AboutUsPage from '../UI/AboutUsPage'
import SignUp from '@/components/Auth/signup'
import Navbar from "@/components/Navbar/index"
import Footer from "@/components/Footer/index"
import AddCourse from './AddCourse'
import GetCourses from './GetCourses'

const Dashboard = () => {
    const [storedValue, setStoredValue] = useState("");

    useEffect(() => {
        const token: any = localStorage.getItem("authToken")
        setStoredValue(token)
        // if (token?.role === 'admin') {
        //     return setStoredValue(token);
        // } else {
        //     return console.log("try with admin validation");
        // }
    }, [storedValue]);


    return (
        <main>
            <Navbar />
            {
                storedValue ? (
                    < AddCourse />
                ) : (<Login />)
            }
            <Footer />
        </main>
    )
}

export default Dashboard