import React from "react";
import PropTypes from "prop-types";
import { Input } from "reactstrap";

const SearchInput = ({ onChange, ...rest }) => {
  const handleChange = (e) => {
    // TODO: handle debounce
    onChange(e, e.target.value);
  };
  return (
    <Input
      {...rest}
      type="text"
      name="searchItem"
      placeholder="Search..."
      onChange={handleChange}
    />
  );
};

SearchInput.propTypes = {
  onChange: PropTypes.func,
};

export default SearchInput;
