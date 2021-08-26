import { Record, fromJS } from 'immutable';

export const GET_SCHEDULE = 'get/SCHEDULE';
export const ADD_SCHEDULE = 'add/SCHEDULE';
export const LOAD_SCHEDULE = 'load/SCHEDULE';

export const getSchedule = () => ({
    type: GET_SCHEDULE,
});

export const addSchedule = (payload) => ({
    type: ADD_SCHEDULE,
    payload:payload
});

export const loadSchedule = (payload) => ({
    type: LOAD_SCHEDULE,
    payload:payload
});


const initialState = {
    schedules:[],
};
const initialRecord = Record(initialState)();

const wall = (state = initialRecord, {type, payload}) => {
    switch (type) {
        case ADD_SCHEDULE:
            const newList = state.get('schedules');
            newList.push(payload);
            return state.set('schedules', newList);
        case GET_SCHEDULE:
            return state.getIn(['schedules']);
        case LOAD_SCHEDULE:
            return state.set('schedules', payload);
        default:
            return state;
    }
};

export default wall;
