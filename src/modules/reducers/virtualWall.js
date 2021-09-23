import { createAction, handleActions } from 'redux-actions';
import { Record, fromJS } from 'immutable';

export const ADD_VIRTUAL_WALL = 'add/VIRTUAL_WALL';

export const addVirtualWall = createAction(ADD_VIRTUAL_WALL);

const initialState = {
    virtualWall:[],
};
const initialRecord = Record(initialState)();

export default handleActions({
    [ADD_VIRTUAL_WALL]: (state, { payload }) => {
        const newList = state.get('virtualWall');
        return state.set('virtualWall', [...newList, payload]);
    },
}, initialRecord);