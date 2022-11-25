import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const phonebookApi = createApi({
  reducerPath: 'phonebook',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://636f19ecbb9cf402c80fc491.mockapi.io',
  }),
  tagTypes: ['Contact'],

  endpoints: builder => ({
    getContacts: builder.query({
      query: () => `/phonebook`,
      providesTags: ['Contact'],
    }),

    addContact: builder.mutation({
      query: newContact => ({
        url: `/phonebook`,
        method: 'POST',
        body: newContact,
      }),
      invalidatesTags: ['Contact'],
    }),

    updateContact: builder.mutation({
      query: ({ id, ...updatedContact }) => ({
        url: `/phonebook/${id}`,
        method: 'PUT',
        body: updatedContact,
      }),
      invalidatesTags: ['Contact'],
    }),

    deleteContact: builder.mutation({
      query: id => ({
        url: `phonebook/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = phonebookApi;
