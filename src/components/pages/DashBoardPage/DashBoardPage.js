import React from 'react';

import classNames from 'classnames/bind';
import styles from './DashBoardPage.module.scss';
import { PageTitle, Button } from '../../atoms';
import { PageTemplate, ControlContentTemplate, MainContentTemplate, Tabs } from '../../templates';
import { RobotStatusBar, PointEditPannel, PointEditList, WallEditList } from '../../organisms';
import { CanvasMapContainer, RobotStatusBarContainer } from '../../../containers';
const cx = classNames.bind(styles);

const DashBoardPage = ({
}) => {
  return (
    <PageTemplate>
      <MainContentTemplate title={'이동 로봇 관제 시스템'}>
        <div className={cx('page-wrap')}>
          <div className={cx('content-wrap')}>
            <div className={cx('canvas-wrap')}>
              <CanvasMapContainer />
            </div>
            <ControlContentTemplate>
              허ㅗ호
            </ControlContentTemplate>
          </div>
          <RobotStatusBarContainer />
        </div>
      </MainContentTemplate>
    </PageTemplate>
  );
};

export default DashBoardPage;