'use client'

import { createContext, useContext, useState, ReactNode, useLayoutEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
    role: 'admin' | 'user',
    id: string
}

interface AuthContextType {
    isAuthenticated: boolean
    isLoading: boolean
    role: 'admin' | 'user' | null
    currentUserId: string | null
    login: (token: string) => void
    sessionLogin: (token: string) => void
    sessionStoreCourseId: (courseId: string) => void
    logout: () => void
    sessionCourseId: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [role, setRole] = useState<'admin' | 'user' | null>(null)
    const [currentUserId, setCurrentUserId] = useState<string | null>(null)
    const [sessionCourseId, setSessionCourseId] = useState<string | null>(null)

    useLayoutEffect(() => {
        const token = localStorage.getItem('authToken')
        const sessioToken = sessionStorage.getItem('authToken')
        const sessionCourseId = sessionStorage.getItem('courseId')

        setSessionCourseId(sessionCourseId)
        if (token) {
            try {
                const decoded: DecodedToken = jwtDecode(token as string)
                setIsAuthenticated(true)
                setRole(decoded.role)
                setCurrentUserId(decoded.id)
            } catch (err) {
                console.error('Invalid token:', err)
                setIsAuthenticated(false)
                setRole(null)
                setCurrentUserId(null)
                localStorage.removeItem('authToken')
            }
        } if (sessioToken) {
            try {
                const sessionDecoded: DecodedToken = jwtDecode(sessioToken as string)
                setIsAuthenticated(true)
                setRole(sessionDecoded.role)
                setCurrentUserId(sessionDecoded.id)

            } catch (error) {
                console.error('Invalid token:', error)
                setIsAuthenticated(false)
                setRole(null)
                setCurrentUserId(null)
                sessionStorage.removeItem('authToken')
            }
        }

        setIsLoading(false)
    }, [])

    const sessionLogin = (token: string) => {
        try {
            const decoded: DecodedToken = jwtDecode(token)
            sessionStorage.setItem("authToken", token);
            setIsAuthenticated(true)
            setRole(decoded.role)
            setCurrentUserId(decoded.id)
        } catch (err) {
            console.error('Failed to decode token:', err)
        }
    }

    const sessionStoreCourseId = (courseId: string) => {
        sessionStorage.setItem("courseId", courseId);
        setSessionCourseId(courseId);
    }

    const login = (token: string) => {
        try {
            const decoded: DecodedToken = jwtDecode(token)
            localStorage.setItem('authToken', token)
            localStorage.setItem("rememberMe", String(true));
            setIsAuthenticated(true)
            setRole(decoded.role)
        } catch (err) {
            console.error('Failed to decode token:', err)
        }
    }

    const logout = () => {
        localStorage.removeItem('authToken')
        sessionStorage.removeItem('authToken')
        localStorage.removeItem("rememberMe");
        setIsAuthenticated(false)
        setRole(null)
        setCurrentUserId(null)
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            isLoading,
            role,
            login,
            logout,
            sessionLogin,
            currentUserId,
            sessionStoreCourseId,
            sessionCourseId
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
