import { configureStore } from "@reduxjs/toolkit";
import authApi from "@/services/authAPI";
import courseApi from "@/services/courseAPI";
import { publicCourseApi } from "@/services/public/publicCourseApi";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [publicCourseApi.reducerPath]: publicCourseApi.reducer

  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      courseApi.middleware,
      publicCourseApi.middleware),


});

export default store;






