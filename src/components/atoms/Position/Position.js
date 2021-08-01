import React from 'react';
import classNames from 'classnames/bind';
import styles from './Position.module.scss';
const cx = classNames.bind(styles);

const Position = ({children, className}) => {
  return (
    <div className={cx('position-wrap', className)}>
      {children}
    </div>
  )
};

export default Position;
