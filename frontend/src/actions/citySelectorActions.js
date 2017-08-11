import { CHANGE_SELECT,
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


export function changeSelection(parameter) {
  console.log(parameter);
  return { type: CHANGE_SELECT, parameter };
}

function fetchPlaylists() {
  return fetch('http://localhost:8080/api/data')
}

function getPlaylistsSuccess(data) {
  return {
    type: FETCH_PLAYLISTS_SUCCESS,
    cities: data,
  }
}

export function getPlaylists() {
  console.log('get playlists called')
  return (dispatch) => {
    return fetchPlaylists().then(
      (data) => {
        return data.json().then((json) => {
          dispatch(getPlaylistsSuccess(json.results))
        })
      },
      error => dispatch(getPlaylistsFailed(error)),
    )
  }
}
