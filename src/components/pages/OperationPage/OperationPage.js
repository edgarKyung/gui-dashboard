import React from 'react';
import classNames from 'classnames/bind';
import { PageTemplate } from '../../templates';
import styles from './OperationPage.module.scss';
import {OperationContainer} from '../../../containers';
const cx = classNames.bind(styles);

const OperationPage = () => (
  <PageTemplate>
    <OperationContainer>
      <div className={cx('operation-page-wrap')}>
        <section className={cx('content-section')}>
          <h3 className={cx('page-title')}>로봇 운영</h3>
          <div className={cx('page-content')}>
            <div className={cx('canvas-image')}>
              Canvas section
            </div>
            <div className={cx('content-wrap')}>
              <div className={cx('schedule-wrap')}>
                <h3>스케줄 목록</h3>
                <ul>
                  <li>거점 1</li>
                  <li>거점 1</li>
                  <li>거점 1</li>
                </ul>
              </div>
              <div className={cx('point-wrap')}>
                <h3>거점 목록</h3>
                <ul>
                  <li>거점 1</li>
                  <li>거점 1</li>
                  <li>거점 1</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className={cx('control-wrap')}>나는 control section</section>
      </div>
    </OperationContainer>
  </PageTemplate>
);

export default OperationPage;