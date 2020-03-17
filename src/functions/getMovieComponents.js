import React from "react";
import Movie from "../components/Movie/Movie";

export function getMovieComponents(movie) {
  const randomKeyNumber = Math.random();
  return <Movie key={`${movie.title}-${movie.id}-${randomKeyNumber}`} clicked={() => this.showDetailHandler(movie.id)} {...movie} />;
}

