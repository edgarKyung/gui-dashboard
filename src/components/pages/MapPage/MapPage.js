import React from 'react';
import classNames from 'classnames/bind';
import { PageTemplate } from '../../templates';
import styles from './MapPage.module.scss';
import {OperationContainer} from '../../../containers';
import { ControlContentTemplate, MainContentTemplate } from '../../templates';

const cx = classNames.bind(styles);

const CanvasMap = () => (
  <div className={cx('canvas-image')}>  </div>
);

const MapPage = () => (
  <PageTemplate>
    <OperationContainer>
      <MainContentTemplate title={'맵 생성'}>
        <CanvasMap />
      </MainContentTemplate>

      <ControlContentTemplate>
      </ControlContentTemplate>
    </OperationContainer>
  </PageTemplate>
);

export default MapPage;