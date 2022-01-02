import { combineReducers } from 'redux';

import common from './common';
import message from './message';
import monitoringData from './monitoringData';
import images from './images';
import floors from './floors';
import robots from './robots';


const rootReducer = combineReducers({
  monitoringData,
  common,
  message,
  images,
  floors,
  robots,
});

export default rootReducer;