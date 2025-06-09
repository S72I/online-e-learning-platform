'use client'

import React, { useEffect, useState } from 'react'
import GetAdminCourse from '@/components/Courses/GetAdminCourses'
import GetUserCourses from '@/components/Courses/GetUserCourses'
import { Box } from '@mui/material'
import { useRouter } from 'next/navigation'
import { UserRole } from '@/server/interfaces'
import CustomLoading from '@/components/UI/CustomLoading'

const Page = () => {
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
                <CustomLoading sx={{ mt: 5, display: 'block', mx: 'auto' }} />
            </Box>
        )
    }
    if (role === UserRole.admin) {
        return <GetAdminCourse />
    }
    if (role === UserRole.user) {
        return <GetUserCourses />
    }
    return (
        <Box sx={{ mt: 20, textAlign: 'center' }}>
            <p>Unauthorized or unknown role.</p>
        </Box>
    )
}

export default Page
