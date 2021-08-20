import React from 'react';
import classNames from 'classnames/bind';
import styles from './ScheduleList.module.scss';
import { PageTitle, Button } from '../../atoms';

const cx = classNames.bind(styles);

// const scheduleList = ['거점1', '거점2', '거점3', '거점4'];
const scheduleList = [];

const ScheduleList = ({ list = scheduleList, className }) => (
  <div className={cx('schedule-wrap', className)}>
    <PageTitle
      title={'스케줄 목록'}
      className={cx('schedule-title')}
    />
    <ul className={cx('schedule-list')}>
      {
        list.map((data, i) =>
          <li key={i}>
            <Button type='gradiant-col' className={cx('schedule-btn')}>
              {data}
            </Button>
            {/* <ScheduleItem key={i} item={data} /> */}
          </li>
        )
      }
    </ul>
  </div>
);

export default ScheduleList;
