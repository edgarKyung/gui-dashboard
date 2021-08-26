import { combineReducers } from 'redux';
import common from './common';
import point from './point';
import schedule from './schedule';
import wall from './wall';

const rootReducer = combineReducers({
    common,
    point,
    schedule,
    wall,
});

export default rootReducer;