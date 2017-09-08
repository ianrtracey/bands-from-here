import {
    CHANGE_SELECT,
    VIEWPORT_CHANGE,
} from '../actions/const';

const initialState = {
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

const getPosition = (cities, selectedCityId) => {
    const city = cities.find((c) => c === selectedCityId)
    return {
        latitude: city.latitude,
        longitude: city.longitude,
    }

}

export function mapReducer(state = initialState, action) {
    switch(action.type) {
        case CHANGE_SELECT:
            console.log('asd', state)
            const cityPos = (state.cities.playlistCities, action.parameter.value)
            console.log('cityPos', cityPos)
            return {
                ...state,
            }
        
        case VIEWPORT_CHANGE:
            return {
                ...state,
                viewport: action.viewport,
            }

        default: {
            return state;
        }
    }
}