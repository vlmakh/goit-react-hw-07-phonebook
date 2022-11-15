import PropTypes from 'prop-types';
import css from './Filter.module.css';
import { Box } from 'components/Box/Box';
// import { BiSearch } from 'react-icons/bi';

export function Filter({ value, onChange }) {
  return (
    <Box p={3}>
      {/* <BiSearch size="20" /> */}
      <input
        className={css.filterInput}
        type="text"
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
