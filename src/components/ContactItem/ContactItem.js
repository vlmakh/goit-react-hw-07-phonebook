import PropTypes from 'prop-types';
import css from './ContactItem.module.css';
import { MdDeleteForever } from 'react-icons/md';
import { BsPersonCircle } from 'react-icons/bs';
import { useDeleteContactMutation } from 'services/api';

export function ContactItem({ id, name, number }) {
  const [deleteContact, { isLoading }] = useDeleteContactMutation();

  const handleDelete = async contactId => {
    if (global.confirm('Delete contact?')) {
      try {
        deleteContact(contactId);
      } catch (error) {
        alert(error);
      }
    }
  };

  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  return (
    <>
      <BsPersonCircle size="18" color={getRandomHexColor()} />
      <span className={css.contactName}>{name}</span>
      <span className={css.contactNumber}>{number}</span>
      <button
        type="button"
        className={css.delButton}
        onClick={() => handleDelete(id)}
        aria-label="Delete contact"
        disabled={isLoading}
      >
        <MdDeleteForever size="18" />
      </button>
    </>
  );
}

ContactItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
};
