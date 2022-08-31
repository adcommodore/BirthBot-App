import { apiSlice } from '../../app/api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        register: builder.mutation({
            query: credentials => ({
                url:'/admin/register',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        login: builder.mutation({
            query: credentials => ({
                url:'/admin/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
    })
})

export const {
    useRegisterMutation, 
    useLoginMutation
} = authApiSlice