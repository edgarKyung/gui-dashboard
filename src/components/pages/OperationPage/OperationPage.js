import React from 'react';
import classNames from 'classnames/bind';
import { PageTemplate } from '../../templates';
import styles from './OperationPage.module.scss';
import {
  ScheduleList,
  PointList,
  RobotStatus,
  RobotPlayControlPanel,
  RobotPositionControlPanel
} from '../../organisms';
import { ControlContentTemplate, MainContentTemplate } from '../../templates';
import { CanvasMapContainer, RobotPositionJoyStickContainer, RobotStatusBarContainer } from '../../../containers';
const cx = classNames.bind(styles);

const OperationPage = ({
  status,
  mode,
  state,
  pointList,
  pointMarkList,
  onClickPoint,
  onClickRobotControl,
  activeBtn,
  scheduleList,
  points,
  isModeSelect,
  onClickMode,
  viewportRef,
  onClickMovePoint,
  onClickMoveRotation
}) => (
  <PageTemplate>
    <MainContentTemplate title={'로봇운영'}>
      <div className={cx('canvas-wrap')}>
        <CanvasMapContainer
          pageType='operation'
          isDrawStatus={true}
          drawOneTime={true}
          canvasWidth={1180}
          canvasHeight={675}
          margin={75}
          points={points}
          viewportRef={viewportRef}
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
      <RobotStatus status={status} onClickMode={onClickMode} />
      <RobotPlayControlPanel
        state={state}
        mode={mode}
        onClickRobotControl={onClickRobotControl}
        activeBtn={activeBtn}
        isModeSelect={isModeSelect}
      />
      <div className={cx('joystick-wrap')}>
        {!isModeSelect && (
          <RobotPositionJoyStickContainer />
        )}
        {isModeSelect && (
          <RobotPositionControlPanel
            onMovePoint={onClickMovePoint}
            onMoveRotation={onClickMoveRotation}
          />
        )}
      </div>
      <RobotStatusBarContainer />
    </ControlContentTemplate>
  </PageTemplate>
);

export default OperationPage;