import { createAction, handleActions } from 'redux-actions';
import { Record, fromJS } from 'immutable';

export const GET_SCHEDULE = 'get/SCHEDULE';
export const ADD_SCHEDULE = 'add/SCHEDULE';
export const REMOVE_SCHEDULE = 'remove/SCHEDULE';
export const SHIFT_SCHEDULE = 'shift/SCHEDULE';
export const LOAD_SCHEDULE = 'load/SCHEDULE';

export const getSchedule = () => ({
  type: GET_SCHEDULE,
});

export const addSchedule = (payload) => ({
  type: ADD_SCHEDULE,
  payload: payload
});

export const removeSchedule = (payload) => ({
  type: REMOVE_SCHEDULE,
  payload: payload
});

export const shiftSchedule = (payload) => ({
  type: SHIFT_SCHEDULE,
  payload: payload
});

export const loadSchedule = (payload) => ({
  type: LOAD_SCHEDULE,
  payload: payload
});


const initialState = {
  schedules: [],
};
const initialRecord = Record(initialState)();

const wall = (state = initialRecord, { type, payload }) => {
  const newList = state.get('schedules');
  switch (type) {
    case ADD_SCHEDULE:
      newList.push(payload);
      return state.set('schedules', newList);
    case SHIFT_SCHEDULE:
      newList.shift();
      return state.set('schedules', newList);
    case REMOVE_SCHEDULE:
      return state.set('schedules', newList.filter((list) => list.id !== payload.id));
    case GET_SCHEDULE:
      return state.getIn(['schedules']);
    case LOAD_SCHEDULE:
      return state.set('schedules', payload);
    default:
      return state;
  }
};

export default wall;
