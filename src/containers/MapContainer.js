import React, { useEffect, useState, useRef } from 'react';
import { ActionCreators } from 'redux-undo';
import { useDispatch, useSelector } from 'react-redux'
import { MapPage } from '../components/pages';
import * as RobotApi from '../lib/Robot';
import { addWall } from '../modules/reducers/wall';
import { addWallTemp, resetWallTemp } from '../modules/reducers/wallTemp';

const MapContainer = () => {
  const canvasRef = useRef();
  const dispatch = useDispatch();
  const [drawType, setDrawType] = useState('');
  const [drawSize, setDrawSize] = useState(1);
  const drawSizeList = [1, 5, 10, 15];
  const {
    wallTemp,
  } = useSelector((store) => ({
    wallTemp: store.wallTemp.get('wallTemp'),
  }));

  const handleClickDrawType = (type) => {
    setDrawType(drawType === type ? '' : type);
  };

  function getMapFromImage(imageData) {
    const bin = [];
    for (let i = 0; i < imageData.length; i += 4) {
      if (imageData[i] === 255) {
        bin.push(-1);   // Unknown Area
        continue;
      }
      if (imageData[i] > 200) {
        bin.push(127);      // Movable Area
        continue;
      }
      if (imageData[i] > 10) {
        bin.push(255);  // Unmovable Area
        continue;
      }
    }
    return {
      bin: bin,
      // width: width,
      // height: height
    };
  }
  
  const handleClickSave = async () => {
    try {
      const app = canvasRef.current.app;
      const viewport = app.stage.children[0];
      const container = viewport.children[0];
      const imageData = app.renderer.plugins.extract.pixels(container);
      await RobotApi.saveMap(getMapFromImage(imageData));
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
      dispatch(addWallTemp({ x, y, size: drawSize, type: drawType }));
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
      canvasRef={canvasRef}
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