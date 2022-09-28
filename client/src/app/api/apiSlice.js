import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { setCredentials, logOut } from '../../features/auth/authSlice';

// const baseQuery = fetchBaseQuery({
//     baseUrl: 'http://localhost:5001',
//     credentials: 'include',
//     prepareHeaders: (headers, { getState }) => {
//         const token = getState()?.auth?.token
//         if (token) {
//             headers.set('authorization', `Bearer ${token}`)
//         }
//         return headers
//     }
// })

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//     let result = await baseQuery(args, api, extraOptions)

//     if (result?.error?.originalStatus === 403) {
//         console.log('Sending refresh token.')

//         // send refresh token to get new access token
//         const refreshResult = await baseQuery('/admin/refresh', api, extraOptions)
//         console.log(refreshResult)
//         if (refreshResult?.data) {
//             const admin = api.getState().auth.admin

//             // store the new token
//             api.dispatch(setCredentials({ ...refreshResult.data, admin }))

//             // retry the original query with new access token
//             result = await baseQuery(args, api, extraOptions)
//         } else {
//             api.dispatch(logOut())
//         }
//     }
//     return result
// }

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_HOST}/api/` }),
    tagTypes: ['Admin', 'User', 'Content', 'Message'],
    endpoints: builder => ({})
})