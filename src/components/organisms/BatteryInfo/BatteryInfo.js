import React from 'react';
import classNames from 'classnames/bind';
import styles from './BatteryInfo.module.scss';
import { Icon } from '../../atoms';
import * as RobotApi from '../../../lib/Robot';
const cx = classNames.bind(styles);

const BatteryInfo = ({ battery }) => {
  const handleClickBattery = async () => {
    await RobotApi.charge();
  }

  return (
    <div className={cx('battery-info-wrap')}>
      <div>
        <Icon type={'battery_large'} percent={battery.percent} onClick={handleClickBattery} />
        <div>{battery.percent}%</div>
      </div>
      <ul>
        {battery.current > 0 && <li>{Math.floor(battery.chargeTime / 60)}시간 {battery.chargeTime % 60}분 &nbsp; 충전완료</li>}
        {battery.current < 0 && <li>{Math.floor(battery.dischargeTime / 60)}시간 {battery.dischargeTime % 60}분 &nbsp; 사용가능</li>}
        <li>전류 &nbsp;&nbsp;&nbsp; {battery.current.toFixed(1)} A</li>
        <li>전압 &nbsp;&nbsp;&nbsp; {battery.voltage.toFixed(1)} V</li>
        <li>온도 &nbsp;&nbsp;&nbsp; {battery.temperature.toFixed(1)} °C</li>
      </ul>
    </div>
  );
};

BatteryInfo.defaultProps = {
  children: 'default',
};

export default BatteryInfo;
