import { combineReducers } from 'redux';
import undoable from 'redux-undo';

import common from './common';
import point from './point';
import schedule from './schedule';
import wall from './wall';
import message from './message';
import virtualWall from './virtualWall';
import monitoringData from './monitoringData';
import fileListPopup from './fileListPopup';


import images from './images';

const rootReducer = combineReducers({
  monitoringData,
  common,
  message,
  images,
});

export default rootReducer;