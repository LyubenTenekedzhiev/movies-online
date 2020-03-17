import React from "react";
import { PropTypes } from "prop-types";

import classes from "./Button.module.css";

const button = ({ clicked, children }) => {
  return (
    <button className={classes.Button} onClick={clicked}>
      {children}
    </button>
  );
};

button.propTypes = {
  clicked: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired
};

export default button;
