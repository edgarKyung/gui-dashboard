import { combineReducers } from 'redux';
import undoable from 'redux-undo';

import common from './common';
import point from './point';
import schedule from './schedule';
import wall from './wall';
import wallTemp from './wallTemp';
import message from './message';
import virtualWall from './virtualWall';
import monitoringData from './monitoringData';
import fileListPopup from './fileListPopup';

const rootReducer = combineReducers({
    common,
    point,
    schedule,
    wall:undoable(wall),
    wallTemp,
    message,
    virtualWall,
    monitoringData,
    fileListPopup,
});

export default rootReducer;