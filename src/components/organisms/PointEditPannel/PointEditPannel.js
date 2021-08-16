import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames/bind';
import styles from './PointEditPannel.module.scss';
import { Button, PointIcon, Position } from '../../atoms';
import { RobotPositionControlPanel } from '../../organisms';

const cx = classNames.bind(styles);

const PointEditPannel = ({
  className,
  editPointId,
  onClickClose,
}) => {

  const { editPoint } = useSelector((store) => ({
    editPoint:store.point.get('points').filter(data => data.id === editPointId)[0]
  }));
  console.log(editPoint);

  return (
  <div className={cx('point-edit-pannel-wrap', className)}>
    <div className={cx('point-edit-header')}><Button type='circle' onClick={onClickClose}>X</Button></div>
    <div className={cx('point-edit-icon')}>
      <PointIcon />
      {editPoint.name} {editPoint.id}
    </div>
    <div className={cx('point-pose-wrap')}>
      <Position className={cx('point-pose')}>
        <ul>
          <li>X {editPoint.x}</li>
          <li>Y {editPoint.y}</li>
        </ul>
      </Position>
      <Position className={cx('point-pose')}>
        <ul>
          <li>{editPoint.degree} degree</li>
        </ul>
      </Position>
    </div>
    <div className={cx('point-control-wrap')}>
      <h3>Contoller</h3>
      <RobotPositionControlPanel />
    </div>
    {/* <div className={cx('btn-wrap')}>
      <Button type='default' onClick={onClickClose}>취소</Button>
      <Button type='gradiant-col' onClick={onClickPointApply}>적용</Button>
    </div> */}

  </div>
  )
};
export default PointEditPannel;
