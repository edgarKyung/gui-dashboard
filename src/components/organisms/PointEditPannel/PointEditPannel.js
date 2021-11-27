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
  onMovePoint,
  onMoveRotation,
  onChangeEditPoint,
}) => {
  const [editNameFlag, setEditNameFlag] = useState(false);
  const [editPositionFlag, setEditPositionFlag] = useState(true);
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

  const positions = [
    { title: 'X', key: 'x' },
    { title: 'Y', key: 'y' },
    { title: 'DEG', key: 'degree' },
  ];
  return (
    <div className={cx('point-edit-pannel-wrap', className)}>
      <div className={cx('edit-pannel-left')}>
        <div className={cx('point-edit-icon')}>
          {editNameFlag && (
            <>
              <input
                type="text" name="name" value={editPoint.name}
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    onChangeEditPoint(editPoint);
                    setEditNameFlag(false);
                  }
                }}
                onChange={(e) => handleChangePoint(e, 'name')}
              />
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
          {positions.map(({ title, key }, idx) => (
            <Position className={cx('point-pose')} key={idx}>
              <ul>
                <li key={key}>
                  <span>{title}</span>
                  {editPositionFlag && (
                    <input type="number" value={editPoint[key]} onChange={(e) => handleChangePoint(e, key)} onBlur={() => { onChangeEditPoint(editPoint) }} />
                  )}
                  {!editPositionFlag && <span>{selectedPoint[key]?.toFixed(2)}</span>}
                </li>
              </ul>
            </Position>
          ))}

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
