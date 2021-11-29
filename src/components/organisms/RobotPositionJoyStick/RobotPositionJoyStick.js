import React, { useState } from 'react';
import PropTypes from 'prop-types'
import JoyStick from 'react-joystick';
import classNames from 'classnames/bind';
import styles from './RobotPositionJoyStick.scss';

const cx = classNames.bind(styles);

const joyOptions = {
  mode: 'static',
  position: { left: '50%', top: '50%' },
  catchDistance: 150,
  color: 'red',
  restOpacity: 1,
  restJoystick: true,
  dynamicPage: true,
  size: 150,
}

const containerStyle = {
  position: 'relative',
  width: '100%',
  zIndex: 1,
}


const JoyWrapper = ({
  className,
  onRobotMoveStart,
  onRobotMoveEnd
}) => {
  const [active, setActive] = useState(false);

  const managerListener = (manager) => {
    console.log(manager);
    manager.on('move', (e, stick) => {
      setActive(true);
      onRobotMoveStart(stick);
    })
    manager.on('end', () => {
      setActive(false);
      onRobotMoveEnd();
    })
  }

  return (
    <div className={cx('robot-position-control-wrap', className, {
      'active': active,
    })}>
      <JoyStick options={joyOptions} containerStyle={containerStyle} managerListener={managerListener} />
    </div>
  )
}

JoyWrapper.propTypes = {
  className: PropTypes.string,
  onRobotMoveStart: PropTypes.func,
  onRobotMoveEnd: PropTypes.func,
}

JoyWrapper.defaultProps = {
  onRobotMoveStart: () => { },
  onRobotMoveEnd: () => { },
}
export default React.memo(JoyWrapper);
