import React from 'react';
import classNames from 'classnames/bind';
import styles from './PointList.module.scss';
import { PageTitle, Button, Icon } from '../../atoms';

const cx = classNames.bind(styles);


const PointList = ({
  className,
  pointMarkList, 
  pointList, 
  onClickPoint
}) => (
  <div className={cx('point-wrap', className)}>
    <PageTitle 
      title={'거점 목록'} 
      className={cx('point-title')} 
    />
    <ul className={cx('point-mark-list')}>
      {
        pointMarkList && (pointMarkList.map((data, i) =>
          <li key={i}>
            <Button type='default' className={cx('point-button')} onClick={onClickPoint.bind(this, data)}>
              {data.name}
              <Icon type='star' className={cx('on')}/>
            </Button> 
          </li>
        ))
      }
    </ul>
    <ul className={cx('point-list')}>
      {
        pointList.map((data, i) =>
          <li key={i}>
            <Button type='default' className={cx('point-button')} onClick={onClickPoint.bind(this, data)}>
              {data.name}
            </Button> 
          </li>
        )
      }
    </ul>
  </div>
);

export default PointList;
