import React, { useState, Fragment } from 'react';
import { OperationPage } from '../components/pages';
import * as RobotApi from '../lib/Robot';

const OperationContainer = ({ children }) => {
  const [activeBtn, setActiveBtn] = useState('');
  const pointMarkList = [
    { name: '거점 11', x: 1.3443, y: -2.1123, degree: 3.14159 },
    { name: '거점 12', x: 1.3443, y: -2.1123, degree: 3.14159 },
    { name: '거점 13', x: 1.3443, y: -2.1123, degree: 3.14159 },
  ];

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
  // 터치 종료 시점에 0,0 전송 (0,0이 마지막 전송이어야 됨)
  // velocity_linear : 속도 m/s (최댓값: 0.75, 최솟값: -0.75)
  // velocity_angular : 각속도 rad/s (최댓값: 0.75, 최솟값: -0.75) : 오른손법칙에 따라 좌회전 방향이 양수
  let sendRequestFlag = false;
  let velocity_linear = 0;
  let velocity_angular = 0;

  async function requestMoveControl(ms) {
    setTimeout(async () => {
      try {
        await RobotApi.moveControl({ linear: velocity_linear, angular: velocity_angular });
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
      let angle = point.angle.radian - Math.PI / 2;
      angle = angle < 0 ? angle + 2 * Math.PI : angle;
      angle = angle > Math.PI ? angle - 2 * Math.PI : angle;

      velocity_linear = point.distance / 100 * Math.cos(angle);
      velocity_angular = point.distance / 100 * Math.sin(angle);

    } catch (err) {
      console.error(err)
    }
  }

  const handleRobotMoveEnd = async (point) => {
    try {
      velocity_linear = 0;
      velocity_angular = 0;
      sendRequestFlag = false;
      requestMoveControl(100);
    } catch (err) {
      console.error(err)
    }
  }

  const handleClickRobotControl =  async (type) => {
    try {
      const data = {};
      setActiveBtn('');
      await RobotApi.robotControl(type, data);
      setActiveBtn(type);
    } catch (err) {
      setActiveBtn('');
      console.error(err);
    }
  }

  return (
    <Fragment>
      <OperationPage
        pointMarkList={pointMarkList}
        pointList={pointList}
        onClickPoint={handleClickPoint}
        onClickRobotControl={handleClickRobotControl}
        onRobotMoveStart={handleRobotMoveStart}
        onRobotMoveEnd={handleRobotMoveEnd}
        activeBtn={activeBtn}
      />
    </Fragment>
  )
}

export default OperationContainer;