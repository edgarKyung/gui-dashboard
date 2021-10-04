import { createAction, handleActions } from 'redux-actions';
import { Record, fromJS } from 'immutable';

const SET_BATTERY = 'monitor/SET_BATTERY';

export const setBattery = createAction(SET_BATTERY);

const initialState = {
    battery: 0,
};
const initialRecord = Record(initialState)();

export default handleActions({
  [SET_BATTERY]: (state, { payload }) => {
    console.log(payload);
    return state.set('battery', payload);
  },
}, initialRecord);
  