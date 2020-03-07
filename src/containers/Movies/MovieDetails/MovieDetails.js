import React from 'react';
import shaka from 'shaka-player';
import HLS from 'hls.js';

import classes from './MovieDetails.module.css';
import style from '../../../components/UI/Button/Button.module.css'
import {NavLink} from 'react-router-dom';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';
import Button from '../../../components/UI/Button/Button';

class MovieDetail extends React.Component {
  state = {
    overview: '',
    poster: "http://image.tmdb.org/t/p/w342",
    voteAverage: null,
    title: '',
    release_date: null,
    show: false,
  }

  player = null;

  componentDidMount() {
    for(let movie of this.props.location.state) {
      if(movie.id === Number(this.props.match.params.id)) {
        this.setState({
          title: movie.title || movie.name,
          overview: movie.overview,
          poster: this.state.poster + movie.poster_path || this.state.poster + movie.backdrop_path,
          voteAverage: movie.vote_average,
          release_date: movie.release_date || movie.first_air_date,
        })
      }
    }

    // Fetching data from the URL
    // const queryParams = new URLSearchParams(this.props.location.search);
    // let overview = '';
    // let image = "http://image.tmdb.org/t/p/w342";
    // let voteAverage = null;
    // let title = '';
    // let release_date = null;
    // for(let param of queryParams) {
    // //['key', 'value']
    //   if(param[0] === 'overview') overview = param[1];
    //   if(param[0] === 'poster')   image += param[1];
    //   if(param[0] === 'voteAvg') voteAverage = param[1];
    //   if(param[0] === 'title' || param[0] === 'name') title = param[1];
    //   if(param[0] === 'release_date' || param[0] === 'first_air_date') release_date = param[1];
    // }
    // this.setState({
    //   overview: overview,
    //   image: image,
    //   voteAverage: voteAverage,
    //   title: title,
    //   release_date: release_date
    // });


    let config = {
      hls: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
      progressive: 'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/MI201109210084_mpeg-4_hd_high_1080p25_10mbits.mp4'
    }

    // Install built-in polyfills to patch browser incompatibilities.
    shaka.polyfill.installAll();
    if (shaka.Player.isBrowserSupported()) {
      this.initPlayer();
    } else {
      console.error('Browser not supported!');
    }
 
    if (config.progressive !== '') {
      this.player.load(config.progressive).then(res =>  {
        console.log('The video has now been loaded! ' + config.progressive);
        if(HLS.isSupported()) {
          let hls = new HLS();
          hls.attachMedia(this.player.a);
          hls.on(HLS.Events.MEDIA_ATTACHED, function () {
            // console.log("video and hls.js are now bound together !");
            hls.loadSource(config.hls);
          });
        }
      }).catch(this.onError);  // onError is executed if the asynchronous load fails.
    }
  }

 initPlayer() {
    this.player = new shaka.Player(this.refs.video);
    // Listen for error events.
    this.player.addEventListener('error', this.onErrorEvent);
  }

  onErrorEvent(event) {
    this.onError(event.detail);
  }

  // Log the error.
  onError(error) {
    console.error('Error code', error.code, 'object', error);
  }

  showVideoHandler = () => {
    this.setState({
      show: !this.state.show
    })
  }

  render() {
    let backdrop = null;
    let video = (
        <div className={classes.MovieVideoHide}>
          <video ref="video"
            width="1350"
            controls>
          </video>
        </div>
      )

    if(this.state.show) {
      backdrop = <Backdrop show={this.state.show} clicked={this.showVideoHandler} />
      video = (
        <div className={classes.MovieVideo}>
          <video ref="video"
            width="1350"
            controls>
          </video>
        </div>
      );
    } 

    return (
      <div data-aos="fade-left">
      <div className={classes.MovieDetails}>
        <div className={classes.MovieDescription}>
            <h1>{this.state.title}</h1>
            <h1 className={classes.MovieSummary}>{this.state.overview}</h1>

            <div className={classes.MovieMetaData}>
              <NavLink to="/" className={style.Button}>Home</NavLink>
              <h2>IMDB Rating: {this.state.voteAverage}</h2>
              <h3>Release date: {this.state.release_date}</h3>
              <Button clicked={this.showVideoHandler}>Watch now</Button>
            </div>
        </div>
        <img className={classes.MovieImage} src={this.state.poster} alt={this.state.title} />
      </div>

        {backdrop}
        {video}
      </div>
    )
  }
}

export default MovieDetail;