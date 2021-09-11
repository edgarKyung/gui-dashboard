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
  const [fakeUpdate, setFakeUpdate] = useState(true);
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

  useEffect(() => {
    console.log(scheduleList.length);
    if (scheduleList.length) {
      setPoints([scheduleList[0]]);
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