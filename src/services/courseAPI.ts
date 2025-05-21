import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";

const courseApi = createApi({
    reducerPath: "courseApi",
    tagTypes: ["Courses"],

    baseQuery: baseQueryWithReauth,
    // baseQuery: fetchBaseQuery({ baseUrl: process.env.DOMAIN }),
    endpoints: (builder) => ({
        getCourses: builder.query({
            query: () => "/api/users/getcourses",
            providesTags: ["Courses"],
        }),

        createCourse: builder.mutation({
            query: (newCourse) => ({
                url: "/api/courses/addCourse",
                method: "POST",
                body: newCourse,
            }),
            invalidatesTags: ["Courses"],
        }),

        updateCourse: builder.mutation({
            query: ({ id, updatedCourse }) => ({
                url: `/api/courses/updateCourse/${id}`,
                method: "PUT",
                body: updatedCourse,
            }),
            invalidatesTags: ["Courses"],
        }),

        getCourse: builder.query({
            query: (courseId) => `/api/courses/getCourse/${courseId}`,
             providesTags: ["Courses"],
        }),

        deleteCourse: builder.mutation({
            query: (courseId) => ({
                url: `/api/courses/deleteCourse/${courseId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Courses"],
        }),
    }),
});

export const {
    useGetCoursesQuery,
    useGetCourseQuery,
    useCreateCourseMutation,
    useUpdateCourseMutation,
    useDeleteCourseMutation,
} = courseApi;

export default courseApi;




