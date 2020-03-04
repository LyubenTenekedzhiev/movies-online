import React from 'react';

import classes from './Movie.module.css';

const movie = ( props ) => {

    return (
      <div className={classes.Movie}>
        { props.poster_path 
        ? <img className={classes.Movie} 
                src={"http://image.tmdb.org/t/p/w342/" + props.poster_path} 
                alt={props.original_title} 
                onClick={props.clicked} />
        : null }
      </div>
    )
  }

export default movie;