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
      manager.on('move', (e, stick) => {
          console.log('I moved!');
          console.log('event', e);
          console.log('stick', stick);
          this.setState({ active:true });
      })
      manager.on('end', () => {
          console.log('I ended!')
          this.setState({ active:false });
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
