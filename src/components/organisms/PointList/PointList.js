import React, { useCallback } from 'react';
import classNames from 'classnames/bind';
import styles from './PointList.module.scss';
import { PageTitle, Button, Icon } from '../../atoms';

const cx = classNames.bind(styles);

const Point = React.memo(({ data, onClickPoint, activeStar }) => {
  const onClickPointFn = useCallback(() => {
    onClickPoint(data);
  }, [data]);
  return (
    <li>
      <Button type='default' className={cx('point-button')} onClick={onClickPointFn}>
        {data.name}
        <Icon type='star' className={cx({ 'on': activeStar })} />
      </Button>
    </li>
  );
});

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
        pointMarkList && (pointMarkList.map((data, i) => <Point key={i} data={data} onClickPoint={onClickPoint} activeStar={true} />))
      }
    </ul>
    <ul className={cx('point-list')}>
      {
        pointList.map((data, i) => <Point key={i} data={data} onClickPoint={onClickPoint} activeStar={false} />)
      }
    </ul>
  </div>
);


export default React.memo(PointList);
