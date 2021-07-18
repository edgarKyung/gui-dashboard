import React from 'react';
import classNames from 'classnames/bind';
import { PageTemplate } from '../../templates';
import styles from './OperationPage.module.scss';
import {OperationContainer} from '../../../containers';
import { PageTitle, Icon } from '../../atoms';
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

        <ControlContentTemplate>
          <ul className={cx('robot-status-wrap')}>
              <li>
                <i className={cx('status-logo')}/>
                로봇 상태
              </li>
              <li className={cx('status-info')}>
                로딩중
              </li>
          </ul>

          <div className={cx('robot-play-control-wrap')}>
            <button className={cx('robot-control-stop')}/>
            <button className={cx('robot-control-start', 'on')}/>
            <button className={cx('robot-control-pause')}/>
          </div>

          <div className={cx('robot-position-control-wrap')}>
            <div >Controller</div>
            <div className={cx('control-panel-wrap')}>

            </div>
            <ul className={cx('robot-status-bar-wrap')}>
              <li><Icon icon={'info'} /></li>
              <li>로딩중</li>
              <li>40% <Icon icon={'battery'} percent={40}/></li>
            </ul>
          </div>
        </ControlContentTemplate>
      </div>
    </OperationContainer>
  </PageTemplate>
);

export default OperationPage;