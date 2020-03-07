import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './MovieSection.module.css';
import Movie from '../../../components/Movie/Movie';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class MovieSection extends React.Component {
  state = {
    movies: [],
    firstMovie: 0,
    pageNumber: 1,
    loading: false,
  }

  componentDidMount() {
  this.fetchMoviesHandler();
  }

  // Fetching movies
  fetchMoviesHandler = () => {
    if (this.props.api) {
      this.setState({ 
          loading: true,
          movies: []
      })
    }
    axios.get(this.props.api + '&page=' + this.state.pageNumber)
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
            this.setState({
              loading: true
            })
          }).finally( 
            this.setState({
              loading: false
            }))
  }

  // "Pagination"
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
    this.props.history.push('/movieDetails/' + id, this.state.movies)
  }

  render() {
    let content = <Spinner />;

    if(!this.state.loading) {
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

export default connect(mapStateToProps)(withRouter(MovieSection));