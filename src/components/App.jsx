import { Box } from 'components/Box/Box';
import { AddForm } from 'components/AddForm/AddForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { useSelector } from 'react-redux';
import { useFetchContactsQuery, useAddContactMutation } from 'redux/contactsSlice';
import { Notification } from 'components/Notification/Notification';

function App() {
  const filter = useSelector(state => state.filter.filter);
  const { data: contacts, error, isLoading } = useFetchContactsQuery();
  const [addContact] = useAddContactMutation();

  const handleAdd = async (newContact, resetForm) => {
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      alert(` ${newContact.name} is already in contacts.`);
      return;
    }
    try {
      await addContact(newContact);
    } catch (error) {
      alert(error);
    } finally {
      resetForm();
    }
  };

  const filteredContacts = contacts
    ? contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
    : '';

  return (
    <Box width="320px" mx="auto" position="relative">
      <AddForm onFormSubmit={handleAdd} />

      <Box
        py={2}
        mt={2}
        border="1px solid #212121"
        borderRadius={3}
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.8)"
        backgroundColor="white"
      >
        {filteredContacts.length > 0 || filter ? (
          <Filter />
        ) : (
          <Notification msg="No contacts added" />
        )}

        {error && (
          <p>Sorry, there is some error. Please try to reload page...</p>
        )}

        {isLoading ? (
          <Notification msg="Loading..." />
        ) : (
          <ContactList contacts={filteredContacts ?? []} />
        )}
      </Box>
    </Box>
  );
}

export { App };
