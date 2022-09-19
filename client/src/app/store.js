import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authSlice from "../features/auth/authSlice";
import userSlice from '../features/users/userSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [authSlice.name]: authSlice.reducer,
        [userSlice.name]: userSlice.reducer,

    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(apiSlice.middleware),
    
    // remove before production
    devTools: true
    
})