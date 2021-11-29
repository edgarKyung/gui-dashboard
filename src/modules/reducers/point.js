import { Record, fromJS } from 'immutable';

export const GET_POINT = 'GET/POINT';
export const ADD_POINT = 'ADD/POINT';
export const LOAD_POINT = 'LOAD/POINT';
export const REMOVE_POINT = 'REMOVE/POINT';
export const EDIT_POINT = 'EDIT/POINT';
export const RE_ORDER_POINT = 'RE_ORDER/POINT';
export const TOGGLE_DISABLE_POINT = 'TOGGLE_DISABLE/POINT';

export const getPoint = () => ({
  type: GET_POINT,
});

export const addPoint = (payload) => ({
  type: ADD_POINT,
  payload: payload
});

export const loadPoint = (payload) => ({
  type: LOAD_POINT,
  payload: payload
});

export const removePoint = (payload) => ({
  type: REMOVE_POINT,
  payload: payload
});

export const editPoint = (payload) => ({
  type: EDIT_POINT,
  payload: payload
});

export const reOrderPoint = (payload) => ({
  type: RE_ORDER_POINT,
  payload: payload
});

export const toggleDisablePoint = (payload) => ({
  type: TOGGLE_DISABLE_POINT,
  payload: payload
});

const initialState = {
  points: [],
};
const initialRecord = Record(initialState)();

const point = (state = initialRecord, { type, payload }) => {
  switch (type) {
    case ADD_POINT:
      const newList = state.get('points');
      newList.push(payload);
      return state.set('points', newList);
    case GET_POINT:
      return state.getIn(['points']);
    case LOAD_POINT:
      return state.set('points', payload);
    case REMOVE_POINT:
      return state.set('points', state.get('points').filter(point => point.id !== payload));
    case EDIT_POINT:
      return state.set('points', state.get('points').map(point => point.id === payload.id ? Object.assign(point, payload) : point));
    case RE_ORDER_POINT:
      const { startIndex, endIndex } = payload;
      const newOrderList = state.get('points');
      const [removed] = newOrderList.splice(startIndex, 1);
      newOrderList.splice(endIndex, 0, removed);

      return state.set('points', newOrderList);
    case TOGGLE_DISABLE_POINT:
      return state.set('points', state.get('points').map(point => {
        if (point.id === payload.id) {
          return {
            ...point,
            disabled: !point.disabled,
          }
        }
        return point;
      }));
    default:
      return state;
  }
};

export default point;
