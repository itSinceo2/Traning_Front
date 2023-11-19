import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const Search = ({ options, searchLabel, labelProp, onSearch }) => {

  const handleSearch = (event, value) => {

    if (!value) {
      return onSearch(options);
      
    }

    const filterValue =
      value && typeof value === 'object' && value[labelProp]
        ? value[labelProp].toLowerCase()
        : '';

    const filteredOptions = options.filter((option) =>
      option[labelProp].toLowerCase().includes(filterValue)
    );

    onSearch(filteredOptions);
  };

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      sx={{ width: 300, color: 'black' }}
      getOptionLabel={(option) => option[labelProp]}
      onChange={(event, value) => handleSearch(event, value)}
      renderInput={(params) => <TextField {...params} label={searchLabel} sx={{ marginY: 2 }} />}
      clearOnBlur={false}
    />
  );
};

export default Search;
