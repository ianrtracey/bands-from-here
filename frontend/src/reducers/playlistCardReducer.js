import { CHANGE_SELECT } from '../actions/const';

const initialState = {
  value: 'foobar',
  label: 'Foobar',
};

export function citySelectorReducer(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  // const nextState = Object.assign({}, state);

  switch (action.type) {
    case CHANGE_SELECT:
      return {
        ...state,
        value: action.parameter.value,
        label: action.parameter.label
      }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}

