'use client'

import React, { useEffect, useState } from 'react'
import GetAdminCourse from '@/components/Courses/GetAdminCourses'
import GetUserCourses from '@/components/Courses/GetUserCourses'
import { Box, CircularProgress } from '@mui/material'
import { useRouter } from 'next/navigation'

const page = () => {

    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [role, setRole] = useState<string | null>(null)

    useEffect(() => {
        const token = localStorage.getItem('authToken')

        if (!token) {
            router.push('/home')
            return
        }

        try {
            const base64Payload = token.split('.')[1]
            const decodedPayload = JSON.parse(atob(base64Payload))
            const userRole = decodedPayload.role

            setRole(userRole)
        } catch (error) {
            console.error('Error decoding token:', error)
            router.push('/home')
        } finally {
            setLoading(false)
        }
    }, [router])

    if (loading) return <Box sx={{
        alignSelf: 'center',
        justifySelf: 'center',
        mt: 20,
        display: 'flex'
    }}><CircularProgress size={50} sx={{ margin: 'auto' }} /></Box>

    if (role === 'admin') {
        return <GetAdminCourse />
    }

    if (role === 'user') {
        return <GetUserCourses />
    }

    // return (
    //     <GetUserCourses />
    // )
}

export default page