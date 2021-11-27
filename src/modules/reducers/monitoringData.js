import { createAction, handleActions } from 'redux-actions';
import { Record, fromJS, Map } from 'immutable';

const SET_BATTERY = 'monitor/SET_BATTERY';
const SET_STATUS = 'monitor/SET_STATUS';

export const setBattery = createAction(SET_BATTERY);
export const setStatus = createAction(SET_STATUS);

const initialState = {
  battery: Map({
    voltage: 0,
    current: 0,
    percent: 0,
    chargeTime: 0,
    dischargeTime: 0,
    temperature: 0
  }),
  status: Map({
    state: '',
    mode: '',
    status: '로딩중',
  }),
};
const initialRecord = Record(initialState)();

export default handleActions({
  [SET_BATTERY]: (state, { payload }) => {
    return state.set('battery', fromJS(payload));
  },
  [SET_STATUS]: (state, { payload }) => {
    return state.setIn(['status', 'state'], payload.state)
      .setIn(['status', 'mode'], payload.mode)
      .setIn(['status', 'status'], payload.status || '로딩중')
  },
}, initialRecord);