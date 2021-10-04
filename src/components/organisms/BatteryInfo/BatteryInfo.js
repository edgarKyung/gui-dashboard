import React from 'react';
import classNames from 'classnames/bind';
import styles from './BatteryInfo.module.scss';
import { Icon } from '../../atoms';
const cx = classNames.bind(styles);

const BatteryInfo = ({battery}) => {
  return (
    <div className={cx('battery-info-wrap')}>
      <div>
        <Icon type={'battery_large'} percent={battery}/>
        <div>{battery}%</div>
      </div>
      <ul>
        <li>충전중</li>
        <li>충전까지  : 23분</li>
        <li>잔여량  : 2시간 7분</li>
      </ul>
    </div>
  );
};

export default BatteryInfo;
