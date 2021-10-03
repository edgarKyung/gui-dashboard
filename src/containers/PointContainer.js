import React, { useState, useCallback, useEffect } from 'react';
import _, { words } from 'lodash';
import { useDispatch, useSelector } from 'react-redux'
import { useActions } from '../services/hooks'
import { PointPage } from '../components/pages';
import { addPoint, removePoint, editPoint, reOrderPoint, toggleDisablePoint, loadPoint } from '../modules/reducers/point';
import { addVirtualWall, removeVirtualWall, reOrderVirtualWall, toggleDisableVirtualWall } from '../modules/reducers/virtualWall';
import * as messageBoxActions from '../modules/reducers/message';
import * as FileApi from '../lib/File';

const PointContainer = () => {
  const dispatch = useDispatch();
  const MessageBoxActions = useActions(messageBoxActions);
  const [editPointId, setEditPointId] = useState(null);
  const [activeMove, setActiveMove] = useState('');
  const [virtualWall, setvirtualWall] = useState([]);
  const [showWallList, setShowWallList] = useState([]);
  const [activeWallId, setActiveWallId] = useState();
  const {
    selectedPoint,
    points,
    virtualWallList,
  } = useSelector((store) => ({
    selectedPoint: store.point.get('points').filter(point => point.id === editPointId)[0],
    points: store.point.get('points'),
    virtualWallList: store.virtualWall.get('virtualWall'),
  }));

  useEffect(() => {
    if(points.length > 0) setEditPointId(points[0].id);
  }, []);

  const handleClickAddPoint = () => {
    setActiveMove(activeMove !== 'point' ? 'point' : '');
  };

  const handleClickRemove = (data, type) => {
    if(type === 'point') {
      if (editPointId === data.id) {
        setEditPointId(null);
      }
      dispatch(removePoint(data.id));
    } else {
      dispatch(removeVirtualWall(data.id));
    }
  };

  const handleClickWall = (virtualWallData) => {
    const { id } = virtualWallData;
    setActiveWallId(id);
    if(showWallList.includes(id)){
      setShowWallList(showWallList.filter(data => data !== id));
      setShowWallList(showWallList.filter(data => data !== id));
    } else {
      setShowWallList([...showWallList, id]);
    }
  };

  const handleClickPoint = (pointId) => {
    setEditPointId(pointId);
  };

  const handleClickCanvasPoint = (pointId) => {
    const pointDom = document.getElementById(`point-${pointId}`);
    pointDom.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    setEditPointId(pointId);
  }

  const handleClickFavorite = (e, pointData) => {
    e.stopPropagation();
    const newPoint = _.cloneDeep(pointData);
    newPoint.favorite = !newPoint.favorite;
    dispatch(editPoint(newPoint));
  };

  const handleClickToggleDisable = (data, type) => {
    if(type === 'point'){
      dispatch(toggleDisablePoint(data));
    } else {
      dispatch(toggleDisableVirtualWall(data));
    }
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
      setEditPointId(pointData.id);
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
    console.log(result);
    dispatch(reOrderPoint({
      startIndex: result.source.index,
      endIndex: result.destination.index
    }));
  };

  const handleDragWallEnd = (result) => {
    if (!result.destination) {
      return;
    }
    dispatch(reOrderVirtualWall({
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
    if(activeMove !== 'wall') {
      setActiveMove('wall');
    } else {
      setActiveMove('');
      setvirtualWall([]);
    }
  };

  const handleClickFirstPoint = (e) => {
    dispatch(addVirtualWall({
      id: Date.now().toString(),
      name: '가상벽 ' + new Date().getTime() % 10000,
      disabled: false,
      data:virtualWall,
    }));
    setvirtualWall([]);
  };

  return (
    <>
      <PointPage
        activeMove={activeMove}
        points={points}
        selectedPoint={selectedPoint}
        onClickAddPoint={handleClickAddPoint}
        onClickPoint={handleClickPoint}
        onClickCanvasPoint={handleClickCanvasPoint}
        onClickFavorite={handleClickFavorite}
        onClickToggleDisable={handleClickToggleDisable}
        onClickRemove={handleClickRemove}
        onMovePoint={handleMovePoint}
        onMoveRotation={handleMoveRotation}

        onClickCanvas={handleClickCanvas}
        onMovePointStart={handleMoveStart}
        onMovePointEnd={handleMoveEnd}
        onDragPointEnd={handleDragPointEnd}

        onChangeEditPoint={handleChangeEditPoint}
        onClickSave={handleClickSave}

        onClickWall={handleClickWall}
        activeWallId={activeWallId}
        showWallList={showWallList}
        virtualWall={virtualWall}
        virtualWallList={virtualWallList}
        onClickAddWall={handleClickAddWall}
        onClickFirstPoint={handleClickFirstPoint}
        onDragWallEnd={handleDragWallEnd}
      />
    </>
  );
};

export default PointContainer;