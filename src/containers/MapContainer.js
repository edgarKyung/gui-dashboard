import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ActionCreators } from 'redux-undo';
import { useDispatch, useSelector } from 'react-redux'
import { MapPage } from '../components/pages';
import * as RobotApi from '../lib/Robot';
import FileListPopupContainer from './FileListPopupContainer';
import SavePopUpContainer from './SavePopUpContainer';

const MapContainer = () => {
  const canvasRef = useRef();
  const dispatch = useDispatch();
  const [loadPopupInfo, setLoadPopupInfo] = useState({
    show: false,
    fileList: [],
  });
  const [savePopupInfo, setSavePopupInfo] = useState({
    show: false,
  });
  
  const [drawType, setDrawType] = useState('');
  const [drawSize, setDrawSize] = useState(1);
  const drawSizeList = [1, 5, 10, 15];

  const handleClickDrawType = useCallback((type) => {
    setDrawType(drawType === type ? '' : type);
  }, [drawType]);

  function getMapFromImage(imageData, width, height) {
    const bin = [];
    // Temporary
    for (let i = 0; i < 4; i += 1) {
      for (let j = 0; j < 4; j += 1) {
        imageData[(width * i + j) * 4] = 0;
      }
    }

    for (let i = 0; i < imageData.length; i += 4) {
      // color = (data[cell] >= 0) ? [240, 240, 236] : color; // Movable Area
      // color = (data[cell] > 40) ? [255, 255, 255] : color; // Unknown Area
      // color = (data[cell] > 70) ? [30, 30, 30] : color; // Unmovable Area

      // Movable Area
      if (imageData[i] > 235 && imageData[i] < 250) {
        bin.push(127);
        continue;
      }

      // Unmovable Area
      if (imageData[i] > 0 && imageData[i] < 140) {
        bin.push(255);
        continue;
      }

      // Unknown Area
      bin.push(0);
    }

    return {
      bin: bin,
      width: width,
      height: height
    };
  }

  const handleClickSave = async () => {
    try {
      setSavePopupInfo({
        show: true
      });
      const app = canvasRef.current.app;
      const viewport = app.stage.children[0];
      const container = viewport.children[0];
      const imageData = app.renderer.plugins.extract.pixels(container);
      const width = Math.floor(container.width);
      const height = Math.floor(container.height);
      const mapData = getMapFromImage(imageData, width, height);
      await RobotApi.saveMap(mapData);
    } catch (err) {
      console.error(err)
    }
  }

  const handleClickLoad = async () => {
    try {
      const fileList = await RobotApi.loadMap();
      setLoadPopupInfo({
        show: true,
        fileList,
      });
    } catch (err) {
      console.error(err)
    }
  }

  const handleClickScan = useCallback(async () => {
    try {
      await RobotApi.scanMap();
    } catch (err) {
      console.error(err)
    }
  }, []);

  const handleClickEnd = useCallback(() => {
    try {
    } catch (err) {
      console.error(err)
    }
  }, []);

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

  const handleClickFileOk = useCallback((data) => {
    console.log(data);
    setLoadPopupInfo({
      ...loadPopupInfo,
      show: false,
    });
  }, [loadPopupInfo]);

  const handleClickFileClose = useCallback(() => {
    setLoadPopupInfo({
      ...loadPopupInfo,
      show: false,
    });
  }, [loadPopupInfo]);

  const handleClickSaveOk = (data) => {
    console.log(data);
    setSavePopupInfo({ show: false });
  };

  const handleClickSaveClose = () => {
    setSavePopupInfo({ show: false });    
  };

  return (
    <>
      <MapPage
        canvasRef={canvasRef}
        drawType={drawType}
        drawSize={drawSize}
        drawSizeList={drawSizeList}
        drawMode={!!drawType}
        onClickDrawType={handleClickDrawType}
        onClickSave={handleClickSave}
        onClickLoad={handleClickLoad}
        onClickScan={handleClickScan}
        onClickEnd={handleClickEnd}
        onClickUndoRedo={handleClickUndoRedo}
        onClickDrawLine={handleClickDrawLine}
      />
      { loadPopupInfo.show && 
        <FileListPopupContainer
          items={loadPopupInfo.fileList}
          onClickOk={handleClickFileOk}
          onClickCancel={handleClickFileClose}
          onClickClose={handleClickFileClose}
        /> 
      }
      { savePopupInfo.show && 
        <SavePopUpContainer
          items={loadPopupInfo.fileList}
          onClickOk={handleClickSaveOk}
          onClickCancel={handleClickSaveClose}
          onClickClose={handleClickSaveClose}
        /> 
      }
    </>
  )
}

export default MapContainer;