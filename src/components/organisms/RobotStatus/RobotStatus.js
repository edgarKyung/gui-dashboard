import React from 'react';
import classNames from 'classnames/bind';
import styles from './RobotStatus.module.scss';

const cx = classNames.bind(styles);

const RobotStatus = ({className,status}) => (
  <ul className={cx('robot-status-wrap', className)}>
    <li>
      <i className={cx('status-logo')}/>
      로봇 상태
    </li>
    <li className={cx('status-info')}>
      {status}
    </li>
  </ul>
)

export default RobotStatus;
