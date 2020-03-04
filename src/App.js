import React from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';

import Movies from './containers/Movies/Movies';
import Movie from './containers/Movies/MovieSection/Movie/Movie';
import MovieDetails from './containers/Movies/MovieSection/MovieDetails/MovieDetails';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Movies} exact />
        <Route path="/movieDetails" component={MovieDetails} />
      </Switch>
    </div>
  );
}

export default App;
