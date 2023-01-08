import { configureStore, createSlice } from '@reduxjs/toolkit';
import { contactsApi } from 'redux/contactsSlice';

const myFilter = createSlice({
  name: 'filter',
  initialState: {
    filter: '',
  },
  reducers: {
    filterChange: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { filterChange } = myFilter.actions;

export const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
    filter: myFilter.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsApi.middleware),
});
