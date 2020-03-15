import React from "react";

import { fetchPage } from "functions/moviesAPI";
import { findValidMovies } from "functions/filterFuntion";
import { getMovieComponents } from "functions/getMovieComponents";

import classes from "./SearchMovies.module.css";
import { APIsSearchMovies } from "urlAPIs/urlAPIs";
import Searchbar from "components/UI/Searchbar/Searchbar";
import Button from "components/UI/Button/Button";
import Spinner from "components/UI/Spinner/Spinner";

class SearchMovies extends React.Component {
  state = {
    movies: [],
    url: APIsSearchMovies.urlMovies,
    loading: false,
    query: ""
  };

  // Fetching movies
  fetchMoviesHandler = async () => {
    const { url, query } = this.state;
    if (url) {
      this.setState({
        loading: true,
        movies: []
      });
      if (!query) {
        this.setState({
          loading: false,
          movies: []
        });
        return;
      }
    }
    try {
      const foundMovies = await fetchPage(url, "&query=", query);
      this.setState(prevState => {
        return {
          ...prevState,
          movies: [...prevState.movies, ...foundMovies],
          loading: false
        };
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  // Forming a search query
  buildSearchQueryHandler = event => {
    event.preventDefault();
    const query = event.target.value;
    this.setState(
      {
        query: query
      },
      () => {
        this.fetchMoviesHandler();
      }
    );
  };

  // ... for MOVIES
  searchMovieHandler = () => {
    this.setState({
      url: APIsSearchMovies.urlMovies
    });
  };
  // ... for SERIES
  searchSeriesHandler = () => {
    this.setState({
      url: APIsSearchMovies.urlSeries
    });
  };

  // finding details about the movie
  showDetailHandler = id => {
    this.props.history.push("/movieDetails/" + id, this.state.movies);
  };

  render() {
    const { loading, movies, query } = this.state;
    const foundMovies = movies.filter(findValidMovies);
    const content = loading ? <Spinner /> : foundMovies.map(getMovieComponents, this);

    return (
      <div className={classes.SearchMovies}>
        <Searchbar changed={event => this.buildSearchQueryHandler(event)} value={query} />
        <div className={classes.Buttons}>
          <Button clicked={this.searchMovieHandler}>Looking for movies?</Button>
          <Button clicked={this.searchSeriesHandler}>Or maybe series?</Button>
        </div>
        <div className={classes.Movies}>{content}</div>
      </div>
    );
  }
}

export default SearchMovies;
