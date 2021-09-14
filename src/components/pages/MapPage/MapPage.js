import React from 'react';
import classNames from 'classnames/bind';
import { PageTemplate } from '../../templates';
import styles from './MapPage.module.scss';
import { PageTitle, Button, CheckBox } from '../../atoms';
import { RobotPositionJoyStick, RobotStatusBar, CanvasMap } from '../../organisms';
import { CanvasMapContainer, RobotPositionJoyStickContainer } from '../../../containers';
import { ControlContentTemplate, MainContentTemplate } from '../../templates';

const cx = classNames.bind(styles);

const ColorBox = ({ color = 'white' }) => (
  <div className={cx('color-box-wrap', color)}></div>
)

const MapPage = ({
  drawType,
  disableViewPort,
  onClickDrawType,
  onClickSave,
  onClickLoad,
  onClickScan,
  onClickEnd,
  onDrag,
}) => (
  <PageTemplate>
    <MainContentTemplate title={'맵 생성'}>
      <CanvasMapContainer
        disableViewPort={disableViewPort}
        canvasWidth={1180}
        canvasHeight={1125}
        onDrag={onDrag}
        margin={75}
      />
    </MainContentTemplate>

    <ControlContentTemplate>
      <PageTitle title="수정" className={cx('map-control-title')} />
      <div className={cx('control-content-wrap')}>
        <div className={cx('button-wrap')}>
          <ul>
            <li><Button type="undo" /></li>
            <li><Button type="redo" /></li>
          </ul>
          <ul>
            <li><Button type="default" onClick={onClickLoad}>불러오기</Button></li>
            <li><Button type="gradiant-col" onClick={onClickSave}>저장하기</Button></li>
          </ul>
        </div>
        <ul className={cx('filter-box-wrap')}>
          <li>
            <CheckBox onChange={() => onClickDrawType('able')} checked={drawType === 'able'} />
            <ColorBox color='white' />
            <span>이동가능영역</span>
          </li>
          <li>
            <CheckBox onChange={() => onClickDrawType('undefined')} checked={drawType === 'undefined'} />
            <ColorBox color='grey' />
            <span>알 수 없는 영역</span>
          </li>
          <li>
            <CheckBox onChange={() => onClickDrawType('disable')} checked={drawType === 'disable'} />
            <ColorBox color='dark' />
            <span>갈 수 없는 영역, 벽</span>
          </li>
        </ul>
        <div className={cx('scan-btn-wrap')}>
          <div>
            <Button type='scan-start' active={true} onClick={onClickScan} />
            <span>스캐닝</span>
          </div>
          <div>
            <Button type='scan-end' onClick={onClickEnd} />
            <span>스캐닝 종료</span>
          </div>
        </div>
        {/* <RobotPositionJoyStick className={cx('robot-position-joystick')} /> */}
        <RobotPositionJoyStickContainer className={cx('robot-position-joystick')} />
      </div>
      <RobotStatusBar status='로딩중' />
    </ControlContentTemplate>
  </PageTemplate>
);

export default MapPage;