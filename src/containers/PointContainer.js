import React, { useState, useCallback, useEffect } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux'
import { useActions } from '../services/hooks'
import { PointPage } from '../components/pages';
import { addPoint, removePoint, editPoint, reOrderPoint, toggleDisablePoint, loadPoint } from '../modules/reducers/point';
import * as messageBoxActions from '../modules/reducers/message';
import * as FileApi from '../lib/File';

const PointContainer = () => {
  const dispatch = useDispatch();
  const MessageBoxActions = useActions(messageBoxActions);
  const [showEdit, setShowEdit] = useState(false);
  const [editPointId, setEditPointId] = useState(null);
  const [activeAddMove, setActiveAddMove] = useState(false);
  const { 
    canvasPoints, 
    selectedPoint,
    points, 
  } = useSelector((store) => ({
    canvasPoints:store.point.get('points').filter(point => !point.disabled),
    selectedPoint : store.point.get('points').filter(point => point.id === editPointId)[0],
    points:store.point.get('points'),
  }));
  console.log('activeAddMove', activeAddMove);

  const handleToggleEditPannel = () => {
    setShowEdit(!showEdit);
  }

  const handleClickAddPoint = () => {
    setActiveAddMove(!activeAddMove);
  };

  const handleClickRemove = (pointData) => {
    if(editPointId === pointData.id){
      setEditPointId(null);
      setShowEdit(false);
    }
    dispatch(removePoint(pointData.id));
  };

  const handleClickPoint = (pointId) => {
    setEditPointId(pointId);
    setShowEdit(true);
  };

  const handleClickPointToggleDisable = (pointData) => {
    dispatch(toggleDisablePoint(pointData));
  };

  const movePoint = (position) => {
    const newPose = _.cloneDeep(selectedPoint);
    switch(position){
      case'up':
        newPose.y -= 10; 
      break;
      case'right':
        newPose.x += 10; 
      break;
      case'down':
        newPose.y += 10; 
      break;
      case'left':
        newPose.x -= 10; 
      break;
      case'neg':
        newPose.degree -= 10; 
      break;
      case'pos':
        newPose.degree += 10; 
      break;
    }
    dispatch(editPoint(newPose));
  };

  const handleMovePoint = (e, position) => {
    movePoint(position);
  };

  const handleMoveRotation = (e, rotation) => {
    movePoint(rotation);
  };

  const handleClickCanvas = (e) => {
    console.log(e, activeAddMove);
    if(activeAddMove){
      const { world } = e;
      const pointData = { 
        id:Date.now().toString(),
        name: '거점 1', 
        x: world.x, 
        y: world.y, 
        degree: 0,
        disabled:false,
        favorite:false,
      };
      dispatch(addPoint(pointData));
    }
  };

  const handleMoveStart = (pointId) => {
    setEditPointId(pointId);
  };  

  const handleMoveEnd = (position) => {
    const newPose = _.cloneDeep(selectedPoint);
    newPose.x = position.x;
    newPose.y = position.y;
    dispatch(editPoint(newPose));
  };

  const handleChangeEditPoint = (point) => {
    const newPose = _.cloneDeep(selectedPoint);
    console.log(newPose,point);
    dispatch(editPoint(Object.assign(newPose, point)));
  };

  const handleDragPointEnd = (result) => {
    if (!result.destination) {
      return;
    }
    dispatch(reOrderPoint({
      startIndex: result.source.index, 
      endIndex: result.destination.index
    }));
  };

  const handleClickLoad = async () => {
    try {
      const loadPoints = await FileApi.loadWayPoint();
      dispatch(loadPoint(loadPoints));
      MessageBoxActions.addMessage({
        children: '성공',
        buttonType: ['YES'],
      });  
    } catch (err) {
      dispatch(loadPoint(points));
      console.error(err);
      throw err;
    }
  };

  const handleClickSave = async () => {
    try {
      const res = await FileApi.saveWayPoint(points);
      MessageBoxActions.addMessage({
        children: '성공',
        buttonType: ['YES'],
      });
      console.log(res);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return(
  <>
    <PointPage
      activeAddMove={activeAddMove}
      showEdit={showEdit}
      canvasPoints={canvasPoints}
      points={points}
      selectedPoint={selectedPoint}
      onClickEditClose={handleToggleEditPannel}
      onClickAddPoint={handleClickAddPoint}
      onClickPoint={handleClickPoint}
      onClickPointToggleDisable={handleClickPointToggleDisable}
      onClickRemove={handleClickRemove}
      onMovePoint={handleMovePoint}
      onMoveRotation={handleMoveRotation}

      onClickCanvas={handleClickCanvas}
      onMovePointStart={handleMoveStart}
      onMovePointEnd={handleMoveEnd}
      onDragPointEnd={handleDragPointEnd}
      
      onChangeEditPoint={handleChangeEditPoint}
      onClickLoad={handleClickLoad}
      onClickSave={handleClickSave}
    />
  </>
  );
};

export default PointContainer;