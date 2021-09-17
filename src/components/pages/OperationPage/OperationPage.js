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
  onClickBattery,
  activeBtn,
  scheduleList,
  points,
}) => (
  <PageTemplate>
    <MainContentTemplate title={'로봇운영'}>
      <div className={cx('canvas-wrap')}>
        <CanvasMapContainer
          isOp={true}
          isDrawStatus={true}
          drawOneTime={true}
          canvasWidth={1180}
          canvasHeight={675}
          margin={75}
          points={points}
        />
      </div>
      <div className={cx('content-wrap')}>
        <ScheduleList
          className={cx('schedule-wrap')}
          scheduleList={scheduleList}
        />
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
        <RobotPositionJoyStickContainer />
      </div>
      <RobotStatusBar onClickBattery={onClickBattery} status={'로딩중'} battery={80} />
    </ControlContentTemplate>
  </PageTemplate>
);

export default OperationPage;