import { useGetCoursesQuery } from '@/services/courseAPI'
import { Button } from '@mui/material'
import React, { useEffect } from 'react'

const GetCourses = () => {
    let arg: any
    const { data }: any = useGetCoursesQuery(arg)

    useEffect(() => { }, [useGetCoursesQuery])
    console.log("data", data);

    const handelClick = () => {
    }

    return (
        <div>
            <Button onClick={handelClick}>Click Me</Button>
        </div>
    )
}

export default GetCourses