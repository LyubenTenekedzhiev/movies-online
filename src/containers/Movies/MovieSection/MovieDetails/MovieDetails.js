import React from 'react';

class MovieDetail extends React.Component {
  state = {
    overview: '',
    image: '',
    voteAverage: null,
  }

  componentDidMount() {
    const queryParams = new URLSearchParams(this.props.location.search);
    let overview = '';
    let image = "http://image.tmdb.org/t/p/w342";
    let voteAverage = null;
    for(let param of queryParams) {
    //['key', 'value']
      if(param[0] === 'overview') overview = param[1];
      if(param[0] === 'poster')   image += param[1];
      if(param[0] === 'voteAvg') voteAverage = param[1];
      voteAverage = Number(param[1]);
    }
    this.setState({
      overview: overview,
      image: image,
      voteAverage: voteAverage
    });
  }

  render() {
    return (
      <div>
        <h1>{this.state.overview}</h1>
        <img src={this.state.image} />
        <h2>{this.state.voteAverage}</h2>
      </div>
    )
  }
}

export default MovieDetail;