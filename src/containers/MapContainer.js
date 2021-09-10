import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { MapPage } from '../components/pages';
import * as RobotApi from '../lib/Robot';
import { addWall } from '../modules/reducers/wall';

const MapContainer = () => {
  const dispatch = useDispatch();
  const [drawType, setDrawType] = useState('');
  const handleClickDrawType = (type) => {
    console.log(type);
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

  const handleDrag = (pose) => {
    console.log(pose);
    dispatch(addWall({
      type:'able',
      position: pose
    }));
  };

  return (
    <MapPage
      drawType={drawType}
      disableViewPort={!!drawType}
      onClickDrawType={handleClickDrawType}
      onClickSave={handleClickSave}
      onClickLoad={handleClickLoad}
      onClickScan={handleClickScan}
      onClickEnd={handleClickEnd}
      onDrag={handleDrag}
    />
  )
}

export default MapContainer;