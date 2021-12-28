import { createAction, handleActions } from 'redux-actions';
import { Record } from 'immutable';

export const SET_IMAGE_LIST = 'SET_IMAGE_LIST';
export const SET_ACTIVE_INDEX = 'SET_ACTIVE_INDEX';

export const setImageList = createAction(SET_IMAGE_LIST);
export const setActiveIndex = createAction(SET_ACTIVE_INDEX);

const initialState = { 
  list: [],
  activeIndex: null,
};

const initialRecord = Record(initialState)();

export default handleActions({
  [SET_IMAGE_LIST]: (state, { payload }) => {
    return state.set('list', payload)
  },
  [SET_ACTIVE_INDEX]: (state, { payload }) => {
    return state.set('activeIndex', payload)
  },
}, initialRecord);