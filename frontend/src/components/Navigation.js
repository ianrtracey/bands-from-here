import React from 'react';

const navStyle = {
  "-webkit-box-shadow": "0px 0px 10px 5px rgba(0,0,0,0.25);",
  "-moz-box-shadow": "0px 0px 10px 5px rgba(0,0,0,0.25);",
  "box-shadow": "0px 0px 10px 5px rgba(0,0,0,0.25);",
}

class Navigation extends React.Component {

  render() {
    return (
      <nav className="db dt-l w-100 border-box pa3 ph5-l" style={navStyle}>
      <a className="db dtc-l v-mid mid-gray link dim w-100 w-25-l tc tl-l mb2 mb0-l" href="#" title="Home">
      <img src="http://tachyons.io/img/logo.jpg" className="dib w2 h2 br-100" alt="Site Name"/>
      </a>
      <div className="db dtc-l v-mid w-100 w-75-l tc tr-l">
      <a className="link dim dark-gray f6 f5-l dib mr3 mr4-l" href="#" title="Home">Home</a>
      <a className="link dim dark-gray f6 f5-l dib mr3 mr4-l" href="#" title="How it Works">How it Works</a>
      <a className="link dim dark-gray f6 f5-l dib mr3 mr4-l" href="#" title="Blog">Blog</a>
      <a className="link dim dark-gray f6 f5-l dib mr3 mr4-l" href="#" title="Press">Press</a>
      <a className="link dim dark-gray f6 f5-l dib" href="#" title="Contact">Contact</a>
      </div>
      </nav>
    )
  }
}
export default Navigation
