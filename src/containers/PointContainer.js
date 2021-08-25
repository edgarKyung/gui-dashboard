import React, { useState, useCallback, useEffect } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux'
import { PointPage } from '../components/pages';
import { addPoint, removePoint, editPoint, reOrderPoint } from '../modules/reducers/point';

const PointContainer = () => {
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);
  const [editPointId, setEditPointId] = useState(null);
  const [activeAddMove, setActiveAddMove] = useState(false);
  const { points, selectedPoint } = useSelector((store) => ({
    points:store.point.get('points'),
    selectedPoint : store.point.get('points').filter(point => point.id === editPointId)[0]
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
      const { screen } = e;
      const pointData = { 
        id:Date.now().toString(),
        name: '거점 1', 
        x: screen.x, 
        y: screen.y, 
        degree: 0,
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

  return(
  <>
    <PointPage
      activeAddMove={activeAddMove}
      showEdit={showEdit}
      points={points}
      selectedPoint={selectedPoint}
      onClickEditClose={handleToggleEditPannel}
      onClickAddPoint={handleClickAddPoint}
      onClickPoint={handleClickPoint}
      onClickRemove={handleClickRemove}
      onMovePoint={handleMovePoint}
      onMoveRotation={handleMoveRotation}

      onClickCanvas={handleClickCanvas}
      onMovePointStart={handleMoveStart}
      onMovePointEnd={handleMoveEnd}
      onDragPointEnd={handleDragPointEnd}
      
      onChangeEditPoint={handleChangeEditPoint}
    />
  </>
  );
};

export default PointContainer;