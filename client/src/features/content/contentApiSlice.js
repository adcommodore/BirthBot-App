import { apiSlice } from '../../app/api/apiSlice';

export const contentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        getAllContent: builder.query({
            query: () => ({
                url: '/content',
                method: 'GET',
            }),
            provideTags: ['Content']
        }),

        getOneContent: builder.query({
            query: (id) => ({
                url: `/content/${id}`,
                method: 'GET',
            }),
            provideTags: ['Content']
        }),

        createContent: builder.mutation({
            query: (content) => ({
                url: '/content',
                method: 'POST',
                body: { content }
            }),
            invalidatesTags: ['Content']
        }),
        updateContent: builder.mutation({
            query: (content) => ({
                url: `/content/${content.id}`,
                method: 'PUT',
                body: { content }
            }),
            invalidatesTags: ['Content']
        }),
    })
})

export const {
    useGetAllContentQuery,
    useGetOneContentQuery,
    useCreateContentMutation,
    useUpdateContentMutation
} = contentApiSlice