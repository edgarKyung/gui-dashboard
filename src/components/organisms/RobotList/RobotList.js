import React from 'react';
import classNames from 'classnames/bind';
import styles from './RobotList.module.scss';
const cx = classNames.bind(styles);

const RobotList = ({ 
  robots,
  onClickRobot,
}) => {
  return (
  <div className={cx('robot-list-wrap')}>
    <ul className={cx('robot-list-header')}>
      <li>이름</li>
      <li>상태</li>
      <li>IP</li>
      <li>위치</li>
    </ul>
    <ul className={cx('robot-list-content')}>
      {robots.map((robot, index) => {
        const { status: { pose } } = robot;
        return(
        <li key={index} data-index={index} onClick={onClickRobot.bind(this, index)}>
          <div>{robot.name}</div>
          <div>ON</div>
          <div>{robot.ip}</div>
          <div>[ {pose.x.toFixed(2)}, {pose.y.toFixed(2)} ]</div>
        </li>)
      })}
    </ul>
  </div>
  )
};

RobotList.defaultProps = {
  robots : [],
  onClickRobot: () => { console.log('onClickRobot is not defined'); },
};


export default React.memo(RobotList);