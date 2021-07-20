import { combineReducers } from 'redux';
import common from './common';
import point from './point';

const rootReducer = combineReducers({
    common,
    point,
});

export default rootReducer;