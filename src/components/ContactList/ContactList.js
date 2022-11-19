import PropTypes from 'prop-types';
import css from './ContactList.module.css';
import { ContactItem } from 'components/ContactItem/ContactItem';

export function ContactList({ contacts }) {
  return (
    <ul>
      {contacts
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(({ id, name, number }) => (
          <li key={id} className={css.contactItem}>
            <ContactItem
              id={id}
              name={name}
              number={number}
              contacts={contacts}
            />
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
};
