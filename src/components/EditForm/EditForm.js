import PropTypes from 'prop-types';
import css from './EditForm.module.css';
import { HiPhone, HiUserAdd } from 'react-icons/hi';
import { MdSave } from 'react-icons/md';
import { Box } from 'components/Box/Box';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

let schema = yup.object().shape({
  name: yup.string().required(),
  number: yup.string().required(),
});

export function EditForm({ onFormSubmit, nameToUpdate, numberToUpdate }) {
  const updateContact = values => {
    onFormSubmit(values);
  };

  return (
    <Formik
      onSubmit={updateContact}
      initialValues={{
        name: nameToUpdate,
        number: numberToUpdate,
      }}
      validationSchema={schema}
    >
      <Form className={css.editForm}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Box display="flex" alignItems="center" position="relative">
              <HiUserAdd />
              <Field
                className={css.editInput}
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
                className={css.editInput}
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
            className={css.saveButton}
            aria-label="Save contact"
          >
            <MdSave size="40" />
          </button>
        </Box>
      </Form>
    </Formik>
  );
}

EditForm.propTypes = {
  onFormSubmit: PropTypes.func,
  nameToUpdate: PropTypes.string,
  numberToUpdate: PropTypes.string,
};
