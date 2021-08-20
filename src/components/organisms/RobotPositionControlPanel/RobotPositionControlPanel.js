import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import classNames from 'classnames/bind';
import styles from './RobotPositionControlPanel.module.scss';
import { Button } from '../../atoms';

const cx = classNames.bind(styles);

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function useThrottle(callback, delay, args){
  const [active, setActive] = useState( false );
  const [arg, setArg] = useState(args);
  const savedCallback = useRef();
  savedCallback.current = callback;
  useEffect(() => {
    if (delay !== null && active) {
      let id = setInterval(savedCallback.current.bind(this, ...arg), delay);
      return () => clearInterval(id);
    }
  }, [delay, active, arg]);

  return [active, setActive, setArg];
}

const RobotPositionControlPanel = ({
  onMovePoint,
  onMoveRotation,
}) => {
  const positoins = ['up','right','down','left'];
  const rotations = ['pos','neg'];
  const [activeBg, setActiveBg] = useState(false);
  const [pointState, pointToggle, setPointArg ] = useThrottle(onMovePoint, 50);
  const [rotateState, rotateToggle, setRotateArg ] = useThrottle(onMoveRotation, 50);

  const handleClickPositionStart = (e, position) => {
    setPointArg([e, position]);
    pointToggle(true);
  };

  const handleClickPositionStop = (e) => {
    pointToggle(false);
  };

  const handleClickRotationStart = (e, rotation) => {
    setRotateArg([e, rotation]);
    rotateToggle(true);
  };

  const handleClickRotationStop = (e) => {
    rotateToggle(false);
  };


  return (
  <div className={cx('position-joy-stick-wrap')}>
    <ul className={cx('position-btn-wrap')}>
      {positoins.map(position => (
        <li className={cx(position)}>
          <Button type='position-control' className={cx('control-btn')} 
            onMouseDown={(e) => handleClickPositionStart(e, position)}
            onMouseUp={handleClickPositionStop}
            onMouseLeave={handleClickPositionStop}
          />
        </li>
      ))}
    </ul>
    <div className={cx('rotation-btn-bg-wrap')}>
      <ul className={cx('rotation-btn-wrap')}>
      {rotations.map(rotation => (
        <li className={cx('active')}>
          <Button type={`position-control-${rotation}`} 
            onMouseDown={(e) => {
              setActiveBg(true);
              handleClickRotationStart(e, rotation);
            }} 
            onMouseUp={(e) => {
              setActiveBg(false);
              handleClickRotationStop(e);
            }} 
            onMouseLeave={(e) => {
              setActiveBg(false);
              handleClickRotationStop(e);
            }}             
            className={cx('rotation-btn')}
          />
        </li>
      ))}
      </ul>
      <div className={cx('rotation-active-bg', {
        active: activeBg
      })}></div>
    </div>
  </div>
  );
};

// const RobotPositionControlPanel = () => (
//   <div className={cx('position-joy-stick-wrap')}>
//     <div className={cx('control-panel-wrap')}></div>
//   </div>
// );

export default RobotPositionControlPanel;
