'use client';

import { useAuth } from '@/context/AuthContext';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import CustomLoading from './UI/CustomLoading';

interface ProtectedRouteProps {
    children: ReactNode;
    allowedRoles?: Array<'admin' | 'user'>;
}

export default function ProtectedRoute({
    children,
    allowedRoles,
}: ProtectedRouteProps) {
    const { isAuthenticated, isLoading, role = 'admin' } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                router.push('/login');
            }
            else if (allowedRoles && role && !allowedRoles.includes(role)) {
                router.push('/');
            }
        }
    }, [isAuthenticated, isLoading, role, allowedRoles, router]);

    if (isLoading || !isAuthenticated) {
        return <Box
            sx={{
                alignSelf: 'center',
                justifySelf: 'center',
                mt: 20,
                display: 'flex'
            }}
        >
            <CustomLoading sx={{ mt: 5, display: 'block', mx: 'auto' }} />
        </Box>;
    }

    if (allowedRoles && role && !allowedRoles.includes(role)) {
        return <Box sx={{ textAlign: 'center', margin: 'auto' }}>Unauthorized Access</Box>;
    }

    return <>{children}</>;
}
