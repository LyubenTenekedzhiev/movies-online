import React from 'react';
import './App.css';

import { Route, Switch, Redirect } from 'react-router-dom';
import asyncComponent from './hoc/asyncComponent';

import Movies from './containers/Movies/Movies';
import Navigation from './components/UI/Navigation/Navigation';
// import MovieDetails from './containers/Movies/MovieDetails/MovieDetails';
// import SearchMovies from './containers/SearchMovies/SearchMovies';

const AsyncMovieDetails = asyncComponent(() => {
  return import('./containers/Movies/MovieDetails/MovieDetails');
});

const AsyncSearchMovies = asyncComponent(() => {
  return import('./containers/SearchMovies/SearchMovies');
});

function App() {
  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route path="/" component={Movies} exact />
        <Route path="/movieDetails/:id" component={AsyncMovieDetails} />
        <Route path="/search" component={AsyncSearchMovies} />
        <Redirect from='/' to='/' />
      </Switch>
    </div>
  );
}

export default App;
