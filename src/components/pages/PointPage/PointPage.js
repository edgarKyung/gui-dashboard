import React from 'react';
import classNames from 'classnames/bind';
import styles from './PointPage.module.scss';
import {OperationContainer} from '../../../containers';
import { PageTitle, Button, Icon, SwitchButton } from '../../atoms';
import { PageTemplate, ControlContentTemplate, MainContentTemplate, Tabs } from '../../templates';
import { RobotStatusBar } from '../../organisms';
const cx = classNames.bind(styles);

const CanvasMap = () => (
  <div className={cx('canvas-image')}>  </div>
);

const pointList = ['거점1','거점2','거점3','거점4','거점5','거점6'];
const PointEditList = ({points = pointList}) => (
  <div className={cx('point-wrap')}>
    <div>
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
            <Button type='none'>X</Button>
          </li>
        ))}
      </ul>
    </div>
    <div>
      <RobotStatusBar status='로딩중' />
    </div>
  </div>
);

const PointPage = () => (
  <PageTemplate>
    <OperationContainer>
      <MainContentTemplate title={'거점/가상벽 추가'}>
        <CanvasMap />
      </MainContentTemplate>

      <ControlContentTemplate>
        <Tabs>
          <Tabs.Header title="거점관리">
            <PointEditList />
          </Tabs.Header>
          <Tabs.Header title="가상벽관리">
            가상벽관리
          </Tabs.Header>
        </Tabs>
      </ControlContentTemplate>
    </OperationContainer>
  </PageTemplate>
);

export default PointPage;