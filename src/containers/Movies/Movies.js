import React from 'react';
import { connect } from 'react-redux';

import classes from './Movies.module.css';
import MovieSection from './MovieSection/MovieSection';

class Movies extends React.Component {

  render() {

    return (
      <div>
          <h1 className={classes.Title}>Popular movies</h1>
              <MovieSection api={this.props.urls.popularMovies} />

          <h1 className={classes.Title}>Popular series</h1>
            <MovieSection api={this.props.urls.popularSeries} />

          <h1 className={classes.Title}>Family movies</h1>
            <MovieSection api={this.props.urls.familyMovies} />

          <h1 className={classes.Title}>Documentaries</h1>
            <MovieSection api={this.props.urls.documentaries} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    urls: state.movieReducer.urls
  }
}

export default connect(mapStateToProps)(Movies);