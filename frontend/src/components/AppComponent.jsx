import React from 'react';
import YeomanImage from './YeomanImage';
import './app.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { CitySelector } from './CitySelector';
import { PlaylistCardContainer } from './PlaylistCardContainer'
import Navigation from './Navigation';
import { Switch, Route } from 'react-router-dom'
import { ResultGrid } from './ResultGrid';
import { PlaylistPage } from './PlaylistPage';

class AppComponent extends React.Component {

  render() {
    return (
      <main>
        <Navigation />
        <div className="mv5 mh7">
          <CitySelector />
        </div>
        <Switch>
          <Route exact path="/" component={ResultGrid} />
          <Route exact path="/playlist" component={PlaylistPage} />
        </Switch>
      </main>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
