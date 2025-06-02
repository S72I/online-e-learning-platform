'use client';

import {
    fetchBaseQuery,
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.DOMAIN,
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

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
        if (typeof window !== "undefined") {

            localStorage.removeItem("authToken");
            localStorage.removeItem("rememberMe");
            window.location.href = "/login";
        }
    }

    return result;
};

export default baseQueryWithReauth;