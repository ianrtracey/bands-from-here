/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import {
    FETCH_PLAYLISTS_SUCCESS,
} from '../actions/const';

const initialState = {
    playlistCities: []
};


export function cityReducer(state = initialState, action) {
    /* Keep the reducer clean - do not mutate the original state. */
    // const nextState = Object.assign({}, state);
    switch (action.type) {
        case FETCH_PLAYLISTS_SUCCESS:
            return {
                ...state,
                playlistCities: action.cities,
            }
        default: {
            /* Return original state if no actions were consumed. */
            return state;
        }
    }
}
