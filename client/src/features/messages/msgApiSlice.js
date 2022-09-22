import { apiSlice } from '../../app/api/apiSlice';

export const messageApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getMessagesByUserId: builder.query({
            query: (userId) => 'sms/findbyuser',
            providesTags: (result) => [
                ...result.ids.map(id => ({ type: 'Message', id }))
            ]
        }),
            
        sendMessage: builder.mutation({
            query: message =>({
                url: 'sms/outbound',
                method: 'POST',
                body: { message }
            }),
            invalidatesTags: [
                { type: 'Message', id: "LIST" }
            ]
        }),

    })
})

export const {
    useGetMessagesByUserIdQuery,
    useSendMessageMutation,
} = messageApiSlice
