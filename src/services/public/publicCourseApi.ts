import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type GetCoursesQueryArg = {
    title?: string;
    sortOrder?: 'asc' | 'desc' | '';
};

const apiUrl = "/api/courses";

export const publicCourseApi = createApi({
    reducerPath: 'courseAPI',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.DOMAIN }),
    tagTypes: ['Courses'],
    endpoints: (builder) => ({
        getCourses: builder.query<any, GetCoursesQueryArg>({
            query: ({ title = '', sortOrder = '' } = {}) => {
                const params = new URLSearchParams();
                if (title) params.append('title', title);
                if (sortOrder) params.append('sortOrder', sortOrder);
                return {
                    url: `${apiUrl}/allcourses?${params.toString()}`,
                    method: 'GET',
                };
            },
            providesTags: ['Courses'],
        }),
        
        getCourse: builder.query({
            query: (courseId) => `${apiUrl}/getcourse/${courseId}`,
            providesTags: ["Courses"],
        }),
        createContact: builder.mutation({
            query: (payload) => ({
                url: `${apiUrl}/contact`,
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["Courses"],
        }),
    }),
});


//    getCourses: builder.query({
//             query: (title) => {
//                 const url = title ? `${apiUrl}/getCourses?title=${encodeURIComponent(title)}` : '/api/courses/getCourses';
//                 return url;
//             },
//             providesTags: ['Courses'],
//         }),

export const { useGetCoursesQuery, useGetCourseQuery, useCreateContactMutation, } = publicCourseApi;
