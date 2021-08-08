import React, {Fragment} from 'react';
import { OperationPage } from '../components/pages';
import * as RobotApi from '../lib/Robot';

const OperationContainer = ({children}) => {

  const point = {
    name:'거점 1',
    x:100,
    y:200,
    degree:0
  };
  const pointList = [
    point,
    point,
    point,
    point,
    point,
    point,
  ]

  const handleClickPoint = async (point) => {
    try{
      console.log(point);
      await RobotApi.setPoint(point);
    } catch (err) {
      console.error(err)
    }
  }

  const handleRobotMoveStart = async (point) => {
    try{
      console.log(point);
      // await RobotApi.setPoint(point);
    } catch (err) {
      console.error(err)
    }
  }

  const handleRobotMoveEnd = async (point) => {
    try{
      console.log(point);
      // await RobotApi.setPoint(point);
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