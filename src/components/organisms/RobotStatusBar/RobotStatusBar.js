import React from 'react';
import classNames from 'classnames/bind';
import styles from './RobotStatusBar.module.scss';
import { Icon } from '../../atoms';

const cx = classNames.bind(styles);

const RobotStatusBar = ({className, status, battery}) => (
  <ul className={cx('robot-status-bar-wrap', className)}>
    <li><Icon type={'info'} /></li>
    <li>{status}</li>
    <li>40% <Icon type={'battery'} percent={battery}/></li>
  </ul>
)

export default RobotStatusBar;
