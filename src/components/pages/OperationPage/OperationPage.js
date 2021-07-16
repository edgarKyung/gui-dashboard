import React from 'react';
import classNames from 'classnames/bind';
import { PageTemplate } from '../../templates';
import styles from './OperationPage.module.scss';
import {OperationContainer} from '../../../containers';
import { PageTitle } from '../../atoms';
import { ScheduleList, PointList } from '../../organisms';
const cx = classNames.bind(styles);

const CanvasMap = () => (
  <div className={cx('canvas-image')}>
    <img src="/images/source/temp_map.png" />
  </div>
)

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

const OperationPage = () => (
  <PageTemplate>
    <OperationContainer>
      <div className={cx('operation-page-wrap')}>
        <MainContentTemplate title={'로봇운영'}>
          <CanvasMap />
          <div className={cx('content-wrap')}>
            <ScheduleList />
            <PointList />
          </div>
        </MainContentTemplate>

        <ControlContentTemplate />
      </div>
    </OperationContainer>
  </PageTemplate>
);

export default OperationPage;