import React from 'react';
import { connect } from 'react-redux';

import classes from './Movies.module.css';
import MovieSection from './MovieSection/MovieSection';

// import * as action from '../../../store/actions/index';
// import * as action from '../../store/actions/index';

class Movies extends React.Component {
  // componentWillMount() {
  //   this.props.onFetchMovies(this.props.documentaries)
  //   // console.log(this.props.movies)
  // }

  render() {
    // console.log(this.props);
    return (
      <div>
          <MovieSection url={this.props.url} />
      </div>
    )
  }
}

// const mapStateToProps = state => {
//   return {
//     popularMovies: state.movieReducer.popularMovies,
//     popularSeries: state.movieReducer.popularSeries,
//     familyMovies: state.movieReducer.familyMovies,
//     documentaries: state.movieReducer.documentaries,
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     onFetchMovies: (url) => dispatch(action.fetchMovies(url)),
//   }
// }

export default Movies;