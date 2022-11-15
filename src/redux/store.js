import { configureStore, createSlice } from '@reduxjs/toolkit';
import { phonebookApi } from 'services/api';

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
    [phonebookApi.reducerPath]: phonebookApi.reducer,
    filter: myFilter.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(phonebookApi.middleware),
});
