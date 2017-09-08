import React from 'react';
import { CitySelector } from './CitySelector'

class Navigation extends React.Component {

  render() {
    return (
      <nav className="db dt-l w-100 border-box pa3 shadow-4">
      <div className="db dtc-l v-mid w-5 tc tr">
          <p>asd</p>
      </div>
      <div className="db dtc-l v-mid w-15 w-15-l tc tr">
      <CitySelector />
      </div>
      </nav>
    )
  }
}
export default Navigation
