import React from 'react';
import axios from 'axios';

import classes from './SearchMovies.module.css';
import Searchbar from '../../components/UI/Searchbar/Searchbar';
import Button from '../../components/UI/Button/Button';
import Movie from '../../components/Movie/Movie';

class SearchMovies extends React.Component {
  state = {
    movies: [],
    url: 'https://api.themoviedb.org/3/search/movie?api_key=58964eae3ce65098adc94e1a7187c0e6&language=en-US&sort_by=popularity.desc&include_adult=false&page=1',
    loading: false,
    query: '',
  }

   // Fetching movies
  fetchMoviesHandler = () => {
  if (this.state.url) {
    this.setState({ 
        loading: true,
        movies: []
    })
  }
  axios.get(this.state.url +'&query=' + this.state.query)
        .then(response => {
          const updatedMovies = [...this.state.movies];
          updatedMovies.concat(response.data.results);
          this.setState({
            movies: this.state.movies.concat(response.data.results),
            loading: false
          })
        }).catch(error => {
          console.log(error.response)
        }).finally( 
          this.setState({
            loading: false
          }));
  }

  // Forming a search query
  buildQueryHandler = ( event ) => {
    event.preventDefault();
    const query = event.target.value;
    this.setState({
      query: query
    })
    this.fetchMoviesHandler();
  }

  // ... for MOVIES
  searchMovieHandler = () => {
    this.setState({
      url: 'https://api.themoviedb.org/3/search/movie?api_key=58964eae3ce65098adc94e1a7187c0e6&language=en-US&sort_by=popularity.desc&include_adult=false&page=1'
    })
  }

  // ... for SERIES
  searchSeriesHandler = () => {
    this.setState({
      url: 'https://api.themoviedb.org/3/search/tv?api_key=58964eae3ce65098adc94e1a7187c0e6&language=en-US&sort_by=popularity.desc&include_adult=false&page=1'
    })
  }

  // finding details about the movie
  showDetailHandler = ( id ) => {
    this.props.history.push('/movieDetails/' + id, this.state.movies)
  }

  render() {
    let content = (
      <h1>Loading...</h1>
    )

    if(!this.state.loading) {
      content = (
        <>
          {this.state.movies.filter(movie => {
            return (movie.poster_path !== null) && (movie.profile_path !== null) && (movie.backdrop_path !== null)
          }).map(movie => (
                  <Movie 
                        key={movie.id}
                        nextPage={this.nextPageHandler}
                        clicked={() => this.showDetailHandler(movie.id)}
                        { ...movie } />
          ))}
        </>
      )
    }

    return (
      <div className={classes.SearchMovies} >
        <Searchbar changed={(event) => this.buildQueryHandler(event)} value={this.state.query} />
        <div className={classes.Buttons}>
            <Button clicked={this.searchMovieHandler}>Looking for movies?</Button>
            <Button clicked={this.searchSeriesHandler}>Or maybe series?</Button>
        </div>
        <div className={classes.Movies}>
          { content }
        </div>
      </div>
    )
  }
}

export default SearchMovies;