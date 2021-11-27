import { createAction, handleActions } from 'redux-actions';
import { Record, Map } from 'immutable';

const INCREMENT_SPINNER = 'INCREMENT/SPINNER';
const DECREMENT_SPINNER = 'DECREMENT/SPINNER';
const DECREMENT_SPINNER_FORCE = 'DECREMENT/SPINNER_FORCE';

const SET_LOAD_CANVAS = 'SET/LOAD_CANVAS';
const SET_NEED_RELOAD = 'SET/NEED_RELOAD';

export const incrementSpinner = createAction(INCREMENT_SPINNER);
export const decrementSpinner = createAction(DECREMENT_SPINNER);
export const decrementSpinnerForce = createAction(DECREMENT_SPINNER_FORCE);

export const setLoadCanvas = createAction(SET_LOAD_CANVAS);
export const setNeedReload = createAction(SET_NEED_RELOAD);

const initialState = {
    spinner:Map({
        visibleCount:0
    }),
    loadCanvas:false,
    isNeedReload:false,
};
const initialRecord = Record(initialState)();

export default handleActions({
    [INCREMENT_SPINNER]: state => state.updateIn(['spinner', 'visibleCount'], count => count + 1),
    [DECREMENT_SPINNER]: state => state.updateIn(['spinner', 'visibleCount'], count => count - 1),
    [DECREMENT_SPINNER_FORCE]: state => state.updateIn(['spinner', 'visibleCount'], 0),
    [SET_LOAD_CANVAS]: (state, {payload})  => state.set('loadCanvas', payload),
    [SET_NEED_RELOAD]: (state, {payload})  => state.set('isNeedReload', payload),
}, initialRecord);