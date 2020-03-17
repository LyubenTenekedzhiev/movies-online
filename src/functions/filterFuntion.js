export function findValidMovies(movie) {
  return movie.poster_path !== null && movie.profile_path !== null && movie.backdrop_path !== null;
}
