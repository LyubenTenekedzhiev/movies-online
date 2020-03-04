import React from 'react';
import { connect } from 'react-redux';

// adding CSS
import classes from './MovieSection.module.css';
import { NavLink } from 'react-router-dom';

import * as action from '../../../store/actions/index';

// import Movie from './Movie/Movie';


class MovieSection extends React.Component {

  componentWillMount() {
    this.props.onFetchMovies(this.props.url)
  }


  render() {
    console.log(this.props.movies)
    let content = (
      <div>Loading...</div> 
    )

    if(!this.props.loading) {
      content = (
        <>
          {this.props.movies.map(movie => (
            <NavLink to={'/movie/' + movie.id} key={movie.id}>
                  {/* <Movie clicked={() => this.showMovieHandler(movie.id)} { ...movie } />
                  {this.props.children} */}
                  <img className={classes.Movie} src={"http://image.tmdb.org/t/p/w342/" + movie.poster_path}/>
            </NavLink>
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


const mapStateToProps = state => {
  return {
    movies: state.movieReducer.movies,
    loading: state.movieReducer.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchMovies: (url) => dispatch(action.fetchMovies(url)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MovieSection);