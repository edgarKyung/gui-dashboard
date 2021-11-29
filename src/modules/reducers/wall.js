import { createAction, handleActions } from 'redux-actions';
import { Record, fromJS } from 'immutable';

export const GET_WALL = 'get/WALL';
export const ADD_WALL = 'add/WALL';
export const LOAD_WALL = 'load/WALL';
export const RESET_WALL = 'reset/WALL';

export const getWall = createAction(GET_WALL);
export const addWall = createAction(ADD_WALL);
export const loadWall = createAction(LOAD_WALL);
export const resetWall = createAction(RESET_WALL);

const initialState = {
  wall: [],
};
const initialRecord = Record(initialState)();

export default handleActions({
  [ADD_WALL]: (state, { payload }) => {
    const newList = state.get('wall');
    return state.set('wall', [...newList, payload.data]);
  },

  [GET_WALL]: (state, { payload }) => {
    return state.get(payload.type);
  },

  [LOAD_WALL]: (state, { payload: { excepts = [] } }) => {
    const messageBoxes = state.get('messageBoxes').filter(a => excepts.includes(a.id));
    return state.set('messageBoxes', messageBoxes);
  },

  [RESET_WALL]: (state, { payload }) => {
    return state.set('wall', []);
  },
}, initialRecord);