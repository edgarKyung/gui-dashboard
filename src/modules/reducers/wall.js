import { createAction, handleActions } from 'redux-actions';
import { Record, fromJS } from 'immutable';

export const GET_WALL = 'get/WALL';
export const ADD_WALL = 'add/WALL';
export const LOAD_WALL = 'load/WALL';

export const ADD_WALL_TEMP = 'add/WALL_TEMP';
export const RESET_WALL_TEMP = 'reset/WALL_TEMP';

export const getWall = createAction(GET_WALL);
export const addWall = createAction(ADD_WALL);
export const loadWall = createAction(LOAD_WALL);

export const addWallTemp = createAction(ADD_WALL_TEMP);
export const resetWallTemp = createAction(RESET_WALL_TEMP);

const initialState = {
    wall:[],
    wallTemp:[],
};
const initialRecord = Record(initialState)();

export default handleActions({
    [ADD_WALL]: (state, { payload }) => {
        const newList = state.get('wall');
        return state.set('wall', [...newList, payload.data]);
    },

    [ADD_WALL_TEMP]: (state, { payload }) => {
        const newList = state.get('wallTemp');
        return state.set('wallTemp', [...newList, payload]);
    },
    [RESET_WALL_TEMP]: (state) => {
        return state.set('wallTemp', []);
    },

    [GET_WALL]: (state, { payload }) => {
        return state.get(payload.type);
    },

    [LOAD_WALL]: (state, { payload: { excepts = [] } }) => {
        const messageBoxes = state.get('messageBoxes').filter(a => excepts.includes(a.id));
        return state.set('messageBoxes', messageBoxes);
    },
}, initialRecord);