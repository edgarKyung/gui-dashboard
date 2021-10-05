import React, { useState, Fragment, useEffect, useRef } from 'react';
import * as RobotApi from '../../lib/Robot';
import { setBattery } from '../../modules/reducers/monitoringData';

class DataCollector {
  constructor() {
    this.init();
    this.prevData = {
      voltage: 0,
      current: 0,
      percent: 0,
      chargeTime: 0,
      dischargeTime: 0,
      temperature: 0
    };
  }

  init() {
    try {
      this.batteryInfo();
      setInterval(this.batteryInfo.bind(this), 5000);
    } catch (err) {
      console.log(err);
    }
  }

  async batteryInfo() {
    const battery = await RobotApi.battery();
    if (this.prevData.percent !== battery.percent) {
      this.store.dispatch(setBattery(battery.percent));
      this.prevData = battery;
    }
  }

  injectStore(store) {
    this.store = store;
    console.log('injectStore', store)
    console.log(this);
  };
}

export default new DataCollector();
