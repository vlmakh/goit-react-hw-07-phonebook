import PropTypes from 'prop-types';
import css from './ContactList.module.css';
import { MdDeleteForever } from 'react-icons/md';
import { BsPersonCircle } from 'react-icons/bs';

export function ContactList({ contacts, deleteContact }) {
  return (
    <ul className={css.contactList}>
      {contacts
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(({ id, name, number }) => (
          <li key={id} className={css.contactItem}>
            <BsPersonCircle size="16" />
            <span className={css.contactName}>{name}</span>
            <span className={css.contactNumber}>{number}</span>
            <button
              type="button"
              className={css.delButton}
              onClick={() => deleteContact(id)}
              aria-label="Delete contact"
            >
              <MdDeleteForever size="18" />
            </button>
          </li>
        ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  deleteContact: PropTypes.func,
};
