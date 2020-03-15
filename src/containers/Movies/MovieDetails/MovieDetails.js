import React from "react";
import shaka from "shaka-player";
import HLS from "hls.js";
import { NavLink } from "react-router-dom";

import classes from "./MovieDetails.module.css";
import style from "components/UI/Button/Button.module.css";
import Backdrop from "components/UI/Backdrop/Backdrop";
import Button from "components/UI/Button/Button";

class MovieDetail extends React.Component {
  state = {
    overview: "",
    poster: "http://image.tmdb.org/t/p/w342",
    voteAverage: null,
    title: "",
    release_date: null,
    show: false
  };

  player = null;

  componentDidMount() {
    // Checking if the state is not iterable
    if (!this.props.location.state) {
      this.props.history.goBack();
    }
    // Fetching state from the previous location
    for (let movie of this.props.location.state) {
      if (movie.id === Number(this.props.match.params.id)) {
        this.setState({
          title: movie.title || movie.name,
          overview: movie.overview,
          poster: this.state.poster + movie.poster_path || this.state.poster + movie.backdrop_path,
          voteAverage: movie.vote_average,
          release_date: movie.release_date || movie.first_air_date
        });
      }
    }

    // Install built-in polyfills to patch browser incompatibilities.
    shaka.polyfill.installAll();
    if (shaka.Player.isBrowserSupported()) {
      this.initPlayer();
    } else {
      console.error("Browser not supported!");
    }

    const config = {
      hls: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
      progressive: "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/MI201109210084_mpeg-4_hd_high_1080p25_10mbits.mp4"
    };
    if (config.progressive !== "") {
      this.player
        .load(config.progressive)
        .then(() => {
          if (HLS.isSupported()) {
            let hls = new HLS();
            hls.attachMedia(this.player.a);
            hls.on(HLS.Events.MEDIA_ATTACHED, function() {
              hls.loadSource(config.hls);
            });
          }
        })
        .catch(this.onError);
    }
  }

  initPlayer() {
    this.player = new shaka.Player(this.refs.video);
    this.player.addEventListener("error", this.onErrorEvent);
  }

  onErrorEvent(event) {
    this.onError(event.detail);
  }

  onError(error) {
    console.error("Error code", error.code, "object", error);
  }

  showVideoHandler = () => {
    this.setState({
      show: !this.state.show
    });
  };

  render() {
    const { show, title, overview, voteAverage, release_date, poster } = this.state;
    let backdrop = null;
    let video = (
      <div className={classes.MovieVideoHide}>
        <video ref='video' controls></video>
      </div>
    );

    if (show) {
      backdrop = <Backdrop show={show} clicked={this.showVideoHandler} />;
      video = (
        <div className={classes.MovieVideo}>
          <video ref='video' className={classes.VideoFrame} controls></video>
        </div>
      );
    }

    return (
      <div data-aos='fade-left'>
        <div className={classes.MovieDetails}>
          <div className={classes.MovieDescription}>
            <h1>{title}</h1>
            <h1 className={classes.MovieSummary}>{overview}</h1>

            <div className={classes.MovieMetaData}>
              <NavLink to='/' className={style.Button}>
                Home
              </NavLink>
              <h2>IMDB Rating: {voteAverage}</h2>
              <h3>Release date: {release_date}</h3>
              <Button clicked={this.showVideoHandler}>Watch now</Button>
            </div>
          </div>
          <img className={classes.MovieImage} src={poster} alt={title} />
        </div>
        {backdrop}
        {video}
      </div>
    );
  }
}

export default MovieDetail;
