import React from "react";
import { withRouter } from "react-router-dom";
import { PropTypes } from "prop-types";

import { fetchPage } from "../../../functions/moviesAPI";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Movie from "../../../components/Movie/Movie";
import classes from "./MovieSection.module.css";

class MovieSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      firstMovie: 0,
      pageNumber: 1,
      loading: false,
      itemsPerPage: 8
    };
  }

  componentDidMount() {
    this.fetchNextSetOfMovies();
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  // Adjusting the pagination according to the screen width
  updateWindowDimensions = () => {
    const { itemsPerPage } = this.state;
    const width = window.innerWidth;
    if (width <= 449) {
      this.setState({ itemsPerPage: 3 });
    } else if ((width >= 450 && width < 625) || itemsPerPage < 4) {
      this.setState({ itemsPerPage: 4 });
    } else if ((width >= 625 && width < 1001) || itemsPerPage < 6) {
      this.setState({ itemsPerPage: 6 });
    } else if ((width >= 1001 && width < 1175) || itemsPerPage < 7) {
      this.setState({ itemsPerPage: 7 });
    } else if (width >= 1175 || itemsPerPage < 8) {
      this.setState({ itemsPerPage: 8 });
    }
  };

  fetchNextSetOfMovies = async () => {
    const { api } = this.props;
    const { pageNumber } = this.state;
    if (api) {
      this.setState({
        loading: true
      });
    }
    try {
      const nextPage = await fetchPage(api, "&page=", pageNumber);
      this.setState((prevState) => {
        return {
          ...prevState,
          movies: [...prevState.movies, ...nextPage],
          loading: false
        };
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  // "Pagination"
  nextPageClickHandler = () => {
    const { itemsPerPage, firstMovie, movies } = this.state;
    this.setState(
      (prevState) => ({
        firstMovie: Math.min(prevState.firstMovie + itemsPerPage, prevState.movies.length - itemsPerPage)
      }),
      () => {
        if (firstMovie + itemsPerPage >= movies.length - itemsPerPage) {
          this.setState(
            (prevState) => ({ pageNumber: prevState.pageNumber + 1 }),
            () => {
              this.fetchNextSetOfMovies();
            }
          );
        }
      }
    );
  };

  prevPageClickHandler = () => {
    const { itemsPerPage } = this.state;
    this.setState((prevState) => ({
      firstMovie: Math.max(prevState.firstMovie - itemsPerPage, 0)
    }));
  };

  // Passing the data for the given movie
  showDetailHandler = (id) => {
    const { history } = this.props;
    const { movies } = this.state;
    history.push({ pathname:"/movieDetails/" + id, state: movies});
  };

  render() {
    const { loading, firstMovie, itemsPerPage, movies } = this.state;
    const visibleMovies = movies.slice(firstMovie, firstMovie + itemsPerPage);
    const content = loading ? (
      <Spinner />
    ) : (
      visibleMovies.map((movie) => {
        const randomKeyNumber = Math.random();
        return <Movie key={`${movie.title}-${movie.id}-${randomKeyNumber}`} clicked={() => this.showDetailHandler(movie.id)} {...movie} />;
      })
    );

    return (
      <div className={classes.MovieSection}>
        <div className={classes.Movies}>{content}</div>
        <div className={classes.MovieButtons}>
          <Button clicked={this.prevPageClickHandler}>Previous page</Button>
          <Button clicked={this.nextPageClickHandler}>Next page</Button>
        </div>
      </div>
    );
  }
}

MovieSection.propTypes = {
  api: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(MovieSection);
