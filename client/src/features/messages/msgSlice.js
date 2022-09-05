import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';
import { sub } from 'date-fns';

const messageAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = messageAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        // getMesssages: builder.query({
        //     query: () => '/msg',
        //     transformResponse: responseData => {
        //         let min = 1;
        //         const loadedMessages = responseData.map(message => {
        //             if(!message?.date) message.date = sub(new Date(), { minutes: min++ }).toISOString();
        //             return message;
        //         });
        //         return messageAdapter.setAll(initialState, loadedMessages)
        //     },
        //     providesTags: (result) => result ?
        //     [
        //         ...result.map(({ id }) => ({ type: 'Message', id })),
        //         { type: 'Message', id: 'LIST' },
        //     ]
        //     : [{ type: 'Message', id: 'LIST' }]
        // }),

        // getMessagesByUserId: builder.query({
        //     query: id => `/msg/?userId=${id}`,
        //     transformResponse: responseData => {
        //         let min = 1;
        //         const loadedMessages = responseData.map(message => {
        //             if(!message?.date) message.date = sub(new Date(), { minutes: min++ }).toISOString();
        //             return message;
        //         });
        //         return messageAdapter.setAll(initialState, loadedMessages)
        //     },
        //     providesTags: (result, error, arg) => [
        //         ...result.ids.map(id => ({ type: 'Message', id }))
        //     ]
        // }),
            
        sendMessage: builder.mutation({
            query: initialMessage =>({
                url: '/msg/send',
                method: 'POST',
                body: {
                    ...initialMessage,
                    userId: Number(initialMessage.userId),
                    date: new Date().toISOString(),
                }
            }),
            invalidatesTags: [
                { type: 'Message', id: "LIST" }
            ]
        }),
    })
})

export const {
    useGetMessagesQuery,
    useGetMessagesByUserIdQuery,
    useSendMessageMutation,
} = extendedApiSlice

// returns query result object
// export const selectMessagesResult = extendedApiSlice.endpoints.getMesssages.select()

// // memoided selector...
// const selectMessagesData = createSelector(
//     selectMessagesResult,
//     MsgResult => MsgResult.data // normalized state object with ids & entities
// )

// export const {
//     selectAll: selectAllMessages,
//     selectById: selectMessageById,
//     selectIds: selectMessagesIds
// } = messageAdapter.getSelectors(state => selectMessagesData(state) ?? initialState)