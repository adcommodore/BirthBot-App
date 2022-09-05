import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [authSlice.name]: authSlice.reducer,

    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(apiSlice.middleware),
    
    // remove before production
    devTools: true
    
})