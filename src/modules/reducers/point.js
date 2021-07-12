import {Record} from 'immutable';

export const GET_POINT = 'get/POINT';
export const SET_POINT = 'set/POINT';

export const addPoint = (payload) => ({
    type: SET_POINT,
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
    schedules:[],
};
const initialRecord = Record(initialState)();

const point = (state = initialRecord, {type, payload}) => {
    switch (type) {
        case SET_POINT:
            return state.getIn(['points']);
        case GET_POINT:
            return state.getIn(['points']);
        default:
            return state;
    }
};

export default point;
