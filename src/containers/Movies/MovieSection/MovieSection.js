import React from 'react';
import axios from 'axios';
import { NavLink, withRouter } from 'react-router-dom';

import classes from './MovieSection.module.css';
import Movie from './Movie/Movie';

class MovieSection extends React.Component {
  state = {
    movies: [],
    currentPage: 1,
    moviesPerPage: 7,
    loading: false,
  }

  componentDidMount() {
    this.fetchMoviesHandler();
  }

  // Fetching movies
  fetchMoviesHandler = () => {
    if (this.props.url) {
      this.setState({ 
          loading: true,
          movies: []
      })
    }
    axios.get(this.props.url)
          .then(response => {
            console.log(response.data)
            const updatedMovies = [...this.state.movies];
            updatedMovies.concat(response.data.results);
            this.setState({
              movies: this.state.movies.concat(response.data.results),
              loading: false
            })
          }).catch(error => {
            console.log(error)
          }).finally( 
            this.setState({
              loading: false
            }))
  }

  // Pagination


  // Building queries to show detailed info about a movie
  showDetailHandler = ( id ) => {
    const queryParams = [];
    const findMovie = [...this.state.movies];
    let movieItem = '';
    findMovie.map(movie => {
      if(movie.id === id) {
        movieItem = movie;
      }
    })
    console.log(movieItem);
    queryParams.push(encodeURIComponent('overview') + '=' + encodeURIComponent(movieItem.overview));
    queryParams.push(encodeURIComponent('poster') + '=' + encodeURIComponent(movieItem.poster_path));
    queryParams.push(encodeURIComponent('voteAvg') + '=' + encodeURIComponent(movieItem.vote_average));
    // Checking if it's title or name AND realease_date or first_air_date
    if(movieItem.title)          queryParams.push(encodeURIComponent('title') + '=' + encodeURIComponent(movieItem.title));
    if(movieItem.name)           queryParams.push(encodeURIComponent('name') + '=' + encodeURIComponent(movieItem.name));
    if(movieItem.release_date)   queryParams.push(encodeURIComponent('release_date') + '=' + encodeURIComponent(movieItem.release_date));
    if(movieItem.first_air_date) queryParams.push(encodeURIComponent('first_air_date') + '=' + encodeURIComponent(movieItem.first_air_date));
    const queryString = queryParams.join('&');
    this.props.history.push({
        	pathname: '/movieDetails',
        	search: '?' + queryString
      })
  }


  render() {
    let content = (
      <div>Loading...</div> 
    )

    if(!this.state.loading) {
      content = (
        <>
          {this.state.movies.map(movie => (
                  <Movie 
                        key={movie.id} 
                        clicked={() => this.showDetailHandler(movie.id)} 
                        { ...movie } />
          ))}
        </>
      )
    }

    return (
        <div className={classes.Movies}>
          { content }
         </div>
    )
  }
}

// const mapStateToProps = state => {
//   return {
//     loading: state.movieReducer.loading,

//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     onFetchMovies: () => dispatch(actions.fetchMovies()),
//   }
// }

export default withRouter(MovieSection);