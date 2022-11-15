import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const phonebookApi = createApi({
  reducerPath: 'phonebook',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://636f19ecbb9cf402c80fc491.mockapi.io',
  }),
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => `/phonebook`,
    }),
  }),
});

export const { useGetContactsQuery } = phonebookApi;
