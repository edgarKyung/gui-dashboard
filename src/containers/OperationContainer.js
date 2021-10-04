import React, { useState, Fragment, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { OperationPage } from '../components/pages';
import * as RobotApi from '../lib/Robot';
import * as FileApi from '../lib/File';
import { addSchedule, shiftSchedule } from '../modules/reducers/schedule';
import { loadPoint } from '../modules/reducers/point';

let poseChecker = null;

const OperationContainer = ({ children }) => {
  const dispatch = useDispatch();
  const viewportRef = useRef();
  const [activeBtn, setActiveBtn] = useState('');
  const [points, setPoints] = useState([]);
  const [isModeSelect, setIsModeSelect] = useState(false);
  const {
    pointMarkList,
    pointList,
    scheduleList,
  } = useSelector((store) => ({
    pointMarkList: store.point.get('points').filter(point => point.favorite),
    pointList: store.point.get('points').filter(point => !point.favorite),
    scheduleList: store.schedule.get('schedules'),
  }));

  async function checkPose() {
    const pose = await RobotApi.getPose();
    const newPoints = [];
    const prepareToFocus = Object.keys(FileApi.opMap).length;
    if(!prepareToFocus) return false;
    if (pose) {
      newPoints.push({
        x: FileApi.realXToScreen(pose.x),
        y: FileApi.realYToScreen(pose.y),
        degree: -pose.rz * 180 / Math.PI + 90
      });
    }
    if (scheduleList.length) {
      const target = scheduleList[0];
      newPoints.push({
        id: target.id,
        x: FileApi.realXToScreen(target.real.x),
        y: FileApi.realYToScreen(target.real.y),
        degree: target.degree
      });
    }
    setPoints(newPoints);

    if (scheduleList.length > 1) {
      const target = JSON.parse(JSON.stringify(scheduleList[0]));
      if (Math.abs(target.real.x - pose.x) < 0.5 && Math.abs(target.real.y - pose.y) < 0.5) {
        console.log(new Date(), target.real.x.toFixed(2), pose.x.toFixed(2), target.real.y.toFixed(2), pose.y.toFixed(2));
        const next = JSON.parse(JSON.stringify(scheduleList[1]));
        dispatch(shiftSchedule());
        await RobotApi.move(next);
      }
    }
  }

  const focusPoint = (point) => {
    const viewport = viewportRef.current;
    const { screenWidth, screenHeight } = viewport.options;
    viewport.snapZoom({ width: screenWidth / 3, height: screenHeight / 3, removeOnComplete: true });
    viewport.snap(point.x, point.y, { removeOnComplete: true });
  };

  useEffect(() => {
    if(points.length) focusPoint(points[0]);
  }, [points.length]);

  useEffect(() => {
    const loadWayPoint = async () => {
      const loadPoints = await FileApi.loadWayPoint();
      dispatch(loadPoint(loadPoints));
    }
    loadWayPoint();

    if (poseChecker) clearInterval(poseChecker);
    poseChecker = setInterval(checkPose, 50);

    return () => { }
  }, []);

  // useEffect(async () => {
  //   if (scheduleList.length) {
  //     const target = scheduleList[0];
  //     const screenPos = {
  //       id: target.id,
  //       x: FileApi.realXToScreen(target.real.x),
  //       y: FileApi.realYToScreen(target.real.y),
  //       degree: target.degree
  //     };
  //     setPoints([screenPos]);
  //   } else {
  //     setPoints([]);
  //   }
  // }, [scheduleList.length])

  const handleClickMode = async () => {
    setIsModeSelect(!isModeSelect);
  }

  const handleClickBattery = async () => {
    try {
      await RobotApi.charge();
    } catch (err) {
      console.error(err)
    }
  }

  const handleClickPoint = async (point) => {
    try {
      dispatch(addSchedule(point));
      // console.log(point);
      // await RobotApi.move(point);
    } catch (err) {
      console.error(err)
    }
  }

  const handleClickRobotControl = async (type) => {
    try {
      if (type === 'start') {
        setActiveBtn('');
        await RobotApi.move(scheduleList[0]);
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
        isModeSelect={isModeSelect}
        onClickMode={handleClickMode}
        viewportRef={viewportRef}
      />
    </Fragment>
  )
}

export default OperationContainer;