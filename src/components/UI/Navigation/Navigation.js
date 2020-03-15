import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./Navigation.module.css";

const navigation = () => {
  return (
    <div className={classes.Navigation}>
      <div className={classes.NavigationHome}>
        <NavLink className={classes.NavigationItem} to='/'>
          Home
        </NavLink>
      </div>
      <NavLink className={classes.NavigationItem} to='/search'>
        Search
      </NavLink>
    </div>
  );
};

export default navigation;
