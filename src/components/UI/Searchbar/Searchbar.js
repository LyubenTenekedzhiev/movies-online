import React from "react";
import { PropTypes } from "prop-types";

import classes from "./Searchbar.module.css";

const searchBar = ({ value, changed }) => {
  return (
    <div className={classes.SearchbarContainer}>
      <input className={classes.Searchbar} type="text" placeholder="Search..." value={value} onChange={changed} />
    </div>
  );
};

searchBar.propTypes = {
  value: PropTypes.string.isRequired,
  changed: PropTypes.func.isRequired
};

export default searchBar;
