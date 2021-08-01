import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './PointPage.module.scss';
import {OperationContainer} from '../../../containers';
import { PageTitle, Button, Icon, PointIcon, SwitchButton, Position } from '../../atoms';
import { PageTemplate, ControlContentTemplate, MainContentTemplate, Tabs } from '../../templates';
import { RobotStatusBar, RobotPositionControlPanel } from '../../organisms';
const cx = classNames.bind(styles);

const CanvasMap = () => (
  <div className={cx('canvas-image')}>  </div>
);

const pointList = ['거점1','거점2','거점3','거점4','거점5','거점6'];
const PointEditList = ({points = pointList}) => (
  <div className={cx('point-wrap')}>
    <PageTitle title='거점 목록' />
    <ul className={cx('list-wrap')}>
      {points.map(data => (
        <li>
          <Button type='menu' />
          <Button type='default' className={cx('point-button')}>
            {data}
            <Icon type='star'/>
          </Button> 
          <SwitchButton value={true} />
          <Button type='circle'>X</Button>
        </li>
      ))}
    </ul>
  </div>
);

const PointEditPannel = ({className}) => (
  <div className={cx('point-edit-wrap', className)}>
    <div className={cx('point-edit-header')}><Button type='circle'>X</Button></div>
    <div className={cx('point-edit-icon')}>
      <PointIcon />
      거점3
    </div>
    <div className={cx('point-pose-wrap')}>
      <Position className={cx('point-pose')}>
        <ul>
          <li>X 000</li>
          <li>Y 000</li>
        </ul>
      </Position>
      <Position className={cx('point-pose')}>
        <ul>
          <li>X 000</li>
          <li>Y 000</li>
        </ul>
      </Position>
      <Position className={cx('point-pose')}>
        <ul>
          <li>X 000</li>
          <li>Y 000</li>
        </ul>
      </Position>
    </div>
    <div className={cx('point-control-wrap')}>
      <div>Contoller</div>
      <RobotPositionControlPanel />
    </div>

  </div>
);

const PointPage = () => {
  const [showEdit, setShowEdit] = useState(false);

  const handleClickApply = () => {
    setShowEdit(!showEdit);
  }
  return(
  <PageTemplate>
    <OperationContainer>
      <MainContentTemplate title={'거점/가상벽 추가'}>
        <CanvasMap />
      </MainContentTemplate>

      <ControlContentTemplate>
        <Tabs>
          <Tabs.Header title="거점관리">
            <div className={cx('point-pannel-wrap')}>
              <PointEditList />
              <Button type={'gradiant-col'} onClick={handleClickApply}>적용하기</Button>
              { showEdit && <PointEditPannel className={cx('edit-pannel-wrap')}/> }
            </div>
          </Tabs.Header>
          <Tabs.Header title="가상벽관리">
            가상벽관리
          </Tabs.Header>
        </Tabs>
        <RobotStatusBar status='로딩중' />
      </ControlContentTemplate>
    </OperationContainer>
  </PageTemplate>
  );
};

export default PointPage;