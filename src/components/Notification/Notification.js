import PropTypes from 'prop-types';
import css from './Notification.module.css';

export function Notification({ msg }) {
  return <p className={css.msgText}>{msg}</p>;
}

Notification.propTypes = {
  msg: PropTypes.string.isRequired,
};
