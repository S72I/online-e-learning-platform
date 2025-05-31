// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// export const withAuth = (Component: React.ComponentType) => {
//     return function AuthenticatedComponent(props: any) {
//         const router = useRouter();

//         useEffect(() => {
//             const token = localStorage.getItem('authToken');
//             if (!token) {
//                 router.replace('/home');
//             }
//         }, [router]);

//         return <Component {...props} />;
//     };
// };


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