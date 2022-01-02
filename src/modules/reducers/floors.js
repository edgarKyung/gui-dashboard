import { createAction, handleActions } from 'redux-actions';
import { Record } from 'immutable';

export const SET_FLOOR_LIST = 'SET_FLOOR_LIST';
export const SET_ACTIVE_FLOOR = 'SET_ACTIVE_FLOOR';

export const setFloorList = createAction(SET_FLOOR_LIST);
export const setActiveFloor = createAction(SET_ACTIVE_FLOOR);

const initialState = { 
  floors: [],
  activeFloor: null,
};

const initialRecord = Record(initialState)();

export default handleActions({
  [SET_FLOOR_LIST]: (state, { payload }) => {
    return state.set('floors', payload)
  },
  [SET_ACTIVE_FLOOR]: (state, { payload }) => {
    return state.set('activeFloor', payload)
  },
}, initialRecord);