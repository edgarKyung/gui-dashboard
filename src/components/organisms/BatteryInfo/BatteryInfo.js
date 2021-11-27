import React from 'react';
import classNames from 'classnames/bind';
import styles from './BatteryInfo.module.scss';
import { Icon } from '../../atoms';
import * as RobotApi from '../../../lib/Robot';
const cx = classNames.bind(styles);

const BatteryInfo = ({
  chargeTime,
  current,
  dischargeTime,
  percent,
  temperature,
  voltage,
}) => {
  const handleClickBattery = async () => {
    await RobotApi.charge();
  }

  return (
    <div className={cx('battery-info-wrap')}>
      <div>
        <Icon type={'battery_large'} percent={percent} onClick={handleClickBattery} />
        <div>{percent}%</div>
      </div>
      <ul>
        {current > 0 && <li>{Math.floor(chargeTime / 60)}시간 {chargeTime % 60}분 &nbsp; 충전완료</li>}
        {current < 0 && <li>{Math.floor(dischargeTime / 60)}시간 {dischargeTime % 60}분 &nbsp; 사용가능</li>}
        <li>전류 &nbsp;&nbsp;&nbsp; {current.toFixed(1)} A</li>
        <li>전압 &nbsp;&nbsp;&nbsp; {voltage.toFixed(1)} V</li>
        <li>온도 &nbsp;&nbsp;&nbsp; {temperature.toFixed(1)} °C</li>
      </ul>
    </div>
  );
};

BatteryInfo.defaultProps = {
  children: 'default',
};

export default React.memo(BatteryInfo);
