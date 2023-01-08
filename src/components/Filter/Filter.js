import css from './Filter.module.css';
import { Box } from 'components/Box/Box';
import { useSelector, useDispatch } from 'react-redux';
import { filterChange } from 'redux/filterSlice';

export function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter.filter);

  const handleFilter = event => {
    dispatch(filterChange(event.currentTarget.value));
  };

  return (
    <Box p={2}>
      <input
        className={css.filterInput}
        type="text"
        name="filter"
        value={filter}
        onChange={handleFilter}
        placeholder="Find contact by name"
      />
    </Box>
  );
}
