import React, {Component} from 'react';
import JoyStick from 'react-joystick';
import classNames from 'classnames/bind';
import styles from './RobotPositionJoyStick.scss';

const cx = classNames.bind(styles);

const joyOptions = {
  mode: 'static',
  position:{left:'50%', top:'50%'},
  catchDistance: 150,
  color: 'red',
  restOpacity:1,
  restJoystick:true,
  dynamicPage:true,
  size:150,
}

const containerStyle = {
  position: 'relative',
  width: '100%',
}


class JoyWrapper extends Component {
  constructor() {
      super();
      this.managerListener = this.managerListener.bind(this);
      this.state = {
        active:false
      }
  }

  managerListener(manager) {
      console.log(manager);
      const { onRobotMoveStart, onRobotMoveEnd } = this.props;
      manager.on('move', (e, stick) => {
          this.setState({ active:true });
          onRobotMoveStart(stick);
      })
      manager.on('end', () => {
          this.setState({ active:false });
          onRobotMoveEnd();
      })
  }

  render() {
      const { className } = this.props;
      const { active } = this.state;
      return (
        <div className={cx('robot-position-control-wrap', className, {
          'active': active,
        })}>
          <JoyStick options={joyOptions} containerStyle={containerStyle} managerListener={this.managerListener}/>
        </div>
      )
  }
}
export default JoyWrapper;
