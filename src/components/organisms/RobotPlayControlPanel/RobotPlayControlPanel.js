import React from 'react';
import classNames from 'classnames/bind';
import styles from './RobotPlayControlPanel.module.scss';
import { Button } from '../../atoms';

import btn_temp1 from '../../../static/images/source/btn_temp1.png';
import btn_temp2 from '../../../static/images/source/btn_temp2.png';
import btn_temp3 from '../../../static/images/source/btn_temp3.png';
const cx = classNames.bind(styles);

const RobotPlayControlPanel = ({
  onClickRobotControl
}) => (
  <ul className={cx('robot-play-control-wrap')}>
    <li><img src={btn_temp1}/></li>
    <li><img src={btn_temp2}/></li>
    <li><img src={btn_temp3}/></li>

    {/* <li><Button type='stop' className={cx('button')} onClick={() => onClickRobotControl('stop')} /></li>
    <li><Button type='start' active={true} className={cx('button')} onClick={() => onClickRobotControl('start')} /></li>
    <li><Button type='pause' className={cx('button')} onClick={() => onClickRobotControl('pause')} /></li> */}
  </ul>
);

export default RobotPlayControlPanel;
