'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const withAuth = (Component: React.ComponentType) => {
    return function AuthenticatedComponent(props: any) {
        const router = useRouter();

        useEffect(() => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                router.replace('/home');
            }
        }, [router]);

        return <Component {...props} />;
    };
};
