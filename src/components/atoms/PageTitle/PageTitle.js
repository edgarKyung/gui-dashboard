import React from 'react';
import classNames from 'classnames/bind';
import styles from './PageTitle.module.scss';
const cx = classNames.bind(styles);

const PageTitle = ({title, className}) => (
  <h3 className={cx('page-title', className)}>{title}</h3>
);

export default PageTitle;
