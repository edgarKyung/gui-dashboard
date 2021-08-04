import React from 'react';
import classNames from 'classnames/bind';
import { PageTemplate } from '../../templates';
import styles from './MapPage.module.scss';
import { PageTitle, Button, CheckBox } from '../../atoms';
import { RobotPositionJoyStick, RobotStatusBar, CanvasMap } from '../../organisms';
import { OperationContainer } from '../../../containers';
import { ControlContentTemplate, MainContentTemplate } from '../../templates';

const cx = classNames.bind(styles);

const ColorBox = ({color = 'white'}) => (
  <div className={cx('color-box-wrap', color)}></div>
)

const MapPage = ({
  imgData,
  width,
  height
}) => (
  <PageTemplate>
    <OperationContainer>
      <MainContentTemplate title={'맵 생성'}>
        <CanvasMap 
          imgData={imgData} 
          width={width}
          height={height}
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
              <li><Button type="default">불러오기</Button></li>
              <li><Button type="gradiant-col" >저장하기</Button></li>
            </ul>
          </div>
          <ul className={cx('filter-box-wrap')}>
            <li>
              <CheckBox id='able' checked={true}/>
              <ColorBox color='white'/>
              <span>이동가능영역</span>
            </li> 
            <li>
              <CheckBox />
              <ColorBox color='grey'/>
              <span>알 수 없는 영역</span>
            </li> 
            <li>
              <CheckBox />
              <ColorBox color='dark'/>
              <span>갈 수 없는 영역, 벽</span>
            </li> 
          </ul>
          <div className={cx('scan-btn-wrap')}>
            <div>
              <Button type='scan-start' active={true}/>
              <span>스캐닝</span>
              </div>
            <div>
              <Button type='scan-end' />
              <span>스캐닝 종료</span>
            </div>
          </div>
          <RobotPositionJoyStick className={cx('robot-position-joystick')} />
        </div>
        <RobotStatusBar status='로딩중'/>
      </ControlContentTemplate>
    </OperationContainer>
  </PageTemplate>
);

export default MapPage;