import { configureStore, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'phonebook',
  storage,
  whitelist: ['contacts'],
};

const startData = [
  { id: nanoid(4), name: 'Arnold Schwarzenegger', number: '5558801' },
  { id: nanoid(4), name: 'Sylvester Stallone', number: '5558802' },
  { id: nanoid(4), name: 'Bruce Willis', number: '5558803' },
  { id: nanoid(4), name: 'Jason Statham', number: '5558804' },
];

const myContacts = createSlice({
  name: 'contacts',
  initialState: {
    contacts: startData,
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
        };
        state.contacts.push(newContact);
      }
    },
    deleteContact(state, action) {
      if (global.confirm('Delete contact?')) {
        state.contacts = state.contacts.filter(
          ({ id }) => id !== action.payload
        );
      }
    },
    filterChange: (state, action) => {
      state.filter = action.payload;
    },
  },
});

const persistedReducer = persistReducer(persistConfig, myContacts.reducer);

export const { addContact, deleteContact, filterChange } = myContacts.actions;

export const store = configureStore({
  reducer: { contacts: persistedReducer },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
