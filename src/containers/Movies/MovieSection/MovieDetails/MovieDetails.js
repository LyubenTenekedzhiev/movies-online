import React from 'react';
import shaka from 'shaka-player';
import HLS from 'hls.js';

import classes from './MovieDetails.module.css';

class MovieDetail extends React.Component {
  state = {
    overview: '',
    image: '',
    voteAverage: null,
    title: '',
    release_date: null,
  }

  player = null;

  componentDidMount() {
    // Fetching data from the URL
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


    let config = {
      hls: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
      progressive: 'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/MI201109210084_mpeg-4_hd_high_1080p25_10mbits.mp4'
    }

    // Install built-in polyfills to patch browser incompatibilities.
    shaka.polyfill.installAll();
    // Check to see if the browser supports the basic APIs Shaka needs.
    if (shaka.Player.isBrowserSupported()) {
      // Everything looks good!
      this.initPlayer();
    } else {
      // This browser does not have the minimum set of APIs we need.
      console.error('Browser not supported!');
    }
 
    if (config.progressive !== '') {
      // Try to load a manifest/url.
      this.player.load(config.progressive).then(res =>  {
        // This runs if the asynchronous load is successful.
        console.log('The video has now been loaded! ' + config.progressive);
        // console.log(this.player.Eb)
        if(HLS.isSupported()) {
          let hls = new HLS();
          // binding them together
          console.log(this.player.Eb)
          hls.attachMedia(this.player.a);
          // MEDIA_ATTACHED event is fired by hls object once MediaSource is ready
          hls.on(HLS.Events.MEDIA_ATTACHED, function () {
            console.log("video and hls.js are now bound together !");
            hls.loadSource(config.hls);
            hls.on(HLS.Events.MANIFEST_PARSED, function (event, data) {
              console.log("manifest loaded, found " + data.levels.length + " quality level");
            });
 
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
    // Extract the shaka.util.Error object from the event.
    this.onError(event.detail);
  }

  onError(error) {
    // Log the error.
    console.error('Error code', error.code, 'object', error);
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

      <h2>Player</h2>
        <video ref="video"
          width="850"
          poster={this.state.image}
          controls>
        </video>
      </div>
    )
  }
}

export default MovieDetail;