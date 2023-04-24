import { apiSlice } from "../api/apiSlice";

export const conversationsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // get conversations
        getConversations: builder.query({
            query: (email) =>
                `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_CONVERSATIONS_PER_PAGE}`,
        }),
        // get conversation
        getConversation: builder.query({
            query: ({ userEmail, participantEmail }) =>
                `/conversations?participants_like=${userEmail}-${participantEmail}&&participants_like=${participantEmail}-${userEmail}`,
        }),
        // add conversation
        addConversation: builder.mutation({
            query: (data) => ({
                url: '/conversations',
                method: 'POST',
                body: data,
            }),
        }),
        // editconversation
        editConversation: builder.mutation({
            query: ({ id, data }) => ({
                url: `/conversations/${id}`,
                method: 'PATCH',
                body: data,
            }),
        }),
    }),
});

export const { useGetConversationsQuery, useLazyGetConversationQuery, useAddConversationMutation, useEditConversationMutation } = conversationsApi;