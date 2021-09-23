import { createAction, handleActions } from 'redux-actions';
import { Record, fromJS } from 'immutable';
export const ADD_WALL_TEMP = 'add/WALL_TEMP';
export const RESET_WALL_TEMP = 'reset/WALL_TEMP';

export const addWallTemp = createAction(ADD_WALL_TEMP);
export const resetWallTemp = createAction(RESET_WALL_TEMP);

const initialState = {
    wallTemp:[],
};
const initialRecord = Record(initialState)();

export default handleActions({
    [ADD_WALL_TEMP]: (state, { payload }) => {
        const newList = state.get('wallTemp');
        return state.set('wallTemp', [...newList, payload]);
    },
    [RESET_WALL_TEMP]: (state) => {
        return state.set('wallTemp', []);
    },
}, initialRecord);