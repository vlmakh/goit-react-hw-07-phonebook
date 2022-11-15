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
    deleteContact: builder.mutation({
      query(id) {
        return {
          url: `phonebook/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, id) => [{ type: 'Contact', id }],
    }),
  }),
});

export const { useGetContactsQuery, useDeleteContactMutation } = phonebookApi;
