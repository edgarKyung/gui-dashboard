import React from 'react';
import classNames from 'classnames/bind';
import styles from './SwitchButton.module.scss';
const cx = classNames.bind(styles);

//type : typescript로 type 값지정하기 
const SwitchButton = ({value, className, ...args}) => {
  return (
    <div className={cx('switch', className, value ? 'on' : 'off')} {...args}>
      <div className={cx('pointer', value ? 'on' : 'off')}></div>
    </div>
  )
};

export default SwitchButton;
