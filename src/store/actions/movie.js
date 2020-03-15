import * as actionTypes from './actionTypes';
import axios from 'axios';


export const fetchMoviesSuccess = ( fetchedMovies, currentPage, category ) => {
  return {
    type: actionTypes.FETCH_MOVIES_SUCCESS,
    movies: fetchedMovies,
    category,
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

export const fetchMovies = (url, category) => {
  return dispatch => {
    dispatch(fetchMoviesStart());
    axios.get(url)
          .then(response => {
            dispatch(fetchMoviesSuccess(response.data.results, response.data.page, category))  
            // console.log(response.data.results)
          }).catch(error => {
            dispatch(fetchMoviesFail(error));
          })
   }
}
