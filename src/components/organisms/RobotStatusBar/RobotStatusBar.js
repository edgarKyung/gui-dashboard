import React from 'react';
import classNames from 'classnames/bind';
import styles from './RobotStatusBar.module.scss';
import { Icon } from '../../atoms';

const cx = classNames.bind(styles);

const RobotStatusBar = ({
  className,
  utilization,
  operation,
  offline,
  charging,
}) => {
  return (
    <div className={cx('robot-status-bar-wrap', className)}>
      <ul>
        {/* <li><Icon type={'info'} onClick={onClickInfo} /></li> */}
        <li>Floor1 (가동 : {utilization}%) </li>
        <li className={cx('operating')}>운용 : {operation}</li>
        <li className={cx('offline')}>오프라인 : {offline}</li>
        <li className={cx('charging')}>충천 : {charging}</li>
      </ul>
    </div>
  )
}

export default React.memo(RobotStatusBar);
