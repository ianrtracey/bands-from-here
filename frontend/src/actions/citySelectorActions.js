import { CHANGE_SELECT } from './const';

export function changeSelection(parameter) {
  console.log(parameter);
  return { type: CHANGE_SELECT, parameter };
}

