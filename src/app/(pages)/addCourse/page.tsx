import AddCoursePage from '@/components/Courses/AddCourse'
import ProtectedRoute from '@/components/ProtectedRoute'
import React from 'react'

const page = () => {
    return (
        <>
            <ProtectedRoute allowedRoles={['admin']} >
                <AddCoursePage />
            </ProtectedRoute>
        </>
    )
}

export default page