
// import { createApi } from "@reduxjs/toolkit/query/react";
// import baseQueryWithReauth from "./baseQueryWithReauth";

// const authApi = createApi({
//     reducerPath: "authApi",
//     baseQuery: baseQueryWithReauth,
//     endpoints: (builder) => ({
//         loginUser: builder.mutation({
//             query: (userData) => ({
//                 url: "/api/users/login",
//                 method: "POST",
//                 body: userData,
//             }),
//         }),

//         registerUser: builder.mutation({
//             query: (userData) => ({
//                 url: "/api/users/signup",
//                 method: "POST",
//                 body: userData,
//             }),
//         }),
//     }),
// });

// export const { useLoginUserMutation, useRegisterUserMutation } = authApi;

// export default authApi;


import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";

const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (userData) => ({
                url: "/api/users/login",
                method: "POST",
                body: userData,
            }),
        }),

        registerUser: builder.mutation({
            query: (userData) => ({
                url: "/api/users/signup",
                method: "POST",
                body: userData,
            }),
        }),
    }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;

export default authApi;
