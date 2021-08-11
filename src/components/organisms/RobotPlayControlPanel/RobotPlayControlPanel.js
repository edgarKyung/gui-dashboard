import React from 'react';
import classNames from 'classnames/bind';
import styles from './RobotPlayControlPanel.module.scss';
import { Button } from '../../atoms';

const cx = classNames.bind(styles);

const RobotPlayControlPanel = ({
  onClickRobotControl,
  activeBtn
}) => {
  const buttons = ['people', 'line', 'navigation'];
  return (
  <ul className={cx('robot-play-control-wrap')}>
    {
      buttons.map(button => (
        <li><Button type={button} active={activeBtn === button} className={cx('button')} onClick={() => onClickRobotControl(button)} /></li>
      ))
    }
    {/* <li><Button type='stop' className={cx('button')} onClick={() => onClickRobotControl('stop')} /></li>
    <li><Button type='start' active={true} className={cx('button')} onClick={() => onClickRobotControl('start')} /></li>
    <li><Button type='pause' className={cx('button')} onClick={() => onClickRobotControl('pause')} /></li> */}
  </ul>
  );
};

export default RobotPlayControlPanel;
