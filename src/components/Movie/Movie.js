import React from 'react';

import classes from './Movie.module.css';

const movie = ( props ) => {

    return (
      // Checking if props for the poster is either POSTER_PATH || PROFILE_PATH || BACKDROP_PATH
      <div className={classes.Movie}>
        { props.poster_path 
        ? <img className={classes.Movie} 
                src={"http://image.tmdb.org/t/p/w342/" + props.poster_path} 
                alt={props.original_title} 
                onClick={props.clicked} />
        : props.profile_path
        ? <img className={classes.Movie} 
        src={"http://image.tmdb.org/t/p/w342/" + props.profile_path} 
        alt={props.original_title} 
        onClick={props.clicked} /> 
        : props.backdrop_path 
        ? <img className={classes.Movie} 
        src={"http://image.tmdb.org/t/p/w342/" + props.backdrop_path} 
        alt={props.original_title} 
        onClick={props.clicked} /> 
        : null }
        
        { props.title ? (<h3 className={classes.MovieTitle}>{props.title}</h3>) 
                      : (<h3 className={classes.MovieTitle}>{props.name}</h3>) }
      </div>
    )
  }

export default movie;