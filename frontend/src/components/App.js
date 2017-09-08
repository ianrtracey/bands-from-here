import React from 'react';
import YeomanImage from './YeomanImage';
import './app.css';
// import Select from 'ract-select';
import 'react-select/dist/react-select.css';
// import { PlaylistCardContainer } from './PlaylistCardContainer'
import { SelectionBar } from './SelectionBar' 
import { Map } from './Map'
import Navigation from './Navigation';

class AppComponent extends React.Component {

  render() {
    return (
      <div>
      <div className="mw9 center ph3-ns">
        <Navigation />
      </div>
      <div className="mw9 center ph3-ns">
        <div className="fl w-50 pa2">
          <SelectionBar />
        </div>
        <div className="fl w-50 pa2">
          <Map />
        </div>
      </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
