'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import AdminHomePage from '../UI/AdminHomePage'
import UserHomePage from '../UI/UserHomePage'
import { Box, CircularProgress } from '@mui/material'
import GetUserCourses from './GetUserCourses'
import GetAdminCourse from './GetAdminCourses'


const Home = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [role, setRole] = useState<string | null>(null)

    useEffect(() => {
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken')

        if (!token) {
            router.push('/')
            return
        }

        try {
            const base64Payload = token.split('.')[1]
            const decodedPayload = JSON.parse(atob(base64Payload))
            const userRole = decodedPayload.role
            setRole(userRole)
        } catch (error) {
            console.error('Error decoding token:', error)
            router.push('/')
        } finally {
            setLoading(false)
        }
    }, [router])

    if (loading) {
        return (
            <Box sx={{
                alignSelf: 'center',
                justifySelf: 'center',
                mt: 20,
                display: 'flex'
            }}>
                <CircularProgress size={50} sx={{ margin: 'auto' }} />
            </Box>
        )
    }

    if (role === 'admin') {
        return <GetAdminCourse />
    }
    else if (role === 'user') {
        return <GetUserCourses />
    } else return <UserHomePage />
}


export default Home