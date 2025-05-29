import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";

const apiUrl = '/api/courses';


type GetCoursesQueryArg = {
    title?: string;
    sortOrder?: 'asc' | 'desc' | '';
};


const courseApi = createApi({
    reducerPath: "courseApi",
    tagTypes: ["Courses"],

    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        // getCourses: builder.query({
        //     query: (title) => {
        //         const url = title ? `${apiUrl}/getCourses?title=${encodeURIComponent(title)}` : `${apiUrl}/getCourses`;
        //         return url;
        //     },
        //     providesTags: ['Courses'],
        // }),

        getCourses: builder.query<any, GetCoursesQueryArg>({
            query: ({ title = '', sortOrder = '' } = {}) => {
                const params = new URLSearchParams();
                if (title) params.append('title', title);
                if (sortOrder) params.append('sortOrder', sortOrder);
                return {
                    url: `${apiUrl}/getCourses?${params.toString()}`,
                    method: 'GET',
                };
            },
            providesTags: ['Courses'],
        }),


        createCourse: builder.mutation({
            query: (newCourse) => ({
                url: `${apiUrl}/addCourse`,
                method: "POST",
                body: newCourse,
            }),
            invalidatesTags: ["Courses"],
        }),

        updateCourse: builder.mutation({
            query: ({ id, payload }) => ({
                url: `${apiUrl}/updateCourse/${id}`,
                method: "PUT",
                body: payload,
            }),
            invalidatesTags: ["Courses"],
        }),

        getCourse: builder.query({
            query: (courseId) => `${apiUrl}/getCourse/${courseId}`,
            providesTags: ["Courses"],
        }),

        deleteCourse: builder.mutation({
            query: (courseId) => ({
                url: `${apiUrl}/deleteCourse/${courseId}`,
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




