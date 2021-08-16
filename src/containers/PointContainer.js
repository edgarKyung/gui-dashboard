import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { PointPage } from '../components/pages';
import { addPoint } from '../modules/reducers/point';

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

  const setEditPoint = (pointId) => {
    setShowEdit(true);
    setEditPointId(pointId);
  };

  const handleClickAddPoint = () => {
    const pointData = { 
      id:Date.now(),
      name: '거점 1', 
      x: 1.3443, 
      y: -2.1123, 
      degree: 3.14159 
    };
    dispatch(addPoint(pointData));
    setEditPoint(pointData.id);
  };

  const handleClickPoint = (pointId) => {
    setEditPoint(pointId);
  };
  return(
  <>
    <PointPage
      showEdit={showEdit}
      points={points}
      editPointId={editPointId}
      onClickEditClose={handleToggleEditPannel}
      onClickOpenEditPannel={handleToggleEditPannel}
      onClickAddPoint={handleClickAddPoint}
      onClickPoint={handleClickPoint}
    />
  </>
  );
};

export default PointContainer;