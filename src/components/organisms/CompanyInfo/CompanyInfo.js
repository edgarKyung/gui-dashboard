import React from 'react';
import classNames from 'classnames/bind';
import styles from './CompanyInfo.module.scss';
const cx = classNames.bind(styles);

const CompanyInfo = ({ info }) => {
  return (
    <div className={cx('company-info-wrap')}>
      <ul>
        <li>{info.version}</li>
        <li>{info.contact}</li>
      </ul>
    </div>
  );
};

CompanyInfo.defaultProps = {
  children: 'default',
};

export default CompanyInfo;
