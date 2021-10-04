import React, { useState, Fragment, useEffect, useRef } from 'react';
import * as RobotApi from '../../lib/Robot';
import { setBattery } from '../../modules/reducers/monitoringData';

class DataCollector {
  constructor() {
    this.init();
    this.prevData = {
      battery: null
    };
  }

  init() {
    try {
      setInterval(this.batteryInfo.bind(this), 1000);
    } catch (err) {
      console.log(err);
    }
  }

  async batteryInfo() {
    const { battery } = await RobotApi.battery();
    if(this.prevData.battery !== battery){
      this.store.dispatch(setBattery(battery));
      this.prevData.battery = battery;
    }
  }

  injectStore(store){
    this.store = store;
    console.log('injectStore', store)
    console.log(this);
  };
}

export default new DataCollector();
