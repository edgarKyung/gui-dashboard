import React from 'react';
import classNames from 'classnames/bind';
import styles from './RobotPlayControlPanel.module.scss';
import { Button } from '../../atoms';

const cx = classNames.bind(styles);

const RobotPlayControlPanel = ({
  onClickRobotControl
}) => (
  <ul className={cx('robot-play-control-wrap')}>
    <li><Button type='people' active={false} className={cx('button')} onClick={() => onClickRobotControl('people')} /></li>
    <li><Button type='line' active={false} className={cx('button')} onClick={() => onClickRobotControl('line')} /></li>
    <li><Button type='navigation' active={false} className={cx('button')} onClick={() => onClickRobotControl('navigation')} /></li>
    
    {/* <li><Button type='stop' className={cx('button')} onClick={() => onClickRobotControl('stop')} /></li>
    <li><Button type='start' active={true} className={cx('button')} onClick={() => onClickRobotControl('start')} /></li>
    <li><Button type='pause' className={cx('button')} onClick={() => onClickRobotControl('pause')} /></li> */}
  </ul>
);

export default RobotPlayControlPanel;
