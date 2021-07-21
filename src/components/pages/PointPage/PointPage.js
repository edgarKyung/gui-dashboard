import React from 'react';
import classNames from 'classnames/bind';
import { PageTemplate } from '../../templates';
import styles from './PointPage.module.scss';
import {OperationContainer} from '../../../containers';
import { ControlContentTemplate, MainContentTemplate, Tabs } from '../../templates';
const cx = classNames.bind(styles);

const CanvasMap = () => (
  <div className={cx('canvas-image')}>  </div>
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
            거점관리
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