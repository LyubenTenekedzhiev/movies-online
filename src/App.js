import React from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';

import Movies from './containers/Movies/Movies';
import Movie from './containers/Movies/MovieSection/Movie/Movie';
import MovieDetails from './containers/Movies/MovieSection/MovieDetails/MovieDetails';
import Navigation from './components/UI/Navigation/Navigation';
import SearchMovies from './containers/SearchMovies/SearchMovies';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route path="/" component={Movies} exact />
        <Route path="/movieDetails" component={MovieDetails} />
        <Route path="/search" component={SearchMovies} />
      </Switch>
    </div>
  );
}

export default App;
