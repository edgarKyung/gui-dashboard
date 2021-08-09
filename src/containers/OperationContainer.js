import React, { Fragment } from 'react';
import { OperationPage } from '../components/pages';
import * as RobotApi from '../lib/Robot';

const OperationContainer = ({ children }) => {

  const pointList = [
    { name: '거점 1', x: 1.3443, y: -2.1123, degree: 3.14159 },
    { name: '거점 2', x: 1.3443, y: -2.1123, degree: 3.14159 },
    { name: '거점 3', x: 1.3443, y: -2.1123, degree: 3.14159 },
    { name: '거점 4', x: 1.3443, y: -2.1123, degree: 3.14159 },
    { name: '거점 5', x: 1.3443, y: -2.1123, degree: 3.14159 },
    { name: '거점 6', x: 1.3443, y: -2.1123, degree: 3.14159 },
    { name: '거점 7', x: 1.3443, y: -2.1123, degree: 3.14159 },
    { name: '거점 8', x: 1.3443, y: -2.1123, degree: 3.14159 },
    { name: '거점 9', x: 1.3443, y: -2.1123, degree: 3.14159 },
    { name: '거점 10', x: 1.3443, y: -2.1123, degree: 3.14159 },
  ]

  const handleClickPoint = async (point) => {
    try {
      console.log(point);
      await RobotApi.setGoal(point);
    } catch (err) {
      console.error(err)
    }
  }

  // [TODO: 리팩토링]
  // 터치중일 경우 주기적으로 명령 전송
  // velocity : 속도 m/s (최대값 : 0.75)
  // angle : -PI ~ PI 범위의 값, 직진일때 0, 오른손법칙에 따라 좌회전방향이 양수
  let sendRequestFlag = false;
  let velocity = 0;
  let angle = 0;

  async function requestMoveControl(ms) {
    setTimeout(async () => {
      try {
        await RobotApi.moveControl({ velocity: velocity, angle: angle });
      } catch (ex) {
        console.error(ex);
      } finally {
        if (sendRequestFlag === true) {
          requestMoveControl(ms);
        }
      }
    }, ms);
  }

  const handleRobotMoveStart = async (point) => {
    try {
      if (sendRequestFlag === false) {
        sendRequestFlag = true;
        requestMoveControl(30);
      }
      velocity = point.distance / 100;
      angle = point.angle.radian - Math.PI / 2;
      angle = angle < 0 ? angle + 2 * Math.PI : angle;
      angle = angle > Math.PI ? angle - 2 * Math.PI : angle;
    } catch (err) {
      console.error(err)
    }
  }

  const handleRobotMoveEnd = async (point) => {
    try {
      velocity = 0;
      angle = 0;
      sendRequestFlag = false;
      requestMoveControl(100);
    } catch (err) {
      console.error(err)
    }
  }

  const handleClickRobotControl = (type) => {
    try {
      const data = {};
      RobotApi.robotControl(type, data);
    } catch (err) {
      console.error(err);
    }
  }

  console.log(pointList);
  return (
    <Fragment>
      <OperationPage
        pointList={pointList}
        onClickPoint={handleClickPoint}
        onClickRobotControl={handleClickRobotControl}
        onRobotMoveStart={handleRobotMoveStart}
        onRobotMoveEnd={handleRobotMoveEnd}
      />
    </Fragment>
  )
}

export default OperationContainer;