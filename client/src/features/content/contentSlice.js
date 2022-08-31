import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        getContent: builder.query({
            query: () => ({
                url: '/content',
                method: 'GET',
                body: content
            }),
            provideTags: ['Content']
        }),

        createContent: builder.mutation({
            query: (content) => ({
                url: '/content',
                method: 'POST',
                body: content
            }),
            invalidatesTags: ['Content']
        }),
        updateContent: builder.mutation({
            query: (content) => ({
                url: `/content/${content.id}`,
                method: 'PUT',
                body: content
            }),
            invalidatesTags: ['Content']
        }),
    })
})

export const {
    useGetContentQuery,
    useCreateContentMutation,
    useUpdateContentMutation
} = contentApiSlice