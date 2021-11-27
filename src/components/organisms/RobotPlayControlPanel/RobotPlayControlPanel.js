import React from 'react';
import classNames from 'classnames/bind';
import styles from './RobotPlayControlPanel.module.scss';
import { Button } from '../../atoms';

const cx = classNames.bind(styles);

const RobotPlayControlPanel = ({
  state,
  mode,
  onClickRobotControl,
  activeBtn,
  isModeSelect
}) => {
  return (
    <>
      {!isModeSelect
        ? <div>
          <ul className={cx('robot-play-control-wrap')}>
            <li><Button type='stop' active={state === 'stop'} className={cx('button')} onClick={() => onClickRobotControl('stop')} /></li>
            <li><Button type='start' active={state === 'start'} className={cx('button')} onClick={() => onClickRobotControl('start')} /></li>
            <li><Button type='pause' active={state === 'pause'} className={cx('button')} onClick={() => onClickRobotControl('pause')} /></li>
          </ul>
        </div>
        : <div>
          <ul className={cx('robot-play-control-wrap')}>
            <li><Button type='people' active={mode === 'people'} className={cx('button')} onClick={() => onClickRobotControl('people')} /></li>
            <li><Button type='line' active={mode === 'line'} className={cx('button')} onClick={() => onClickRobotControl('line')} /></li>
            <li><Button type='navigation' active={mode === 'navigation'} className={cx('button')} onClick={() => onClickRobotControl('navigation')} /></li>
          </ul>
          <ul className={cx('robot-play-control-wrap')}>
            <li><Button type='move_forward' active={activeBtn === 'move_forward'} className={cx('button')} onClick={() => onClickRobotControl('move_forward')} /></li>
            <li><Button type='move_backward' active={activeBtn === 'move_backward'} className={cx('button')} onClick={() => onClickRobotControl('move_backward')} /></li>
            <li><Button type='move_stop' active={activeBtn === 'move_stop'} className={cx('button')} onClick={() => onClickRobotControl('move_stop')} /></li>
          </ul>
        </div>
      }
    </>
  );
};

export default React.memo(RobotPlayControlPanel);
