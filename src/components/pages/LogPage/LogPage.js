import React from 'react';
import classNames from 'classnames/bind';
import { PageTemplate } from '../../templates';
import styles from './LogPage.module.scss';
import {OperationContainer} from '../../../containers';
import { PageTitle, Icon } from '../../atoms';
const cx = classNames.bind(styles);

const MainContentTemplate = ({title, classNames, children}) => (
  <section className={cx('content-section', classNames)}>
    <PageTitle title={title}/>
    <div className={cx('page-content')}>
      {children}
    </div>
  </section>
);


const LogPage = () => (
  <PageTemplate>
    <OperationContainer>
      <div className={cx('page-wrap')}>
        <MainContentTemplate title={'로그'}>
        </MainContentTemplate>
      </div>
    </OperationContainer>
  </PageTemplate>
);

export default LogPage;