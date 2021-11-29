import React from 'react';
import classNames from 'classnames/bind';
import styles from './Input.module.scss';
const cx = classNames.bind(styles);

const Input = ({
  type,
  className,
  active,
  ...args }) => {
  return (
    <input type={type} className={cx('input', className,)} {...args} />
  )
};

export default React.memo(Input);
