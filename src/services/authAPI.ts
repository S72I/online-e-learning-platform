import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";

const api = '/api/users'

const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (userData) => ({
                url: `${api}/login`,
                method: "POST",
                body: userData,
            }),
        }),

        registerUser: builder.mutation({
            query: (userData) => ({
                url: `${api}/signup`,
                method: "POST",
                body: userData,
            }),
        }),
    }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;

export default authApi;
