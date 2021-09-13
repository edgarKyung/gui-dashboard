import React, { useState, Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { OperationPage } from '../components/pages';
import * as RobotApi from '../lib/Robot';
import * as FileApi from '../lib/File';
import { addSchedule, shiftSchedule } from '../modules/reducers/schedule';
import { loadPoint } from '../modules/reducers/point';

const OperationContainer = ({ children }) => {
  const dispatch = useDispatch();
  const [activeBtn, setActiveBtn] = useState('');
  const [points, setPoints] = useState([]);
  const {
    pointMarkList,
    pointList,
    scheduleList,
  } = useSelector((store) => ({
    pointMarkList: store.point.get('points').filter(point => point.favorite),
    pointList: store.point.get('points').filter(point => !point.favorite),
    scheduleList: store.schedule.get('schedules'),
  }));

  console.log('scheduleList', scheduleList);
  useEffect(async () => {
    const loadPoints = await FileApi.loadWayPoint();
    console.log('loadPoints', loadPoints);
    dispatch(loadPoint(loadPoints));
  }, []);

  useEffect(async () => {
    if (scheduleList.length) {
      const target = scheduleList[0];
      const screenPos = {
        x: FileApi.realXToScreen(target.real.x),
        y: FileApi.realYToScreen(target.real.y),
        degree: target.degree
      };
      setPoints([screenPos]);
    } else {
      setPoints([]);
    }
  }, [scheduleList.length])

  const handleClickPoint = async (point) => {
    try {
      dispatch(addSchedule(point));
      console.log(point);
      // await RobotApi.move(point);
    } catch (err) {
      console.error(err)
    }
  }

  const handleClickRobotControl = async (type) => {
    try {
      if (type === 'start') {
        setActiveBtn('');
        console.log(JSON.stringify(scheduleList[0]));
        await RobotApi.move(scheduleList[0]);
        console.log(JSON.stringify(scheduleList[0]));
        setActiveBtn(type);
        return;
      }

      if (type === 'stop') {
        if (scheduleList.length > 0) {
          dispatch(shiftSchedule());
        }
      }

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
        scheduleList={scheduleList}
        points={points}
      />
    </Fragment>
  )
}

export default OperationContainer;