import React, { useState, Fragment, useEffect, useRef, useCallback, useMemo } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
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
    loadCanvas,
    status,
    mode,
    state,
  } = useSelector((store) => ({
    pointMarkList: store.point.get('points').filter(point => point.favorite),
    pointList: store.point.get('points').filter(point => !point.favorite),
    scheduleList: store.schedule.get('schedules'),
    loadCanvas: store.common.get('loadCanvas'),
    status: store.monitoringData.getIn(['status', 'status']),
    mode: store.monitoringData.getIn(['status', 'mode']),
    state: store.monitoringData.getIn(['status', 'state']),
  }), shallowEqual);
  async function checkPose() {
    const pose = await RobotApi.getPose();
    const newPoints = [];
    const prepareToFocus = Object.keys(FileApi.opMap).length;
    if (!prepareToFocus) return false;
    if (pose) {
      newPoints.push({
        x: FileApi.realXToScreen(pose.x),
        y: FileApi.realYToScreen(pose.y),
        degree: -pose.rz * 180 / Math.PI + 90
      });
    }
    setPoints(newPoints);

    if (scheduleList.length > 1) {
      const target = JSON.parse(JSON.stringify(scheduleList[0]));
      // console.log(
      //   [target.real.x, pose.x, pose.x - target.real.x],
      //   [target.real.y, pose.y, pose.y - target.real.y],
      //   [target.real.degree, pose.rz, pose.rz - target.real.degree]
      // );
      if (
        Math.abs(target.real.x - pose.x) < 0.5
        && Math.abs(target.real.y - pose.y) < 0.5
        && (Math.abs((target.real.degree - pose.rz) % 6.28) < 0.15 || Math.abs((target.real.degree - pose.rz) % 6.28) > 6.13)
      ) {
        console.log(new Date(), target.real.x.toFixed(2), pose.x.toFixed(2), target.real.y.toFixed(2), pose.y.toFixed(2));
        const next = JSON.parse(JSON.stringify(scheduleList[1]));
        dispatch(shiftSchedule());
        await RobotApi.move(next);
      }
    }

    if (scheduleList.length === 2) {
      scheduleList.push(scheduleList[0]);
      scheduleList.push(scheduleList[1]);
    }
  }

  const focusPoint = (point) => {
    console.log('focusPoint', point)
    const viewport = viewportRef.current;
    const wrapperContainer = viewport.children[0];
    const { screenWidth, screenHeight } = viewport.options;
    const zoomRate = FileApi.opMap.scale * 0.3;
    console.log('FileApi', FileApi.opMap.scale);
    console.log('zoomRate', zoomRate);
    const { x: scaleX, y: scaleY } = wrapperContainer.scale;
    const [marginX, marginY] = [(viewport.options.screenWidth - viewport.width) / 2, (viewport.options.screenHeight - viewport.height) / 2]
    viewport.snap((point.x * scaleX) + marginX, (point.y * scaleY) + marginY, { removeOnComplete: true });
    viewport.snapZoom({ width: screenWidth * zoomRate, height: screenHeight * zoomRate, removeOnComplete: true });
  };

  useEffect(() => {
    console.log(loadCanvas, points);
    if (loadCanvas && points.length) {
      focusPoint(points[0]);
    };
  }, [loadCanvas, points.length]);

  useEffect(() => {
    const loadWayPoint = async () => {
      const loadPoints = await FileApi.loadWayPoint();
      dispatch(loadPoint(loadPoints));
    }
    loadWayPoint();

    poseChecker = setInterval(checkPose, 100);
    return () => {
      clearInterval(poseChecker)
    }
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

  const handleClickMode = useCallback(async () => {
    setIsModeSelect(!isModeSelect);
  }, [isModeSelect]);


  const handleClickPoint = useCallback((point) => {
    try {
      dispatch(addSchedule(point));
      // console.log(point);
      // await RobotApi.move(point);
    } catch (err) {
      console.error(err)
    }
  }, []);

  const handleClickRobotControl = useCallback(async (type) => {
    try {
      if (type === 'start') {
        setActiveBtn('');
        await RobotApi.move(scheduleList[0]);
        setActiveBtn(type);
        return;
      }

      if (type === 'stop') {
        setActiveBtn('');
        await RobotApi.stop();
        if (scheduleList.length > 0) {
          dispatch(shiftSchedule());
        }
        setActiveBtn(type);
        return;
      }

      if (type === 'move_forward') {
        setActiveBtn('');
        console.log('move_forward');
        await RobotApi.slowMove('forward');
        setActiveBtn(type);
        return;
      }

      if (type === 'move_backward') {
        setActiveBtn('');
        console.log('move_backward');
        await RobotApi.slowMove('backward');
        setActiveBtn(type);
        return;
      }

      if (type === 'move_stop') {
        setActiveBtn('');
        console.log('move_stop');
        await RobotApi.slowMove('stop');
        setActiveBtn(type);
        return;
      }

      setActiveBtn('');
      await RobotApi.changeMode(type);
      setActiveBtn(type);
    } catch (err) {
      setActiveBtn('');
      console.error(err);
    }
  }, []);

  const handleClickMovePoint = useCallback((e, data) => {
    const pos = { x: 0, y: 0, rz: 0 };
    switch (data) {
      case 'left':
        pos.x = -0.5;
        break;
      case 'right':
        pos.x = 0.5;
        break;
      case 'up':
        pos.y = 0.5;
        break;
      case 'down':
        pos.y = -0.5;
        break;
    }
    RobotApi.setPose(pos);
  }, [isModeSelect]);

  const handleClickMoveRotation = useCallback((e, data) => {
    const pos = { x: 0, y: 0, rz: 0 };
    switch (data) {
      case 'pos':
        pos.rz = -0.05;
        break;
      case 'neg':
        pos.rz = 0.05;
        break;
    }
    RobotApi.setPose(pos);
  }, [isModeSelect]);

  return (
    <Fragment>
      <OperationPage
        status={status}
        mode={mode}
        state={state}
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

        onClickMovePoint={handleClickMovePoint}
        onClickMoveRotation={handleClickMoveRotation}
      />
    </Fragment>
  )
}

export default OperationContainer;