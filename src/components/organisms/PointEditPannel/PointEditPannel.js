import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import classNames from 'classnames/bind';
import styles from './PointEditPannel.module.scss';
import { Button, PointIcon, Position } from '../../atoms';
import { RobotPositionControlPanel } from '../../organisms';

const cx = classNames.bind(styles);

const PointEditPannel = ({
  className,
  selectedPoint,
  onClickClose,
  onMovePoint,
  onMoveRotation,
  onChangeEditPoint,
}) => {
  const [editNameFlag, setEditNameFlag] = useState(false);
  const [editPositionFlag, setEditPositionFlag] = useState(false);
  const [editPoint, setEditPoint] = useState(selectedPoint);

  const handleChangePoint = (event, type) => {
    const newPose = _.cloneDeep(selectedPoint);
    const value = event.target.value;
    newPose[type] = type !== 'name' ? Number(value) : value;
    setEditPoint(newPose);
  };

  useEffect(() => {
    setEditPoint(selectedPoint);
  }, [selectedPoint]);

  const positions = ['x', 'y'];
  return (
    <div className={cx('point-edit-pannel-wrap', className)}>
      <div className={cx('edit-pannel-left')}>
        <div className={cx('point-edit-icon')}>
          {editNameFlag && (
            <>
              <input type="text" name="name" value={editPoint.name} onChange={(e) => handleChangePoint(e, 'name')} />
              <Button type="edit" onClick={() => {
                onChangeEditPoint(editPoint);
                setEditNameFlag(false);
              }} />
            </>
          )}
          {!editNameFlag && (
            <>
              <span>{selectedPoint.name}</span>
              <Button type="edit" onClick={() => setEditNameFlag(true)} />
            </>
          )}

        </div>
        <div className={cx('point-pose-wrap')}>
          {positions.map(position => (
            <Position className={cx('point-pose')}>
              <ul>
                <li key={position}>
                  <span>{position.toUpperCase()}</span>
                  {editPositionFlag && (
                    <input type="number" value={editPoint[position]} onChange={(e) => handleChangePoint(e, position)} />
                  )}
                  {!editPositionFlag && <span>{selectedPoint[position]?.toFixed(2)}</span>}
                </li>
              </ul>
            </Position>
          ))}
          <Position className={cx('point-pose')}>
            <ul>
              <li>
                {editPositionFlag && (
                  <input type="number" value={editPoint.degree} onChange={(e) => handleChangePoint(e, 'degree')} />
                )}
                {!editPositionFlag && <span>{selectedPoint.degree}</span>}
                degree
              </li>
            </ul>
          </Position>
          <div>
            {/* <Button type="edit" onClick={() => {
              if (editPositionFlag) {
                onChangeEditPoint(editPoint);
                setEditPositionFlag(false);
              } else {
                setEditPositionFlag(true);
              }
            }} /> */}
          </div>
        </div>
      </div>
      <div className={cx('edit-pannel-right')}>
        <RobotPositionControlPanel
          className={cx('edit-pannel')}
          onMovePoint={onMovePoint}
          onMoveRotation={onMoveRotation}
        />
      </div>
    </div>
  )
};

PointEditPannel.defaultProps = {
  selectedPoint: {},
};

export default PointEditPannel;
