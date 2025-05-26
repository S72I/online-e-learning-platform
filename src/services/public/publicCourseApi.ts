import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type GetCoursesQueryArg = {
    title?: string;
    sortOrder?: 'asc' | 'desc' | '';
};

export const publicCourseApi = createApi({
    reducerPath: 'courseAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ['Courses'],
    endpoints: (builder) => ({
        getCourses: builder.query<any, GetCoursesQueryArg>({
            query: ({ title = '', sortOrder = '' } = {}) => {
                const params = new URLSearchParams();
                if (title) params.append('title', title);
                if (sortOrder) params.append('sortOrder', sortOrder);
                return {
                    url: `/api/courses/getCourses?${params.toString()}`,
                    method: 'GET',
                };
            },
            providesTags: ['Courses'],
        }),
    }),
});

export const { useGetCoursesQuery } = publicCourseApi;
