import React, { useState, Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { OperationPage } from '../components/pages';
import * as RobotApi from '../lib/Robot';

const OperationContainer = ({ children }) => {
  const [activeBtn, setActiveBtn] = useState('');
  const [fakeUpdate, setFakeUpdate] = useState(true);
  const { 
    pointMarkList, 
    pointList, 
  } = useSelector((store) => ({
    pointMarkList:store.point.get('points').filter(point => point.favorite),
    pointList : store.point.get('points').filter(point => !point.favoritePoints),
  }));

  // TODO: 비동기 처리 어떻게 해야함?
  // (async function getWaypoint() {
  //   const waypoints = await RobotApi.getWaypoint();
  //   const tempMarkPoints = [];
  //   const tempPoints = [];
  //   for (let waypoint of waypoints) {
  //     if (waypoint.disabled === false) {
  //       (waypoint.favorite) ? tempMarkPoints.push(waypoint) : tempPoints.push(waypoint);
  //     }
  //   }
  //   if (JSON.stringify(tempMarkPoints) !== JSON.stringify(pointMarkList) ||
  //     JSON.stringify(tempPoints) !== JSON.stringify(pointList)) {
  //     pointMarkList = tempMarkPoints;
  //     pointList = tempPoints;
  //     setFakeUpdate(!fakeUpdate);
  //   }
  // })();

  const handleClickPoint = async (point) => {
    try {
      console.log(point);
      await RobotApi.move(point);
    } catch (err) {
      console.error(err)
    }
  }

  const handleClickRobotControl = async (type) => {
    try {
      setActiveBtn('');
      await RobotApi.changeMode(type);
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
        activeBtn={activeBtn}
      />
    </Fragment>
  )
}

export default OperationContainer;