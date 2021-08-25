import React from 'react';
import classNames from 'classnames/bind';
import styles from './PointIcon.module.scss';
const cx = classNames.bind(styles);

const PointIcon = ({
  angle = 0,
}) => {
  return (
    <i className={cx('point_icon')} style={{transform:`rotate(${angle}deg)`}}></i>
  )
};

export default PointIcon;
