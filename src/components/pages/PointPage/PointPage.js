import React from 'react';
import classNames from 'classnames/bind';
import { PageTemplate } from '../../templates';
import styles from './PointPage.module.scss';
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

const ControlContentTemplate = ({children}) => (
  <section className={cx('control-wrap')}>{children}</section>
);

const MapPage = () => (
  <PageTemplate>
    <OperationContainer>
      <div className={cx('page-wrap')}>
        <MainContentTemplate title={'거점/가상벽 추가'}>
        </MainContentTemplate>

        <ControlContentTemplate>
          엥
        </ControlContentTemplate>
      </div>
    </OperationContainer>
  </PageTemplate>
);

export default MapPage;