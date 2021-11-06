import React from 'react';
import classNames from 'classnames/bind';
import { PageTemplate } from '../../templates';
import styles from './LogPage.module.scss';
import { MainContentTemplate } from '../../templates';
const cx = classNames.bind(styles);

const LogPage = () => (
  <PageTemplate>
    <MainContentTemplate title={'로그'} classNames={cx('page-wrap')}>
    </MainContentTemplate>
  </PageTemplate>
);

export default LogPage;