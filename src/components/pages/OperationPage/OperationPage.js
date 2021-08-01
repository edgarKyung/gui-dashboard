import React from 'react';
import classNames from 'classnames/bind';
import { PageTemplate } from '../../templates';
import styles from './OperationPage.module.scss';
import {OperationContainer} from '../../../containers';
import { 
  ScheduleList, 
  PointList, 
  RobotStatus, 
  RobotPlayControlPanel,
  RobotPositionJoyStick,
  RobotStatusBar,
} from '../../organisms';
import { ControlContentTemplate, MainContentTemplate } from '../../templates';
const cx = classNames.bind(styles);

const CanvasMap = () => (
  <div className={cx('canvas-image')}></div>
)



const OperationPage = () => (
  <PageTemplate>
    <OperationContainer>
        <MainContentTemplate title={'로봇운영'}>
          <CanvasMap />
          <div className={cx('content-wrap')}>
            <ScheduleList />
            <PointList />
          </div>
        </MainContentTemplate>

        <ControlContentTemplate>
          <RobotStatus status={'로딩중'}/>
          <RobotPlayControlPanel />
          <RobotPositionJoyStick />
          <RobotStatusBar status={'로딩중'} battery={80}/>
        </ControlContentTemplate>
    </OperationContainer>
  </PageTemplate>
);

export default OperationPage;