// import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseQuery = fetchBaseQuery({
//     baseUrl: process.env.DOMAIN,
//     prepareHeaders: (headers) => {
//         const token = localStorage.getItem("authToken");
//         if (token) {
//             headers.set("Authorization", `Bearer ${token}`);
//         }
//         return headers;
//     },
// });

// const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
//     const result = await baseQuery(args, api, extraOptions);
//     if (result.error?.status === 401) {
//         localStorage.removeItem("authToken");
//         window.location.href = "/login";
//     }

//     return result;
// };

// export default baseQueryWithReauth;
'use client'

import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("authToken");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {

    const result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 498 && typeof window !== "undefined") {
        localStorage.removeItem("authToken");
        localStorage.removeItem("rememberMe");
        window.location.href = "/login";
    }

    return result;
};

export default baseQueryWithReauth;



