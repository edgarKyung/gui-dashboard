import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames/bind';
import styles from './PointEditPannel.module.scss';
import { Button, PointIcon, Position } from '../../atoms';
import { RobotPositionControlPanel } from '../../organisms';

const cx = classNames.bind(styles);

const PointEditPannel = ({
  className,
  selectedPoint,
  onClickClose,
  onClickMovePoint,
  onClickRotationPoint,
}) => {
  return (
  <div className={cx('point-edit-pannel-wrap', className)}>
    <div className={cx('point-edit-header')}><Button type='circle' onClick={onClickClose}>X</Button></div>
    <div className={cx('point-edit-icon')}>
      <PointIcon />
      {selectedPoint.name} {selectedPoint.id}
    </div>
    <div className={cx('point-pose-wrap')}>
      <Position className={cx('point-pose')}>
        <ul>
          <li>X {selectedPoint.x}</li>
          <li>Y {selectedPoint.y}</li>
        </ul>
      </Position>
      <Position className={cx('point-pose')}>
        <ul>
          <li>{selectedPoint.degree} degree</li>
        </ul>
      </Position>
    </div>
    <div className={cx('point-control-wrap')}>
      <h3>Contoller</h3>
      <RobotPositionControlPanel 
        onClickMovePoint={onClickMovePoint}
        onClickRotationPoint={onClickRotationPoint}
      />
    </div>
  </div>
  )
};
export default PointEditPannel;
