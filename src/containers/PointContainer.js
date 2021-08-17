import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { PointPage } from '../components/pages';
import { addPoint, removePoint } from '../modules/reducers/point';

const PointContainer = () => {
  const dispatch = useDispatch()
  const [showEdit, setShowEdit] = useState(false);
  const [editPointId, setEditPointId] = useState(null);
  const { points } = useSelector((store) => ({
    points:store.point.get('points')
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

  return(
  <>
    <PointPage
      showEdit={showEdit}
      points={points}
      editPointId={editPointId}
      onClickEditClose={handleToggleEditPannel}
      onClickAddPoint={handleClickAddPoint}
      onClickPoint={handleClickPoint}
      onClickRemove={handleClickRemove}
    />
  </>
  );
};

export default PointContainer;