import React from 'react';
import classNames from 'classnames/bind';
import styles from './PointIcon.module.scss';
const cx = classNames.bind(styles);

const PointIcon = ({}) => {
  return (
    <i className={cx('point_icon')}></i>
  )
};

export default PointIcon;
