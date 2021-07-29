import React from 'react';
import classNames from 'classnames/bind';
import styles from './PositionJoyStick.module.scss';

const cx = classNames.bind(styles);

const PositionJoyStick = () => (
  <div className={cx('position-joy-stick-wrap')}>
    <div className={cx('control-panel-wrap')}></div>
  </div>
);

export default PositionJoyStick;
