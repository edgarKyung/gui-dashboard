import { Record, fromJS } from 'immutable';

export const GET_POINT = 'get/POINT';
export const ADD_POINT = 'add/POINT';
export const REMOVE_POINT = 'remove/POINT';
export const EDIT_POINT = 'edit/POINT';

export const addPoint = (payload) => ({
    type: ADD_POINT,
    payload:payload
});

export const removePoint = (payload) => ({
    type: REMOVE_POINT,
    payload:payload
});

export const editPoint = (payload) => ({
    type: EDIT_POINT,
    payload:payload
});

export const getPoint = () => ({
    type: GET_POINT,
});
/*
    id:0,
    position:{x:0,y:0},
*/

const initialState = {
    points:[],
    editPoint:{},
    schedules:[],
};
const initialRecord = Record(initialState)();

const point = (state = initialRecord, {type, payload}) => {
    switch (type) {
        case ADD_POINT:
            const newList = state.get('points');
            newList.push(payload);
            return state.set('points', newList);
        case GET_POINT:
            return state.getIn(['points']);
        case REMOVE_POINT:
            return state.set('points', state.get('points').filter(point => point.id !== payload));
        case EDIT_POINT:
            return state.set('points', state.get('points').map(point => point.id === payload.id ? Object.assign(point, payload) : point));
        default:
            return state;
    }
};

export default point;
