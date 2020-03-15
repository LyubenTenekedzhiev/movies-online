import React from "react";

import classes from "./Movies.module.css";
import { APIsMovieSection } from "urlAPIs/urlAPIs";
import MovieSection from "containers/Movies/MovieSection/MovieSection";

export class Movies extends React.Component {
  render() {
    return (
      <div>
        <h1 className={classes.Title}>Popular movies</h1>
        <MovieSection api={APIsMovieSection.popularMovies} />

        <h1 className={classes.Title}>Popular series</h1>
        <MovieSection api={APIsMovieSection.popularSeries} />

        <h1 className={classes.Title}>Family movies</h1>
        <MovieSection api={APIsMovieSection.familyMovies} />

        <h1 className={classes.Title}>Documentaries</h1>
        <MovieSection api={APIsMovieSection.documentaries} />
      </div>
    );
  }
}

export default Movies;
