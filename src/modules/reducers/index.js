import { combineReducers } from 'redux';
import common from './common';
import point from './point';
import schedule from './schedule';
import wall from './wall';
import message from './message';

const rootReducer = combineReducers({
    common,
    point,
    schedule,
    wall,
    message,
});

export default rootReducer;