import { createAction, handleActions } from 'redux-actions';
import { Record, fromJS } from 'immutable';

export const ADD_VIRTUAL_WALL = 'add/VIRTUAL_WALL';
export const REMOVE_VIRTUAL_WALL = 'remove/VIRTUAL_WALL';
export const TOGGLE_DISABLE_VIRTUAL_WALL = 'toggle_disable/VIRTUAL_WALL';
export const RE_ORDER_VIRTUAL_WALL = 're_order/VIRTUAL_WALL';

export const addVirtualWall = createAction(ADD_VIRTUAL_WALL);
export const removeVirtualWall = createAction(REMOVE_VIRTUAL_WALL);
export const toggleDisableVirtualWall = createAction(TOGGLE_DISABLE_VIRTUAL_WALL);
export const reOrderVirtualWall = createAction(RE_ORDER_VIRTUAL_WALL);

const initialState = {
  virtualWall: [],
};
const initialRecord = Record(initialState)();

export default handleActions({
  [ADD_VIRTUAL_WALL]: (state, { payload }) => {
    const newList = state.get('virtualWall');
    return state.set('virtualWall', [...newList, payload]);
  },
  [REMOVE_VIRTUAL_WALL]: (state, { payload }) => {
    const newList = state.get('virtualWall');
    return state.set('virtualWall', newList.filter(data => data.id !== payload));
  },
  [RE_ORDER_VIRTUAL_WALL]: (state, { payload }) => {
    const { startIndex, endIndex } = payload;
    const newOrderList = state.get('virtualWall');
    console.log(newOrderList);
    const [removed] = newOrderList.splice(startIndex, 1);
    newOrderList.splice(endIndex, 0, removed);
    console.log(newOrderList);
    return state.set('virtualWall', newOrderList);
  },
  [TOGGLE_DISABLE_VIRTUAL_WALL]: (state, { payload }) => {
    const newList = state.get('virtualWall');
    return state.set('virtualWall', newList.map(data => {
      if (data.id === payload.id) {
        return {
          ...data,
          disabled: !data.disabled,
        }
      }
      return data;
    }));
  },
}, initialRecord);