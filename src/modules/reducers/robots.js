import { createAction, handleActions } from 'redux-actions';
import { Record } from 'immutable';

export const SET_ROBOT_LIST = 'SET_ROBOT_LIST';
export const SET_ROBOT_ACTIVE_INDEX = 'SET_ROBOT_ACTIVE_INDEX';

export const setRobotList = createAction(SET_ROBOT_LIST);
export const setRobotActiveIndex = createAction(SET_ROBOT_ACTIVE_INDEX);

const initialState = { 
  robots: [],
  activeIndex: null,
};

const initialRecord = Record(initialState)();

export default handleActions({
  [SET_ROBOT_LIST]: (state, { payload }) => {
    return state.set('robots', payload)
  },
  [SET_ROBOT_ACTIVE_INDEX]: (state, { payload }) => {
    return state.set('activeIndex', payload)
  },
}, initialRecord);