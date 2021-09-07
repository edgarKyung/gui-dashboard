import React from 'react';
import classNames from 'classnames/bind';
import { PageTemplate } from '../../templates';
import styles from './OperationPage.module.scss';
import {
  ScheduleList,
  PointList,
  RobotStatus,
  RobotPlayControlPanel,
  RobotStatusBar,
} from '../../organisms';
import { ControlContentTemplate, MainContentTemplate } from '../../templates';
import { CanvasMapContainer, RobotPositionJoyStickContainer } from '../../../containers';
const cx = classNames.bind(styles);

const OperationPage = ({
  pointList,
  pointMarkList,
  onClickPoint,
  onClickRobotControl,
  activeBtn,
}) => (
  <PageTemplate>
    <MainContentTemplate title={'로봇운영'}>
      <div>
        <CanvasMapContainer
          canvasWidth={1180}
          canvasHeight={675}
        />
      </div>
      <div className={cx('content-wrap')}>
        <ScheduleList className={cx('schedule-wrap')} />
        <PointList
          className={cx('point-wrap')}
          pointMarkList={pointMarkList}
          pointList={pointList}
          onClickPoint={onClickPoint}
        />
      </div>
    </MainContentTemplate>

    <ControlContentTemplate>
      <RobotStatus status={'로딩중'} />
      <RobotPlayControlPanel
        onClickRobotControl={onClickRobotControl}
        activeBtn={activeBtn}
      />
      <div className={cx('joystick-wrap')}>
        <h3>Controller</h3>
        <RobotPositionJoyStickContainer />
      </div>
      <RobotStatusBar status={'로딩중'} battery={80} />
    </ControlContentTemplate>
  </PageTemplate>
);

export default OperationPage;