import React from 'react';
import classNames from 'classnames/bind';
import styles from './RobotStatus.module.scss';
import { Icon } from '../../atoms';

const cx = classNames.bind(styles);

const RobotStatus = ({
  className,
  status,
  onClickMode
}) => (
  <div className={cx('robot-status-wrap', className)}>
    <ul className={cx('robot-status')}>
      <li>
        <Icon type='status_logo' onClick={onClickMode} />
        로봇 상태
      </li>
      <li className={cx('status-info')}>
        {status}
      </li>
    </ul>
  </div>
)

export default React.memo(RobotStatus);
