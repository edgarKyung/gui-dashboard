import React from 'react';
import classNames from 'classnames/bind';
import styles from './RobotPlayControlPanel.module.scss';
import { Button } from '../../atoms';

const cx = classNames.bind(styles);

const RobotPlayControlPanel = () => (
  <div className={cx('robot-play-control-wrap')}>
    <Button type='stop' className={cx('button','on')} />
    <Button type='start' className={cx('button', 'on')} />
    <Button type='pause' className={cx('button', 'on')} />
  </div>
);

export default RobotPlayControlPanel;
