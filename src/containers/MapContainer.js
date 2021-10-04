import React, { useEffect, useState } from 'react';
import { ActionCreators } from 'redux-undo';
import { useDispatch, useSelector } from 'react-redux'
import { MapPage } from '../components/pages';
import * as RobotApi from '../lib/Robot';
import { addWall } from '../modules/reducers/wall';
import { addWallTemp, resetWallTemp } from '../modules/reducers/wallTemp';

const MapContainer = () => {
  const dispatch = useDispatch();
  const [drawType, setDrawType] = useState('');
  const [drawSize, setDrawSize] = useState(2);
  const drawSizeList = [1,5,20];
  const {
    wallTemp,
  } = useSelector((store) => ({
    wallTemp: store.wallTemp.get('wallTemp'),
  }));

  const handleClickDrawType = (type) => {
    setDrawType(drawType === type ? '' : type);
  };

  const handleClickSave = async () => {
    try {
      await RobotApi.saveMap();
    } catch (err) {
      console.error(err)
    }
  }

  const handleClickLoad = async () => {
    try {
      await RobotApi.loadMap();
    } catch (err) {
      console.error(err)
    }
  }

  const handleClickScan = async () => {
    try {
      await RobotApi.scanMap();
    } catch (err) {
      console.error(err)
    }
  }

  const handleClickEnd = async () => {
    try {
    } catch (err) {
      console.error(err)
    }
  }

  const handleDrag = ({ x, y }) => {
    if (!!drawType) {
      dispatch(addWallTemp({ x, y, size:drawSize, type: drawType }));
    }
  };

  const handleDragEnd = (e) => {
    if (!!drawType) {
      dispatch(addWall({
        type: drawType,
        data: wallTemp,
      }));
      dispatch(resetWallTemp());
    }

  };

  const handleClickUndoRedo = (type) => {
    if (type == 'undo') {
      dispatch(ActionCreators.undo());
    } else {
      dispatch(ActionCreators.redo());
    }
  }

  const handleClickDrawLine = (size) => {
    setDrawSize(size);
  };

  return (
    <MapPage
      drawType={drawType}
      drawSize={drawSize}
      drawSizeList={drawSizeList}
      disableViewPort={!!drawType}
      onClickDrawType={handleClickDrawType}
      onClickSave={handleClickSave}
      onClickLoad={handleClickLoad}
      onClickScan={handleClickScan}
      onClickEnd={handleClickEnd}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onClickUndoRedo={handleClickUndoRedo}
      onClickDrawLine={handleClickDrawLine}
    />
  )
}

export default MapContainer;