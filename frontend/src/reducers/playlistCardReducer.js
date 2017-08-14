import { CHANGE_SELECT } from '../actions/const';

const initialState = {
  isFlipped: false,
  lastPlaylist: { value: '', label: ''},
  currentPlaylist: { value: '', label: '' },
};

const getFrontBackCardNewState = function(state, action) {
  // we want to render the backside
  // const nextState = Object.assign({}, state);
  console.log('playlistCardRedcuer', state, action)
  return {
    lastPlaylist: state.currentPlaylist,
    currentPlaylist: action.parameter,
    isFlipped: !state.isFlipped,
  }
}

export function playlistCardReducer(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  switch (action.type) {
    case CHANGE_SELECT:
      return {
        ...state,
        ...getFrontBackCardNewState(state, action),
      }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}

