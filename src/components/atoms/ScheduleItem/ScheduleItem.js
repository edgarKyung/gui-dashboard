import React from 'react';
import classNames from 'classnames/bind';
import styles from './ScheduleItem.module.scss';
const cx = classNames.bind(styles);

const ScheduleItem = ({ item }) => {
  return (
    <div
      className={cx('schedule-item', 'on')}
    >{item}</div>
  )
};

export default ScheduleItem;
