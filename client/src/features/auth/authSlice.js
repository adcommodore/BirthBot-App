import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { admin: null, token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { admin, accessToken } = action.payload
            state.admin = admin
            state.token = accessToken
        },
        logOut: (state, action) => {
            state.admin = null
            state.token = null
        }
    },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice

export const selectCurrentAdmin = (state) => state.auth.admin
export const selectCurrentToken = (state) => state.auth.token