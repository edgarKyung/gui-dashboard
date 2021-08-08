import React from 'react';
import classNames from 'classnames/bind';
import { PageTemplate } from '../../templates';
import styles from './OperationPage.module.scss';
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



const OperationPage = ({
  pointList,
  onClickPoint,
  onClickRobotControl,
  onRobotMoveStart,
  onRobotMoveEnd
}) => (
  <PageTemplate>
    <MainContentTemplate title={'로봇운영'}>
      <CanvasMap />
      <div className={cx('content-wrap')}>
        <ScheduleList />
        <PointList 
          pointList={pointList}
          onClickPoint={onClickPoint}
        />
      </div>
    </MainContentTemplate>

    <ControlContentTemplate>
      <RobotStatus status={'로딩중'}/>
      <RobotPlayControlPanel onClickRobotControl={onClickRobotControl} />
      <div className={cx('joystick-wrap')}>
        <h3>Controller</h3>
        <RobotPositionJoyStick 
          onRobotMoveStart={onRobotMoveStart}
          onRobotMoveEnd={onRobotMoveEnd}
        />
      </div>
      <RobotStatusBar status={'로딩중'} battery={80}/>
    </ControlContentTemplate>
  </PageTemplate>
);

export default OperationPage;