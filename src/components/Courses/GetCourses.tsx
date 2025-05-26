'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const GetCourses = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('authToken')

        if (!token) {
            router.push('/login')
            return
        }

        try {
            const base64Payload = token.split('.')[1]
            const decodedPayload = JSON.parse(atob(base64Payload))
            const role = decodedPayload.role

            if (role === 'admin') {
                router.push('/getAdminCourses')
            } else {
                router.push('/getUserCourses')
            }
        } catch (error) {
            console.error('Error decoding token:', error)
            router.push('/login')
        } finally {
            setLoading(false)
        }
    }, [router])

    if (loading) return <div>Loading...</div>
    return null
}

export default GetCourses
