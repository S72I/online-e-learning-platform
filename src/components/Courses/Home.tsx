'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import AdminHomePage from '../UI/AdminHomePage'
import UserHomePage from '../UI/UserHomePage'
import { Box, CircularProgress } from '@mui/material'
import GetUserCourses from './GetUserCourses'


const Home = () => {
   

    return <UserHomePage />
}


export default Home