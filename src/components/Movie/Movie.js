import React from "react";
import { PropTypes } from "prop-types";

import classes from "./Movie.module.css";
import img from "../../assets/no_image_available.jpeg";

const movie = ({ poster_path, original_title, profile_path, backdrop_path, clicked, title, name }) => {
  return (
    <div className={classes.Movie}>
      {poster_path ? (
        <img className={classes.Movie} src={"http://image.tmdb.org/t/p/w342/" + poster_path} alt={original_title} onClick={clicked} />
      ) : profile_path ? (
        <img className={classes.Movie} src={"http://image.tmdb.org/t/p/w342/" + profile_path} alt={original_title} onClick={clicked} />
      ) : backdrop_path ? (
        <img className={classes.Movie} src={"http://image.tmdb.org/t/p/w342/" + backdrop_path} alt={original_title} onClick={clicked} />
      ) : (
        <img className={classes.Movie} src={img} alt={original_title} onClick={clicked} />
      )}

      {title ? <h3 className={classes.MovieTitle}>{title}</h3> : <h3 className={classes.MovieTitle}>{name}</h3>}
    </div>
  );
};

movie.propTypes = {
  clicked: PropTypes.func.isRequired,
  poster_path: PropTypes.string,
  title: PropTypes.string,
  original_title: PropTypes.string,
  profile_path: PropTypes.string,
  backdrop_path: PropTypes.string,
  name: PropTypes.string
};

export default movie;
