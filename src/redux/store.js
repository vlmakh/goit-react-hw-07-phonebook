import { configureStore, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { phonebookApi } from 'services/api';

// const startData = [
//   {
//     id: nanoid(4),
//     name: 'Arnold Schwarzenegger',
//     number: '5558801',
//     createdAt: '2022-11-14T00:42:34.001Z',
//   },
//   {
//     id: nanoid(4),
//     name: 'Sylvester Stallone',
//     number: '5558802',
//     createdAt: '2022-11-14T00:42:34.001Z',
//   },
//   {
//     id: nanoid(4),
//     name: 'Bruce Willis',
//     number: '5558803',
//     createdAt: '2022-11-14T00:42:34.001Z',
//   },
//   {
//     id: nanoid(4),
//     name: 'Jason Statham',
//     number: '5558804',
//     createdAt: '2022-11-14T00:42:34.001Z',
//   },
// ];

// const savedData = JSON.parse(localStorage.getItem('phonebook'));

const myContacts = createSlice({
  name: 'phonebook',
  initialState: {
    contacts: [],
    isLoading: true,
    error: null,
    filter: '',
  },
  reducers: {
    addContact(state, action) {
      if (
        state.contacts.some(
          ({ name }) => name.toLowerCase() === action.payload.name.toLowerCase()
        )
      ) {
        alert(`${action.payload.name} is already in contacts`);
      } else {
        const newContact = {
          id: nanoid(4),
          name: action.payload.name,
          number: action.payload.number,
          createdAt: '',
        };
        state.contacts.push(newContact);
      }
      localStorage.setItem('phonebook', JSON.stringify(state.contacts));
    },
    deleteContact(state, action) {
      if (global.confirm('Delete contact?')) {
        state.contacts = state.contacts.filter(
          ({ id }) => id !== action.payload
        );
      }
      localStorage.setItem('phonebook', JSON.stringify(state.contacts));
    },
    filterChange: (state, action) => {
      state.filter = action.payload;
      localStorage.setItem('phonebook', JSON.stringify(state.contacts));
    },
  },
});

export const { addContact, deleteContact, filterChange } = myContacts.actions;

export const store = configureStore({
  reducer: {
    [phonebookApi.reducerPath]: phonebookApi.reducer,
    // phonebook: myContacts.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(phonebookApi.middleware),
});
