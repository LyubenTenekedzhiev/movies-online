import React from "react";
import { PropTypes } from "prop-types";

import classes from "./Backdrop.module.css";

const backdrop = ({ show, clicked }) => (show ? <div className={classes.Backdrop} onClick={clicked} /> : null);

backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
  clicked: PropTypes.func.isRequired
};

export default backdrop;
