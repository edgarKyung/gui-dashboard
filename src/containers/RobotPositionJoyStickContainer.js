import React, { useCallback } from 'react';
import * as RobotApi from '../lib/Robot';
import { RobotPositionJoyStick } from '../components/organisms';

const RobotPositionJoyStickContainer = ({
  className
}) => {
  let sendRequestFlag = false;
  let velocity_linear = 0;
  let velocity_angular = 0;

  async function requestMoveControl(ms) {
    setTimeout(async () => {
      try {
        await RobotApi.jog({ linear: velocity_linear, angular: velocity_angular });
      } catch (ex) {
        console.error(ex);
      } finally {
        if (sendRequestFlag === true) {
          requestMoveControl(ms);
        }
      }
    }, ms);
  }

  const handleRobotMoveStart = useCallback(async (point) => {
    try {
      if (sendRequestFlag === false) {
        sendRequestFlag = true;
        requestMoveControl(30);
      }
      let angle = point.angle.radian - Math.PI / 2;
      angle = angle < 0 ? angle + 2 * Math.PI : angle;
      angle = angle > Math.PI ? angle - 2 * Math.PI : angle;

      velocity_linear = point.distance / 100 * Math.cos(angle) * 0.75;
      velocity_angular = point.distance / 100 * Math.sin(angle) * 1.5;

    } catch (err) {
      console.error(err)
    }
  }, []);

  const handleRobotMoveEnd = useCallback(async (point) => {
    try {
      velocity_linear = 0;
      velocity_angular = 0;
      sendRequestFlag = false;
      requestMoveControl(100);
    } catch (err) {
      console.error(err)
    }
  }, []);

  return (
    <RobotPositionJoyStick
      className={className}
      onRobotMoveStart={handleRobotMoveStart}
      onRobotMoveEnd={handleRobotMoveEnd}
    />
  )
}

export default React.memo(RobotPositionJoyStickContainer);