import { ICourse } from '@/components/Types/course';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type GetCoursesQueryArg = {
    title?: string;
    sortOrder?: string;
    level?: string;
    timing?: string;
    minSeconds?: number;
    maxSeconds?: number;
};

type GetCoursesResponse = {
    courses: ICourse[];
    status: number;
};

const apiUrl = "/api/courses";

export const publicCourseApi = createApi({
    reducerPath: 'courseAPI',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.DOMAIN }),
    tagTypes: ['Courses'],
    endpoints: (builder) => ({
        getCourses: builder.query<GetCoursesResponse, GetCoursesQueryArg>({
            query: ({ title = '', sortOrder = '', level = '', timing = '', minSeconds, maxSeconds } = {}) => {
                const params = new URLSearchParams();
                if (title) params.append('title', title);
                if (sortOrder) params.append('sortOrder', sortOrder);
                if (level) params.append('level', level);
                if (timing) params.append('timing', timing);
                if (minSeconds !== undefined && minSeconds !== null) params.append('minSeconds', String(minSeconds));
                if (maxSeconds !== undefined && maxSeconds !== null) params.append('maxSeconds', String(maxSeconds));
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
