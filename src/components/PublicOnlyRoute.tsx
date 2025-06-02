'use client'

import { useAuth } from '@/context/AuthContext'
import { Box, CircularProgress } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function PublicOnlyRoute({
    children,
}: {
    children: React.ReactNode
}) {
    const { isAuthenticated, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.push('/')
        }
    }, [isAuthenticated, isLoading, router])

    if (isLoading || isAuthenticated) {
        return <Box><CircularProgress /></Box>
    }

    return <>{children}</>
}