/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import { CHANGE_SELECT,
         FETCH_PLAYLISTS_SUCCESS,
} from '../actions/const';

const initialState = {
  options: [],
  value: 'foobar',
  label: 'Foobar',
};

export function citySelectorReducer(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  // const nextState = Object.assign({}, state);

  console.dir(action)
  switch (action.type) {
    case CHANGE_SELECT:
      return {
        ...state,
        value: action.parameter.value,
        label: action.parameter.label
      }
    case FETCH_PLAYLISTS_SUCCESS:
      return {
        ...state,
        options: action.cities,
      }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
