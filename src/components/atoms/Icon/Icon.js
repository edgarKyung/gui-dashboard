import React from 'react';
import classNames from 'classnames/bind';
import styles from './Icon.module.scss';
const cx = classNames.bind(styles);

const Icon = ({type, className, percent = 0, active, ...args}) => {
  return (
    <i className={cx('icon',className, `icon_${type}`, {'on': active})} {...args}>
      {['battery', 'battery_large'].includes(type) && (<div className={cx('range', `range-${percent}`)}></div>)}
    </i>
  )
};

export default Icon;
