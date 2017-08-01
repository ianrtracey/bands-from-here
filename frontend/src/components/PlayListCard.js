import React from 'react';
import { connect } from 'react-redux';

class PlaylistCardImpl extends React.Component {

  render() {
    return (
      <div>
<article className="br2 ba dark-gray b--black-10 mv4 w-100  mw9 center">
  <img src="https://farm8.staticflickr.com/7361/9259021382_486a9c8609_b.jpg" className="db w-100 br2 br--top" alt="Photo of a kitten looking menacing."/>
  <div className="pa2 ph3-ns pb3-ns">
    <div className="dt w-100 mt1">
      <div className="dtc">
        <h1 className="f7 f5-ns mv0">Bands from</h1>
        <h1 className="f2 f3-ns mv0">{ this.props.selectedCity }</h1>
      </div>
    </div>
    <p className="f6 lh-copy measure mt2 mid-gray">
      56 Artists
    <a className="f7 grow no-underline br-pill ph3 pv2 mb2 dib white bg-black fr" style={{"background-color":"#1DB954"}} href="#0">Open in Spotify</a>

    </p>
  </div>
</article>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedCity: state.citySelection.label,
  }
}

export const PlaylistCard = connect(
                      mapStateToProps
)(PlaylistCardImpl)


