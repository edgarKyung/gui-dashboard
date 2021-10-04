import React from 'react';
import classNames from 'classnames/bind';
import { PageTemplate } from '../../templates';
import styles from './MapPage.module.scss';
import { PageTitle, Button, CheckBox } from '../../atoms';
import { RobotPositionJoyStick, CanvasMap } from '../../organisms';
import { RobotStatusBarContainer, CanvasMapContainer, RobotPositionJoyStickContainer } from '../../../containers';
import { ControlContentTemplate, MainContentTemplate } from '../../templates';

const cx = classNames.bind(styles);

const ColorBox = ({ color = 'white' }) => (
  <div className={cx('color-box-wrap', color)}></div>
)

const MapPage = ({
  drawSize,
  drawType,
  drawSizeList,
  disableViewPort,
  onClickDrawType,
  onClickSave,
  onClickLoad,
  onClickScan,
  onClickEnd,
  onDrag,
  onDragEnd,
  onClickUndoRedo,
  onClickDrawLine,
}) => (
  <PageTemplate>
    <MainContentTemplate title={'맵 생성'}>
      <CanvasMapContainer
        disableViewPort={disableViewPort}
        canvasWidth={1180}
        canvasHeight={1125}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        margin={75}
      />
    </MainContentTemplate>

    <ControlContentTemplate>
      <PageTitle title="수정" className={cx('map-control-title')} />
      <div className={cx('control-content-wrap')}>
        <div className={cx('button-wrap')}>
          <ul>
            <li><Button type="undo" onClick={() => onClickUndoRedo('undo')} /></li>
            <li><Button type="redo" onClick={() => onClickUndoRedo('redo')} /></li>
          </ul>
          <ul>
            <li><Button type="default" onClick={onClickLoad}>불러오기</Button></li>
            <li><Button type="gradiant-col" onClick={onClickSave}>저장하기</Button></li>
          </ul>
        </div>
        <div className={cx('edit-box-wrap')}>
          <ul className={cx('filter-box-wrap')}>
            <li>
              <CheckBox onChange={() => onClickDrawType('undefined')} checked={drawType === 'undefined'} />
              <ColorBox color='grey' />
              <span>길</span>
            </li>
            <li>
              <CheckBox onChange={() => onClickDrawType('disable')} checked={drawType === 'disable'} />
              <ColorBox color='dark' />
              <span>장애물</span>
            </li>
            <li>
              <CheckBox onChange={() => onClickDrawType('able')} checked={drawType === 'able'} />
              <ColorBox color='white' />
              <span>미탐색</span>
            </li>
          </ul>
          <ul className={cx('line-box-wrap')}>
            {
              drawSizeList.map(size => (
                <li 
                className={cx(`line-${size}`, {
                  'active': drawSize === size
                })}
                onClick={() => onClickDrawLine(size)}
                ><span/></li>
              ))
            }
          </ul>
        </div>
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
      </div>
      <div className={cx('joystick-wrap')}>
        <RobotPositionJoyStickContainer className={cx('robot-position-joystick')} />
      </div>
      <RobotStatusBarContainer />
    </ControlContentTemplate>
  </PageTemplate>
);

export default MapPage;