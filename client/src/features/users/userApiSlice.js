import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState()

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        getUsers: builder.query({
            query: () => '/user',
            transformResponse: responseData => {
                return usersAdapter.setAll(initialState, responseData)
            },
            providesTags: (result) => result ?
            [
                ...result.map(({ id }) => ({ type: 'User', id })),
                { type: 'User', id: 'LIST' },
            ]
            : [{ type: 'User', id: 'LIST' }]
        }),

        createUser: builder.mutation({
            query: user =>({
                url: '/user',
                method: 'POST',
                body: { user }
            }),
            invalidatesTags: [
                { type: 'User', id: 'LIST'}
            ]
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

// returns the query result object
export const selectUsersResult = userApiSlice.endpoints.getUsers.select()

// creates memoized selector
const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data // normalize state object with ids & entities
)

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)