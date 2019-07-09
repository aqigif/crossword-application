
import * as types from '../types';

export const getBox = value => ({
  type: types.getBox,
  payload: value
});

export const answer = value => ({
  type: types.EDIT_TODOS,
  payload: value
});
