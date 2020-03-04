import * as actionTypes from '../actions/actionTypes';

const initialState = {
  movies: [],
  loading: false,
  error: null,
  fetchedPageCount: null,
  nextPageUrl: null,
  popularMovies: "https://api.themoviedb.org/3/discover/movie?api_key=58964eae3ce65098adc94e1a7187c0e6&sort_by=popularity.desc&page=1&total_results=10",
  popularSeries: "https://api.themoviedb.org/3/trending/tv/week?api_key=58964eae3ce65098adc94e1a7187c0e6&sort_by=popularity.desc",
  familyMovies: "https://api.themoviedb.org/3/discover/movie?api_key=58964eae3ce65098adc94e1a7187c0e6&with_genres=10751|with_genres=16&certification_country=US&certification.lte=G&sort_by=popularity.desc",
  documentaries: "https://api.themoviedb.org/3/discover/movie?api_key=58964eae3ce65098adc94e1a7187c0e6&with_genres=99&sort_by=vote_average.desc&vote_count.gte=10",
}

const movieReducer = ( state = initialState, action ) => {
  switch(action.type) {
    case actionTypes.FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        movies: state.movies.concat(action.movies),
        loading: false,
        fetchedPageCount: action.fetchedPageCount
      }
    
    case actionTypes.FETCH_MOVIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      }

    case actionTypes.FETCH_MOVIES_START:
      return {
        ...state,
        loading: true
      }

    default:
      return state;
  }
}

export default movieReducer;