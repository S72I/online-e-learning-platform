import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";
import { ICourse } from "@/components/Types/course";

const apiUrl = '/api/courses';

type GetCoursesQueryArg = {
    title?: string;
    sortOrder?: '' | 'asc' | 'desc';
    level?: string;
    timing?: string;
    minSeconds?: number;
    maxSeconds?: number;
};

type GetCoursesResponse = {
    [x: string]: any;
    courses: ICourse[];
    status: number;
};

const courseApi = createApi({
    reducerPath: "courseApi",
    tagTypes: ["Courses"],

    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getCourses: builder.query<GetCoursesResponse, GetCoursesQueryArg>({
            query: ({
                title = '',
                sortOrder = '',
                level = '',
                timing = '',
                minSeconds,
                maxSeconds,
            } = {}) => {
                const params = new URLSearchParams();
                if (title) params.append('title', title);
                if (sortOrder) params.append('sortOrder', sortOrder);
                if (level) params.append('level', level);
                if (timing) params.append('timing', timing);
                if (minSeconds !== undefined && minSeconds !== null) params.append('minSeconds', String(minSeconds));
                if (maxSeconds !== undefined && maxSeconds !== null) params.append('maxSeconds', String(maxSeconds));
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




