import { CHANGE_SELECT,
         REQUEST_PLAYLISTS,
         FETCH_PLAYLISTS_SUCCESS,
} from './const';


export function changeSelection(parameter) {
  console.log(parameter);
  return { type: CHANGE_SELECT, parameter };
}

export function fetchPlaylistsSuccess(data) {
  return { type: FETCH_PLAYLISTS_SUCCESS, data: data }
}

export function fetchPlaylists() {
  dispatch =>
    fetch("http://google.com")
      .then((resp) => {
        console.log(result.body)
        dispatch(fetchPlaylistsSuccess(resp.body))
      })
}
