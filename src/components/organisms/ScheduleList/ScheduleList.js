import React from 'react';
import classNames from 'classnames/bind';
import styles from './ScheduleList.module.scss';
import { PageTitle, Button } from '../../atoms';

const cx = classNames.bind(styles);

const ScheduleList = ({
  scheduleList,
  className
}) => (
  <div className={cx('schedule-wrap', className)}>
    <PageTitle
      title={'스케줄 목록'}
      className={cx('schedule-title')}
    />
    <ul className={cx('schedule-list')}>
      {
        scheduleList && scheduleList.map((data, i) =>
          <li key={i}>
            <Button type={i === 0 ? 'gradiant-col' : 'grey'} className={cx('schedule-btn')}>
              {data.name}
            </Button>
            {/* <ScheduleItem key={i} item={data} /> */}
          </li>
        )
      }
    </ul>
  </div>
);

ScheduleList.defaultProps = {
  scheduleList: [],
};

export default ScheduleList;
