import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";

const courseApi = createApi({
    reducerPath: "courseApi",
    tagTypes: ["Courses"],
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getCourses: builder.query({
            query: () => "/api/courses",
            providesTags: ["Courses"],
        }),

        createCourse: builder.mutation({
            query: (newCourse) => ({
                url: "/api/course/addCourse",
                method: "POST",
                body: newCourse,
            }),
            invalidatesTags: ["Courses"],
        }),

        updateTask: builder.mutation({
            query: ({ id, updatedTask }) => ({
                url: `/api/course/update/${id}`,
                method: "PUT",
                body: updatedTask,
            }),
            invalidatesTags: ["Courses"],
        }),

        getTask: builder.query({
            query: (taskId) => `/api/course/${taskId}`,
        }),

        deleteTask: builder.mutation({
            query: (taskId) => ({
                url: `/api/course/delete/${taskId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Courses"],
        }),
    }),
});

export const {
    useGetCoursesQuery,
    useGetTaskQuery,
    useCreateCourseMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} = courseApi;

export default courseApi;
