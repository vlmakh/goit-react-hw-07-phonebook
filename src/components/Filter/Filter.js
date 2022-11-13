import PropTypes from 'prop-types';
import css from './Filter.module.css';

export function Filter({ value, onChange }) {
  return (
    <input
      className={css.filterInput}
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Find contact by name"
    />
  );
}

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
