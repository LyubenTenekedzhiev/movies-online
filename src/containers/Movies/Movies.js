import React from 'react';
import { connect } from 'react-redux';

import classes from './Movies.module.css';
import MovieSection from './MovieSection/MovieSection';

class Movies extends React.Component {

  render() {
    return (
      <div>
          <h1 className={classes.Title}>Popular movies</h1>
            <MovieSection url={this.props.popularMovies} />
            
          <h1 className={classes.Title}>Popular series</h1>
            <MovieSection url={this.props.popularSeries} />

          <h1 className={classes.Title}>For the whole family</h1>
            <MovieSection url={this.props.familyMovies} />

          <h1 className={classes.Title}>Documentaries</h1>
            <MovieSection url={this.props.documentaries} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    popularMovies: state.movieReducer.popularMovies,
    popularSeries: state.movieReducer.popularSeries,
    familyMovies: state.movieReducer.familyMovies,
    documentaries: state.movieReducer.documentaries,
  }
}

export default connect(mapStateToProps)(Movies);