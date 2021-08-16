import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './RobotPositionControlPanel.module.scss';
import { Button } from '../../atoms';

const cx = classNames.bind(styles);

const RobotPositionControlPanel = ({
  onClick
}) => {
  const positoins = ['up','right','down','left'];
  const rotations = ['pos','neg'];
  const [activeBg, setActiveBg] = useState(false);
  return (
  <div className={cx('position-joy-stick-wrap')}>
    <ul className={cx('position-btn-wrap')}>
      {positoins.map(position => (
        <li className={cx(position)}>
          <Button type='position-control' className={cx('control-btn')}/>
        </li>
      ))}
    </ul>
    <div className={cx('rotation-btn-bg-wrap')}>
      <ul className={cx('rotation-btn-wrap')}>
      {rotations.map(rotation => (
        <li className={cx('active')}>
          <Button type={`position-control-${rotation}`} 
            onMouseDown={setActiveBg.bind(this, true)} 
            onMouseUp={setActiveBg.bind(this, false)} 
            onClick={onClick} 
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
