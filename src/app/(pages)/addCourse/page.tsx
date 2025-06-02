import AddCoursePage from '@/components/Courses/AddCourse'
import ProtectedRoute from '@/components/ProtectedRoute'
import React from 'react'

const page = () => {

    return (
        <div>
     
            <ProtectedRoute allowedRoles={['admin']} >
                <AddCoursePage />
            </ProtectedRoute>
        </div>
    )
}

export default page