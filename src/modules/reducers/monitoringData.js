import { createAction, handleActions } from 'redux-actions';
import { Record, fromJS, Map } from 'immutable';

const SET_BATTERY = 'monitor/SET_BATTERY';

export const setBattery = createAction(SET_BATTERY);

const initialState = {
  battery: Map({
    voltage: 0,
    current: 0,
    percent: 0,
    chargeTime: 0,
    dischargeTime: 0,
    temperature: 0
  }),
};
const initialRecord = Record(initialState)();

export default handleActions({
  [SET_BATTERY]: (state, { payload }) => {
    return state.set('battery', fromJS(payload));
  },
}, initialRecord);