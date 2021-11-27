import { createAction, handleActions } from 'redux-actions';
import { Record, Map } from 'immutable';

const INCREMENT_SPINNER = 'INCREMENT/SPINNER';
const DECREMENT_SPINNER = 'DECREMENT/SPINNER';
const DECREMENT_SPINNER_FORCE = 'DECREMENT/SPINNER_FORCE';

const SET_LOAD_CANVAS = 'SET/LOAD_CANVAS';
const SET_NEED_RELOAD = 'SET/NEED_RELOAD';

const SET_BATTERY_POPUP = 'SET/BATTERY_POPUP';

export const incrementSpinner = createAction(INCREMENT_SPINNER);
export const decrementSpinner = createAction(DECREMENT_SPINNER);
export const decrementSpinnerForce = createAction(DECREMENT_SPINNER_FORCE);

export const setLoadCanvas = createAction(SET_LOAD_CANVAS);
export const setNeedReload = createAction(SET_NEED_RELOAD);

export const setBatteryPopup = createAction(SET_BATTERY_POPUP);

const initialState = {
  spinner: Map({
    visibleCount: 0
  }),
  loadCanvas: false,
  isNeedReload: false,
  ui: {
    batteryPopup: false
  }
};
const initialRecord = Record(initialState)();

export default handleActions({
  [INCREMENT_SPINNER]: state => state.updateIn(['spinner', 'visibleCount'], count => count + 1),
  [DECREMENT_SPINNER]: state => state.updateIn(['spinner', 'visibleCount'], count => count - 1),
  [DECREMENT_SPINNER_FORCE]: state => state.updateIn(['spinner', 'visibleCount'], 0),
  [SET_LOAD_CANVAS]: (state, { payload }) => state.set('loadCanvas', payload),
  [SET_NEED_RELOAD]: (state, { payload }) => state.set('isNeedReload', payload),
  [SET_BATTERY_POPUP]: (state, { payload }) => state.setIn(['ui', 'batteryPopup'], payload),
}, initialRecord);