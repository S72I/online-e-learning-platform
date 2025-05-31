'use client'

import { useAuth } from '@/context/AuthContext'
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
            router.push('/') // Redirect to home or dashboard
        }
    }, [isAuthenticated, isLoading, router])

    if (isLoading || isAuthenticated) {
        return <div>Loading...</div>
    }

    return <>{children}</>
}