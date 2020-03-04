import React from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';

import Movies from './containers/Movies/Movies';
import Movie from './containers/Movies/MovieSection/Movie/Movie';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Movies} exact />
        <Route path="/movie/:id" component={Movie} />
      </Switch>
    </div>
  );
}

export default App;
