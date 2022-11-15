import { Box } from 'components/Box/Box';
import { AddForm } from 'components/AddForm/AddForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, deleteContact, filterChange } from 'redux/store';
import { useGetContactsQuery } from 'services/api'

function App() {
  const dispatch = useDispatch();
  // const [filter, setFilter] = useState('')
  // const contacts = useSelector(state => state.phonebook.contacts);
  const filter = useSelector(state => state.phonebook.filter);
  const { data, error, isLoading } = useGetContactsQuery();
  console.log(filter)
  
 

  const handleAdd = contact => {
    dispatch(addContact(contact));
  };

  const handleDelete = contactId => {
    dispatch(deleteContact(contactId));
  };

  const handleFilter = event => {
    dispatch(filterChange(event.currentTarget.value));
  };

  // const normalizedFilter = filter.toLowerCase();
  // const filteredContacts = contacts.filter(el =>
  //   el.name.toLowerCase().includes(normalizedFilter)
  // );

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

        {error && <p>Sorry, there is some error. Please try to reload page...</p>}

        {isLoading ? ('Loading...') : <ContactList contacts={data ?? []} deleteContact={handleDelete} />}
        
      </Box>
    </Box>
  );
}

export { App };
