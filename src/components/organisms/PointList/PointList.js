import React from 'react';
import classNames from 'classnames/bind';
import styles from './PointList.module.scss';
import { PageTitle, Button, Icon } from '../../atoms';

const cx = classNames.bind(styles);

const pointList = ['거점1', '거점2', '거점3', '거점4','거점1', '거점2', '거점3', '거점4','거점1', '거점2', '거점3', '거점2', '거점3', '거점2', '거점3', '거점2', '거점3', '거점2', '거점3'];

const PointList = ({list = pointList}) => (
  <div className={cx('point-wrap')}>
    <PageTitle 
      title={'거점 목록'} 
      className={cx('point-title')} 
    />
    <ul className={cx('point-list')}>
      {
        list.map((data, i) =>
          <li key={i}>
            <Button type='default' className={cx('point-button')}>
              {data}
              <Icon type='star' className={cx('on')}/>
            </Button> 
          </li>
        )
      }
    </ul>
  </div>
);

export default PointList;
