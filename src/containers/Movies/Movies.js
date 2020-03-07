import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import classes from './Movies.module.css';
import MovieSection from './MovieSection/MovieSection';

class Movies extends React.Component {

  render() {

    return (
      <div>
          <h1 className={classes.Title}>Popular movies</h1>
            <MovieSection url={this.props.urls.popularMovies} />

          <h1 className={classes.Title}>Popular series</h1>
            <MovieSection url={this.props.urls.popularSeries} />

          <h1 className={classes.Title}>Family movies</h1>
            <MovieSection url={this.props.urls.familyMovies} />

          <h1 className={classes.Title}>Documentaries</h1>
            <MovieSection url={this.props.urls.documentaries} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    urls: state.movieReducer.urls
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchMovies: (url) => dispatch(actions.fetchMovies(url)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies);