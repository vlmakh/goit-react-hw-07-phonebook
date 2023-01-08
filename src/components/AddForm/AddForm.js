import css from './AddForm.module.css';
import { HiPhone, HiUserAdd } from 'react-icons/hi';
import { MdOutlineDataSaverOn } from 'react-icons/md';
import { Box } from 'components/Box/Box';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import {
  useFetchContactsQuery,
  useAddContactMutation,
} from 'redux/contactsSlice';

let schema = yup.object().shape({
  name: yup.string().required(),
  number: yup.number().required(),
});

export function AddForm({ onFormSubmit }) {
  const [addContact] = useAddContactMutation();
  const { data: contacts } = useFetchContactsQuery();

  const handleSubmit = async (newContact, { resetForm }) => {
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

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={schema}
    >
      <Form className={css.addForm}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Box display="flex" alignItems="center" position="relative">
              <HiUserAdd />
              <Field
                className={css.addInput}
                type="text"
                name="name"
                placeholder="Name"
              />
              <ErrorMessage
                component="div"
                className={css.mistake}
                name="name"
              />
            </Box>

            <Box display="flex" alignItems="center" mt={3} position="relative">
              <HiPhone />
              <Field
                className={css.addInput}
                type="tel"
                name="number"
                placeholder="number"
              />
              <ErrorMessage
                component="div"
                className={css.mistake}
                name="number"
              />
            </Box>
          </Box>

          <button
            type="submit"
            className={css.addButton}
            aria-label="Add contact"
          >
            <MdOutlineDataSaverOn size="40" fill="currentColor" />
          </button>
        </Box>
      </Form>
    </Formik>
  );
}
