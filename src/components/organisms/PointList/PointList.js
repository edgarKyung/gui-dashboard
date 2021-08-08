import React from 'react';
import classNames from 'classnames/bind';
import styles from './PointList.module.scss';
import { PageTitle, Button, Icon } from '../../atoms';

const cx = classNames.bind(styles);


const PointList = ({
  pointList, 
  onClickPoint
}) => (
  <div className={cx('point-wrap')}>
    <PageTitle 
      title={'거점 목록'} 
      className={cx('point-title')} 
    />
    <ul className={cx('point-list')}>
      {
        pointList.map((data, i) =>
          <li key={i}>
            <Button type='default' className={cx('point-button')} onClick={() => onClickPoint(data)}>
              {data.name}
              <Icon type='star' className={cx('on')}/>
            </Button> 
          </li>
        )
      }
    </ul>
  </div>
);

export default PointList;
