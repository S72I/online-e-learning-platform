import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type GetCoursesQueryArg = {
    title?: string;
    sortOrder?: 'asc' | 'desc' | '';
    level?: string
};

const apiUrl = "/api/courses";

export const publicCourseApi = createApi({
    reducerPath: 'courseAPI',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.DOMAIN }),
    tagTypes: ['Courses'],
    endpoints: (builder) => ({
        getCourses: builder.query<any, GetCoursesQueryArg>({
            query: ({ title = '', sortOrder = '', level = '' } = {}) => {
                const params = new URLSearchParams();
                if (title) params.append('title', title);
                if (sortOrder) params.append('sortOrder', sortOrder);
                if (level) params.append('level', level);
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
        createPurchaseCourse: builder.mutation({
            query: (payload) => ({
                url: `${apiUrl}/purchaseCourse`,
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["Courses"],
        }),
        getPurchasedCourses: builder.query({
            query: (userId) => `${apiUrl}/getPurchasedCourses/${userId}`,
            providesTags: ["Courses"],
        }),
    }),
});
export const {
    useGetCoursesQuery,
    useGetCourseQuery,
    useCreateContactMutation,
    useCreatePurchaseCourseMutation,
    useGetPurchasedCoursesQuery } = publicCourseApi;
