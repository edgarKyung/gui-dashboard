import React from 'react';
import classNames from 'classnames/bind';
import styles from './Icon.module.scss';
const cx = classNames.bind(styles);

const Icon = ({type, className, percent = 0}) => {
  return (
    <i className={cx('icon',className, `icon_${type}`)}>
      {type === 'battery' && (<div className={cx('range', `range-${percent}`)}></div>)}
    </i>
  )
};

export default Icon;