import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getUsers: builder.query({
            query: () => '/user',
            providesTags: (result) => result ?
            [
                ...result.map(({ id }) => ({ type: 'User', id })),
                { type: 'User', id: 'LIST' },
            ]
            : [{ type: 'User', id: 'LIST' }]
        }),

        createUser: builder.mutation({
            query: user => ({
                url: '/user',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']
        }),

        updateUser: builder.mutation({
            query: initialUser => ({
                url: `/user/${initialUser.id}`,
                method: 'PUT',
                body: {
                    ...initialUser,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
        
    })
})

export const {
    useCreateUserMutation,
    useGetUsersQuery,
    useUpdateUserMutation,
} = userApiSlice

