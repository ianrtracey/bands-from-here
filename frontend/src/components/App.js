import React from 'react';
import YeomanImage from './YeomanImage';
import './app.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { CitySelector } from './CitySelector';
import { PlaylistCard } from './PlaylistCard';

class AppComponent extends React.Component {

  render() {
    return (
      <div>
      <div className="mw9 center ph3-ns">
        <div className="cf ph2-ns">
          <div className="fl w-100 w-third-ns pa2">
          </div>
          <div className="fl w-100 w-third-ns pa2">
            <PlaylistCard />
            <CitySelector />
          </div>
          <div className="fl w-100 w-third-ns pa2">
          </div>
        </div>
      </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
