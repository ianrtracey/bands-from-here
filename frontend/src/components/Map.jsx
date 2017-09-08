import React from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import { connect } from 'react-redux';
const token = require('../../.mapbox_token.json').access_token
import { viewportChange } from '../actions/mapActions'

if (!token) {
    throw new Error('mapbox token is not valid');
}

class MapImpl extends React.Component {

    render() {

        return (
            <ReactMapGL
                {...this.props.viewport}
                mapboxApiAccessToken={token}
                onViewportChange={this.props.onViewportChange}
            >
            {this.props.markers.map((marker) => (
                <Marker latitude={marker.latitude} longitude={marker.longitude} offsetLeft={-20} offsetTop={-10}>
                    <div>*</div>
                </Marker>
            ))}
            </ReactMapGL>
        );
    }
}

const getPosition = (cities, selectedCityId) => {
    cities.find((city) => city.id == selectedCityId)
}

const onViewportChange = (viewport) => {

}

const mapStateToProps = (state) => ({
    markers: state.cities.playlistCities,
    viewport: state.mapState.viewport,
    onViewportChange: onViewportChange, 
})

const mapDispatchToProps = (dispatch) => {
  return {
    onViewportChange: viewport => {
      dispatch(viewportChange(viewport))
    }
  }
}

export const Map = connect(mapStateToProps, mapDispatchToProps)(MapImpl)