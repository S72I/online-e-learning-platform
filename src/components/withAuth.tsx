'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function withAuth(Component: React.ComponentType) {
    return function ProtectedComponent(props: any) {
        const { isAuthenticated, isLoading } = useAuth()
        const router = useRouter()

        useEffect(() => {
            if (!isLoading && !isAuthenticated) {
                router.push('/login')
            }
        }, [isAuthenticated, isLoading, router])

        if (isLoading || !isAuthenticated) {
            return <div>Loading...</div>
        }

        return <Component {...props} />
    }
}