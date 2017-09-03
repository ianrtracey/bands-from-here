import React from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import { connect } from 'react-redux';
const token = require('../../.mapbox_token.json').access_token

if (!token) {
    throw new Error('mapbox token is not valid');
}

class MapImpl extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            viewport: {
                latitude: 37.785164,
                longitude: -122.41669,
                zoom: 8,
                bearing: 0,
                pitch: 0,
                width: window.innerWidth,
                height: window.innerHeight
            }
        }
    }


    render() {
        const {viewport} = this.state;

        return (
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={token}
                onViewportChange={v => this.setState({viewport: v})}
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

const mapStateToProps = (state) => ({
    markers: state.cities.playlistCities
})

export const Map = connect(mapStateToProps)(MapImpl)