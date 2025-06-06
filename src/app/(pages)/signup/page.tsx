import SignUp from '@/components/Auth/signup'
import PublicOnlyRoute from '@/components/PublicOnlyRoute'
import React from 'react'

const page = () => {
    return (
        <>
            <PublicOnlyRoute>
                <SignUp />
            </PublicOnlyRoute>
        </>
    )
}

export default page