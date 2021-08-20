import React, { useState, useCallback, useEffect } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux'
import { PointPage } from '../components/pages';
import { addPoint, removePoint, editPoint } from '../modules/reducers/point';

const PointContainer = () => {
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);
  const [editPointId, setEditPointId] = useState(null);
  const { points, selectedPoint } = useSelector((store) => ({
    points:store.point.get('points'),
    selectedPoint : store.point.get('points').filter(point => point.id === editPointId)[0]
  }));

  const handleToggleEditPannel = () => {
    setShowEdit(!showEdit);
  }

  const handleClickAddPoint = () => {
    const pointData = { 
      id:Date.now(),
      name: '거점 1', 
      x: 1.3443, 
      y: -2.1123, 
      degree: 3.14159 
    };
    dispatch(addPoint(pointData));
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

  return(
  <>
    <PointPage
      showEdit={showEdit}
      points={points}
      selectedPoint={selectedPoint}
      onClickEditClose={handleToggleEditPannel}
      onClickAddPoint={handleClickAddPoint}
      onClickPoint={handleClickPoint}
      onClickRemove={handleClickRemove}
      onMovePoint={handleMovePoint}
      onMoveRotation={handleMoveRotation}
    />
  </>
  );
};

export default PointContainer;