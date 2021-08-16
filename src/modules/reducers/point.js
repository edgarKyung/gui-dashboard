import { Record, fromJS } from 'immutable';

export const GET_POINT = 'get/POINT';
export const ADD_POINT = 'add/POINT';

export const addPoint = (payload) => ({
    type: ADD_POINT,
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
        default:
            return state;
    }
};

export default point;
