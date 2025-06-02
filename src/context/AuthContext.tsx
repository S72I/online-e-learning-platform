
'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useLayoutEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
    role: 'admin' | 'user'
}

interface AuthContextType {
    isAuthenticated: boolean
    isLoading: boolean
    role: 'admin' | 'user' | null
    login: (token: string) => void
    sessionLogin: (token: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [role, setRole] = useState<'admin' | 'user' | null>(null)

    useLayoutEffect(() => {
        const token = localStorage.getItem('authToken')
        const sessioToken = sessionStorage.getItem('authToken')

        if (token) {
            try {
                const decoded: DecodedToken = jwtDecode(token as string)
                setIsAuthenticated(true)
                setRole(decoded.role)
            } catch (err) {
                console.error('Invalid token:', err)
                setIsAuthenticated(false)
                setRole(null)
                localStorage.removeItem('authToken')
            }
        } if (sessioToken) {
            try {
                const sessionDecoded: DecodedToken = jwtDecode(sessioToken as string)
                setIsAuthenticated(true)
                setRole(sessionDecoded.role)

            } catch (error) {
                console.error('Invalid token:', error)
                setIsAuthenticated(false)
                setRole(null)
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
        } catch (err) {
            console.error('Failed to decode token:', err)
        }
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
        setIsAuthenticated(false)
        setRole(null)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, role, login, logout, sessionLogin }}>
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
