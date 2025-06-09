'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import GetAdminCourses from './GetAdminCourses'
import GetUserCourses from './GetUserCourses'
import CustomLoading from '../UI/CustomLoading'

const GetCourses = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [role, setRole] = useState<string | null>(null)

    useEffect(() => {
        const token = localStorage.getItem('authToken')

        if (!token) {
            router.push('/login')
            return
        }

        try {
            const base64Payload = token.split('.')[1]
            const decodedPayload = JSON.parse(atob(base64Payload))
            const userRole = decodedPayload.role

            setRole(userRole)
        } catch (error) {
            console.error('Error decoding token:', error)
            router.push('/login')
        } finally {
            setLoading(false)
        }
    }, [router])

    if (loading) {
        return <CustomLoading sx={{ mt: 5, display: 'block', mx: 'auto' }} />
    }

    if (role === 'admin') {
        return <GetAdminCourses />
    }

    if (role === 'user') {
        return <GetUserCourses />
    }

    return <div>Unauthorized</div>
}

export default GetCourses
