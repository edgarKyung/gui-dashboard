import React from 'react';
import classNames from 'classnames/bind';
import styles from './RobotStatusBar.module.scss';
import { Icon } from '../../atoms';

const cx = classNames.bind(styles);

const RobotStatusBar = ({
  className,
  status,
  battery,
  onClickInfo,
  onClickBattery,
}) => {
  return (
    <ul className={cx('robot-status-bar-wrap', className)}>
      <li><Icon type={'info'} onClick={onClickInfo}/></li>
      <li>{status}</li>
      <li onClick={onClickBattery}>{battery.percent}% <Icon type={'battery'} percent={battery.percent} /></li>
    </ul>
  )
}

export default RobotStatusBar;
