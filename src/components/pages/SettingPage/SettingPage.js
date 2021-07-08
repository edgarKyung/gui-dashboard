import React from 'react';
import classNames from 'classnames/bind';
import { PageTemplate } from '../../templates';
import styles from './SettingPage.css';

const cx = classNames.bind(styles);

const SettingPage = () => (
  <PageTemplate>
    <div className={cx('setting-container')} flex>
      setting
    </div>
  </PageTemplate>
);

export default SettingPage;