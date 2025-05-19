// import authApi from "@/services/authAPI";
// import { configureStore } from "@reduxjs/toolkit";

// const token = localStorage.getItem("authToken");

// const store = configureStore({
//     reducer: {
//         [authApi.reducerPath as any]: authApi.reducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware().concat(authApi.middleware),

//     preloadedState: {
//         auth: {
//             token: token,
//         },
//     },
// });

// export default store;



import { configureStore } from "@reduxjs/toolkit";
import authApi from "@/services/authAPI";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),

});

export default store;






