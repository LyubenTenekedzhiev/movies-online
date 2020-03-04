import * as actionTypes from './actionTypes';
import axios from 'axios';


export const fetchMoviesSuccess = ( fetchedMovies, currentPage ) => {
  return {
    type: actionTypes.FETCH_MOVIES_SUCCESS,
    movies: fetchedMovies,
    fetchedPageCount: currentPage,
  }
}

export const fetchMoviesStart = () => {
  return {
    type: actionTypes.FETCH_MOVIES_START
  }
}

export const fetchMoviesFail = ( error ) => {
  return {
    type: actionTypes.FETCH_MOVIES_FAIL,
    error: error
  }
}

export const fetchMovies = (url) => {
  return dispatch => {
    dispatch(fetchMoviesStart());
    axios.get(url)
          .then(response => {
            dispatch(fetchMoviesSuccess(response.data.results, response.data.page))  
            console.log(response.data)
          }).catch(error => {
            dispatch(fetchMoviesFail(error));
          })
   }
}
