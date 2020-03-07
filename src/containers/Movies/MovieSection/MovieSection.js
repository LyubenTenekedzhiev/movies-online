import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

import classes from './MovieSection.module.css';
import Movie from '../../../components/Movie/Movie';
import Button from '../../../components/UI/Button/Button';

class MovieSection extends React.Component {
  state = {
    movies: [],
    firstMovie: 0,
    pageNumber: 1,
    loading: false,
    url: '',
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
    axios.get(this.props.url + '&page=' + this.state.pageNumber)
          .then(response => {
            const updatedMovies = [...this.state.movies];
            updatedMovies.push(response.data.results);
            this.setState({
              movies: this.state.movies.concat(response.data.results),
              loading: false
            })
            // console.log(response.data)
          }).catch(error => {
            console.log(error)
          }).finally( 
            this.setState({
              loading: false
            }))
  }

  // Pagination
  nextPageHandler = () => {
    if(this.state.movies.length - this.state.firstMovie >= 13) {
      this.setState({
        firstMovie: this.state.firstMovie += 7,
      }) 
    } else {
      this.setState({
        pageNumber: this.state.pageNumber += 1,
        firstMovie: this.state.firstMovie = 0,
      })
      this.fetchMoviesHandler();
    }
  } 
  prevPageHandler = () => {
    if(this.state.movies.length - this.state.firstMovie <= 13) {
      this.setState({
        firstMovie: this.state.firstMovie -= 7,
      }) 
    } else {
      if(this.state.pageNumber <= 1) {
        this.setState({
          pageNumber: this.state.pageNumber = 1
        })
      } else {
        this.setState({
          pageNumber: this.state.pageNumber -= 1,
          firstMovie: this.state.firstMovie = 0,
        })
        this.fetchMoviesHandler();
      }
    }
  } 

  // Building queries to show detailed info about a movie
  showDetailHandler = ( id ) => {
    // const queryParams = [];
    // const findMovie = [...this.state.movies];
    // let movieItem = '';
    // findMovie.map(movie => {
    //   if(movie.id === id) {
    //     movieItem = movie;
    //   }
    // })
    // queryParams.push(encodeURIComponent('overview') + '=' + encodeURIComponent(movieItem.overview));
    // queryParams.push(encodeURIComponent('poster') + '=' + encodeURIComponent(movieItem.poster_path));
    // queryParams.push(encodeURIComponent('voteAvg') + '=' + encodeURIComponent(movieItem.vote_average));
    // // Checking if it's title or name AND realease_date or first_air_date
    // if(movieItem.title)          queryParams.push(encodeURIComponent('title') + '=' + encodeURIComponent(movieItem.title));
    // if(movieItem.name)           queryParams.push(encodeURIComponent('name') + '=' + encodeURIComponent(movieItem.name));
    // if(movieItem.release_date)   queryParams.push(encodeURIComponent('release_date') + '=' + encodeURIComponent(movieItem.release_date));
    // if(movieItem.first_air_date) queryParams.push(encodeURIComponent('first_air_date') + '=' + encodeURIComponent(movieItem.first_air_date));
    // const queryString = queryParams.join('&');
    // this.props.history.push({
    //     	pathname: '/movieDetails',
    //     	search: '?' + queryString
    //   })
    this.props.history.push('/movieDetails/' + id, this.state.movies)
  }


  render() {
    let content = (
      <h1>Loading...</h1>
    )

    if(!this.props.loading) {
      content = (
        <>
          {this.state.movies.slice(this.state.firstMovie).map(movie => (
                  <Movie 
                        key={movie.id} 
                        clicked={() => this.showDetailHandler(movie.id)}
                        { ...movie } />
          ))}
        </>
      )
    }

    return (
      <div className={classes.MovieSection}>
            <div className={classes.Movies}>
              { content }
            </div>
            <div className={classes.MovieButtons}>
                <Button clicked={this.prevPageHandler}>Previous page</Button>
                <Button clicked={this.nextPageHandler}>Next page</Button>
            </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.movieReducer.loading,
    movies: state.movieReducer.movies
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchMovies: (url) => dispatch(actions.fetchMovies(url)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MovieSection));