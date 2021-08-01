import React from 'react';
import classNames from 'classnames/bind';
import styles from './RobotPositionControlPanel.module.scss';

const cx = classNames.bind(styles);

const RobotPositionControlPanel = () => (
  <div className={cx('position-joy-stick-wrap')}>
    <div className={cx('control-panel-wrap')}></div>
  </div>
);

export default RobotPositionControlPanel;
