import React from "react";
import shaka from "shaka-player";
import HLS from "hls.js";
import { NavLink } from "react-router-dom";
import { PropTypes } from "prop-types";

import style from "../../../components/UI/Button/Button.module.css";
import classes from "./MovieDetails.module.css";

import Button from "../../../components/UI/Button/Button";
import Backdrop from "../../../components/UI/Backdrop/Backdrop";
import img from "../../../assets/no_image_available.jpeg";

class MovieDetail extends React.Component {
  player = null;

  constructor(props) {
    super(props);
    this.state = {
      overview: "",
      poster: "http://image.tmdb.org/t/p/w342",
      voteAverage: null,
      title: "",
      release_date: null,
      show: false
    };
  }

  componentDidMount() {
    const { location, history, match } = this.props;
    const { poster } = this.state;
    // Checking if the state is not iterable
    if (!location.state) {
      history.goBack();
    }
    // Fetching state from the previous location
    for (const movie of location.state) {
      if (movie.id === Number(match.params.id)) {
        this.setState({
          title: movie.title || movie.name,
          overview: movie.overview,
          poster: poster + movie.poster_path || poster + movie.backdrop_path,
          voteAverage: movie.vote_average,
          release_date: movie.release_date || movie.first_air_date
        });
      }
    }

    // Install built-in polyfills to patch browser incompatibilities.
    shaka.polyfill.installAll();
    if (shaka.Player.isBrowserSupported()) {
      this.initPlayer();
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
            const hls = new HLS();
            hls.attachMedia(this.player.a);
            hls.on(HLS.Events.MEDIA_ATTACHED, () => {
              hls.loadSource(config.hls);
            });
          }
        })
        .catch(this.onError);
    }
  }

  onErrorEvent = (event) => {
    this.onError(event.detail);
  };

  onError = (error) => {
    console.error("Error code", error.code, "object", error);
  };

  showVideoHandler = () => {
    this.setState((prevState) => {
      return {
        show: !prevState.show
      };
    });
  };

  initPlayer() {
    this.player = new shaka.Player(this.refs.video);
    this.player.addEventListener("error", this.onErrorEvent);
  }

  render() {
    const { show, title, overview, voteAverage, release_date, poster } = this.state;
    const image = poster.slice(-4, poster.length) !== "null" ? poster : img;
    const backdrop = show ? <Backdrop show={show} clicked={this.showVideoHandler} /> : null;
    const video = show ? (
      <div className={classes.MovieVideo}>
        <video ref="video" className={classes.VideoFrame} controls />
      </div>
    ) : (
      <div className={classes.MovieVideoHide}>
        <video ref="video" controls />
      </div>
    );

    return (
      <div data-aos="fade-left">
        <div className={classes.MovieDetails}>
          <div className={classes.MovieDescription}>
            <h1>{title}</h1>
            <h1 className={classes.MovieSummary}>{overview}</h1>

            <div className={classes.MovieMetaData}>
              <NavLink to="/" className={style.Button}>
                Home
              </NavLink>
              <h2>IMDB Rating: {voteAverage}</h2>
              <h3>Release date: {release_date}</h3>
              <Button clicked={this.showVideoHandler}>Watch now</Button>
            </div>
          </div>
          <img className={classes.MovieImage} src={image} alt={title} />
        </div>
        {backdrop}
        {video}
      </div>
    );
  }
}

MovieDetail.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default MovieDetail;
