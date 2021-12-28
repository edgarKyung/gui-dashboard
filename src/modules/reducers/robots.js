import { createAction, handleActions } from 'redux-actions';
import { Record } from 'immutable';

export const SET_ROBOT_LIST = 'SET_ROBOT_LIST';

export const setRobotList = createAction(SET_ROBOT_LIST);

const initialState = { 
  robots: [],
};

const initialRecord = Record(initialState)();

export default handleActions({
  [SET_ROBOT_LIST]: (state, { payload }) => {
    return state.set('robots', payload)
  },
}, initialRecord);