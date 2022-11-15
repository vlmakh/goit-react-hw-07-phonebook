import PropTypes from 'prop-types';
import css from './Filter.module.css';
import { Box } from 'components/Box/Box';

export function Filter({ value, onChange }) {
  return (
    <Box p={3}>
      <input
        className={css.filterInput}
        type="text"
        name="filter"
        value={value}
        onChange={onChange}
        placeholder="Find contact by name"
      />
    </Box>
  );
}

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
