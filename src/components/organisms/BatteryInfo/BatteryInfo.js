import React from 'react';
import classNames from 'classnames/bind';
import styles from './BatteryInfo.module.scss';
import { Icon } from '../../atoms';
const cx = classNames.bind(styles);

const BatteryInfo = ({battery}) => {
  return (
    <div className={cx('battery-info-wrap')}>
      <div>
        <Icon type={'battery_large'} percent={battery.percent}/>
        <div>{battery.percent}%</div>
      </div>
      <ul>
        <li>충전중 [ ??? ]</li>
        <li>충전까지  : {battery.dischargeTime}분</li>
        <li>잔여량  : ???</li>
        <li>전압  : {battery.voltage}v</li>
        <li>온도  : {battery.temperature}</li>
      </ul>
    </div>
  );
};

BatteryInfo.defaultProps = {
  children: 'default',
};

export default BatteryInfo;
