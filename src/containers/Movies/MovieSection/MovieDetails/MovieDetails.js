import React from 'react';

import classes from './MovieDetails.module.css';

class MovieDetail extends React.Component {
  state = {
    overview: '',
    image: '',
    voteAverage: null,
    title: '',
    release_date: null,
  }

  componentDidMount() {
    const queryParams = new URLSearchParams(this.props.location.search);
    let overview = '';
    let image = "http://image.tmdb.org/t/p/w342";
    let voteAverage = null;
    let title = '';
    let release_date = null;
    for(let param of queryParams) {
    //['key', 'value']
      if(param[0] === 'overview') overview = param[1];
      if(param[0] === 'poster')   image += param[1];
      if(param[0] === 'voteAvg') voteAverage = param[1];
      if(param[0] === 'title' || param[0] === 'name') title = param[1];
      if(param[0] === 'release_date' || param[0] === 'first_air_date') release_date = param[1];
    }
    this.setState({
      overview: overview,
      image: image,
      voteAverage: voteAverage,
      title: title,
      release_date: release_date
    });
  }

  render() {
    return (
      <div data-aos="fade-left">
      <div className={classes.MovieDetails}>
        <div className={classes.MovieDescription}>
            <h1>{this.state.title}</h1>
            <h1 className={classes.MovieSummary}>{this.state.overview}</h1>
            <div className={classes.MovieMetaData}>
              <h2>IMDB Rating: {this.state.voteAverage}</h2>
              <h3>Release date: {this.state.release_date}</h3>
              <a className={classes.MovieButton} href="/">Watch now</a>
            </div>
        </div>
        <img className={classes.MovieImage} src={this.state.image} />
      </div>
      </div>
    )
  }
}

export default MovieDetail;