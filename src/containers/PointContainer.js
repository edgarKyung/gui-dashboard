import React, { useState, useCallback, useEffect } from 'react';
import _, { words } from 'lodash';
import { useDispatch, useSelector } from 'react-redux'
import { useActions } from '../services/hooks'
import { PointPage } from '../components/pages';
import { addPoint, removePoint, editPoint, reOrderPoint, toggleDisablePoint, loadPoint } from '../modules/reducers/point';
import { addVirtualWall } from '../modules/reducers/virtualWall';
import * as messageBoxActions from '../modules/reducers/message';
import * as FileApi from '../lib/File';

const PointContainer = () => {
  const dispatch = useDispatch();
  const MessageBoxActions = useActions(messageBoxActions);
  const [showEdit, setShowEdit] = useState(false);
  const [editPointId, setEditPointId] = useState(null);
  const [activeMove, setActiveMove] = useState('');
  const [virtualWall, setvirtualWall] = useState([]);
  const {
    canvasPoints,
    selectedPoint,
    points,
    virtualWallList,
  } = useSelector((store) => ({
    canvasPoints: store.point.get('points').filter(point => !point.disabled),
    selectedPoint: store.point.get('points').filter(point => point.id === editPointId)[0],
    points: store.point.get('points'),
    virtualWallList: store.virtualWall.get('virtualWall'),
  }));

  const handleToggleEditPannel = () => {
    setShowEdit(!showEdit);
  }

  const handleClickAddPoint = () => {
    setActiveMove(activeMove !== 'point' ? 'point' : '');
  };

  const handleClickRemove = (pointData) => {
    if (editPointId === pointData.id) {
      setEditPointId(null);
      setShowEdit(false);
    }
    dispatch(removePoint(pointData.id));
  };

  const handleClickPoint = (pointId) => {
    setEditPointId(pointId);
    setShowEdit(true);
  };

  const handleClickFavorite = (e, pointData) => {
    e.stopPropagation();
    const newPoint = _.cloneDeep(pointData);
    newPoint.favorite = !newPoint.favorite;
    dispatch(editPoint(newPoint));
  };

  const handleClickPointToggleDisable = (pointData) => {
    dispatch(toggleDisablePoint(pointData));
  };

  const movePoint = (position) => {
    const newPose = _.cloneDeep(selectedPoint);
    switch (position) {
      case 'up':
        newPose.y -= 10;
        break;
      case 'right':
        newPose.x += 10;
        break;
      case 'down':
        newPose.y += 10;
        break;
      case 'left':
        newPose.x -= 10;
        break;
      case 'neg':
        newPose.degree -= 10;
        break;
      case 'pos':
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
    const { world } = e;
    if (activeMove === 'point') {
      const pointData = {
        id: Date.now().toString(),
        name: '거점 ' + new Date().getTime() % 10000,
        x: world.x,
        y: world.y,
        degree: 0,
        disabled: false,
        favorite: false,
      };
      dispatch(addPoint(pointData));
    } else if (activeMove === 'wall'){
      setvirtualWall([...virtualWall, {x: world.x, y: world.y}]);
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
    console.log(newPose, point);
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

  const handleClickAddWall = () => {
    setActiveMove(activeMove !== 'wall' ? 'wall' : '');
  };

  const handleClickFirstPoint = (e) => {
    dispatch(addVirtualWall(virtualWall));
    setvirtualWall([]);
  };

  return (
    <>
      <PointPage
        activeMove={activeMove}
        showEdit={showEdit}
        canvasPoints={canvasPoints}
        points={points}
        selectedPoint={selectedPoint}
        onClickEditClose={handleToggleEditPannel}
        onClickAddPoint={handleClickAddPoint}
        onClickPoint={handleClickPoint}
        onClickFavorite={handleClickFavorite}
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

        virtualWall={virtualWall}
        virtualWallList={virtualWallList}
        onClickAddWall={handleClickAddWall}
        onClickFirstPoint={handleClickFirstPoint}
      />
    </>
  );
};

export default PointContainer;