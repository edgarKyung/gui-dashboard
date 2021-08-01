import React from 'react';
import classNames from 'classnames/bind';
import styles from './RobotPositionJoyStick.module.scss';

const cx = classNames.bind(styles);

const RobotPositionJoyStick = ({className}) => (
  <div className={cx('robot-position-control-wrap', className)}>
    <div className={cx('control-panel-wrap')}></div>
  </div>
);

export default RobotPositionJoyStick;
