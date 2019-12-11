import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import webFont from 'webfontloader';

import Home from './Home';
import Manga from './Manga';
import Header from './Header';

import './App.css';
webFont.load({
  google: {
    families: ['Merriweather', 'serif']
  }
});

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route
            exact
            path="/manga/:id"
            render={props => <Manga {...props} />}
          />
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
