import React from 'react';
import classNames from 'classnames/bind';
import styles from './PointItem.module.scss';
const cx = classNames.bind(styles);

const PointItem = ({item, active = true}) => {
  return (
    <div 
      className={cx('point-item', 'on')}
    >
      {item}
      <i className={cx('star')}></i>
    </div>
  )
};

export default PointItem;
