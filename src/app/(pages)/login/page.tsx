'use client'

import React from 'react'
import Login from "@/components/Auth/login"
import PublicOnlyRoute from '@/components/PublicOnlyRoute'

const page = () => {
    return (
        <PublicOnlyRoute>
            <Login />
        </PublicOnlyRoute>
    )
}

export default page