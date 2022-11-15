import { Box } from 'components/Box/Box';
import { AddForm } from 'components/AddForm/AddForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { useSelector, useDispatch } from 'react-redux';
import { filterChange } from 'redux/store';
import {
  useGetContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
} from 'services/api';

function App() {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter.filter);
  const { data, error, isLoading } = useGetContactsQuery();
  
  const [deleteContact, result] = useDeleteContactMutation();
  const [addContact, result1] = useAddContactMutation();

  const handleAdd = async contact => {
    try {
      await addContact(contact);
      alert('Condact added');
    } catch (error) {
      alert(error);
    }
  };

  const handleDelete = async contactId => {
    try {
      deleteContact(contactId);
    } catch (error) {
      alert(error);
    }
  };

  const handleFilter = event => {
    dispatch(filterChange(event.currentTarget.value));
  };

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = data.filter(el =>
    el.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <Box width="360px" mx="auto" py={2}>
      <h1>Phonebook</h1>
      <AddForm onSubmit={handleAdd} />

      <Box
        py={3}
        mt={2}
        border="1px solid #212121"
        borderRadius={3}
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
      >
        <h2>Contacts</h2>
        <Filter value={filter} onChange={handleFilter} />

        {error && (
          <p>Sorry, there is some error. Please try to reload page...</p>
        )}

        {isLoading ? (
          'Loading...'
        ) : (
          <ContactList contacts={filteredContacts ?? []} deleteContact={handleDelete} />
        )}
      </Box>
    </Box>
  );
}

export { App };
