import { Record, fromJS } from 'immutable';

export const GET_WALL = 'get/WALL';
export const ADD_WALL = 'add/WALL';
export const LOAD_WALL = 'load/WALL';

export const getWall = () => ({
    type: GET_WALL,
});

export const addWall = (payload) => ({
    type: ADD_WALL,
    payload:payload
});

export const loadWall = (payload) => ({
    type: LOAD_WALL,
    payload:payload
});

const initialState = {
    walls:[],
};
const initialRecord = Record(initialState)();

const wall = (state = initialRecord, {type, payload}) => {
    switch (type) {
        case ADD_WALL:
            const newList = state.get('walls');
            newList.push(payload);
            return state.set('walls', newList);
        case GET_WALL:
            return state.getIn(['walls']);
        case LOAD_WALL:
            return state.set('walls', payload);
        default:
            return state;
    }
};

export default wall;
