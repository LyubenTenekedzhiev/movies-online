import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

// adding CSS
import classes from './MovieSection.module.css';

import Movie from './Movie/Movie';

class MovieSection extends React.Component {
  state = {
    movies: [],
    loading: false,
  }

  componentDidMount() {
    this.loadData()
  }

  loadData = () => {
    if (this.props.url) {
      this.setState({ 
          loading: true,
          movies: []
      })
    }
    axios.get(this.props.url)
          .then(response => {
            // console.log(response.data.results)
            const updatedMovies = [...this.state.movies];
            updatedMovies.concat(response.data.results);
            this.setState({
              movies: this.state.movies.concat(response.data.results),
              loading: false
            })
          }).catch(error => {
            console.log(error)
          }).finally( 
            this.setState({
              loading: false
            }))
  }


  render() {
    // console.log(this.state.movies);
    let content = (
      <div>Loading...</div> 
    )

    if(!this.state.loading) {
      content = (
        <>
          {this.state.movies.map(movie => (
            <NavLink to={'/movie/' + movie.id} key={movie.id}>
                  <Movie { ...movie } />
                  {this.props.children}
            </NavLink>
          ))}
        </>
      )
    }

    return (
        <div className={classes.Movies}>
          { content }
        </div>
    )
  }
}

export default MovieSection;