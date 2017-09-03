import {
    REQUEST_PLAYLISTS,
    FETCH_PLAYLISTS_SUCCESS,
} from './const';

import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

const fetchCityData = () => (fetch('http://localhost:8080/api/data'))


function fetchCityDataSuccess(data) {
    return {
        type: FETCH_PLAYLISTS_SUCCESS,
        cities: data,
    }
}

export function getCityData() {
    return (dispatch) => {
        return fetchCityData().then(
            (data) => {
                return data.json().then((json) => {
                    dispatch(fetchCityDataSuccess(json.results))
                })
            },
            error => dispatch(fetchCityDataFailed(error)),
        )
    }
}
