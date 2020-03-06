import React from 'react';
import classes from './Searchbar.module.css';

const searchBar = ( props ) => {
  return (
    <div className={classes.SearchbarContainer} >
        <input  className={classes.Searchbar}
                type="text" 
                placeholder="Search..."
                value={props.value}
                onChange={props.changed} />
    </div>
  )
}

export default searchBar;