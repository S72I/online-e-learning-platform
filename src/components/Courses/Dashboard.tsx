import React from 'react'
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

const Dashboard = () => {
    return (
        <main>
            <Navbar />
            < AddCourse />
            <Footer />
        </main>
    )
}

export default Dashboard