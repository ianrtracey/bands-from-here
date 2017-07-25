import React from 'react';
import YeomanImage from './YeomanImage';
import './app.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { CitySelector } from './CitySelector';

class AppComponent extends React.Component {

  render() {
    return (
      <div>
      <header className="tc pv4 pv5-ns">
      <img src="http://tachyons.io/img/logo.jpg" className="br3 ba b--black-10 h3 w3" alt="avatar"/>
      <h1 className="f5 f4-ns fw6 black-70 headline roboto">Bands From Here</h1>
      <h2 className="f6 black-70 fw2 ttu tracked">Celebrate local music, no matter where you are</h2>
      </header>
      <div className="mw9 center ph3-ns">
        <div className="cf ph2-ns">
          <div className="fl w-100 w-third-ns pa2">
          </div>
          <div className="fl w-100 w-third-ns pa2">
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
