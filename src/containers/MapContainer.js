import React, { useEffect, useState, useRef, useCallback } from 'react';
import { withRouter } from "react-router";
import { ActionCreators } from 'redux-undo';
import { useDispatch } from 'react-redux'
import { MapPage } from '../components/pages';
import * as RobotApi from '../lib/Robot';
import FileListPopupContainer from './FileListPopupContainer';
import SavePopUpContainer from './SavePopUpContainer';
import { setNeedReload } from '../modules/reducers/common';
import { resetWall } from '../modules/reducers/wall';
import { incrementSpinner, decrementSpinner, setLoadCanvas } from '../modules/reducers/common';

const MapContainer = ({ history }) => {
  const canvasRef = useRef();
  const dispatch = useDispatch();
  const [loadPopupInfo, setLoadPopupInfo] = useState({
    show: false,
    fileList: [],
  });
  const [savePopupInfo, setSavePopupInfo] = useState({
    show: false,
  });
  const [editMode, setEditMode] = useState('edit');

  const [drawType, setDrawType] = useState('');
  const [drawSize, setDrawSize] = useState(1);
  const drawSizeList = [1, 5, 10, 15];

  const handleClickDrawType = useCallback((type) => {
    setDrawType(drawType === type ? '' : type);
  }, [drawType]);

  useEffect(() => history.listen(() => {
    dispatch(resetWall());
  }), [])

  function getMapFromImage(imageData, width, height) {
    const bin = [];
    for (let i = 0; i < imageData.length; i += 4) {
      const row = Math.floor(i / width);
      // Movable Area
      if (imageData[i] === 240) {
        bin.push(127);
        continue;
      }
      bin.push(255);
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
      setDrawType('');
    } catch (err) {
      console.error(err)
    }
  }

  const handleClickLoad = async () => {
    try {
      const fileList = await RobotApi.getMapList();
      setLoadPopupInfo({
        show: true,
        fileList,
      });
      setDrawType('');
    } catch (err) {
      console.error(err)
    }
  }

  const handleClickScan = useCallback(async () => {
    try {
      const res = await RobotApi.scanMap();
      setEditMode('scan');
    } catch (err) {
      console.error(err)
    }
  }, []);

  const handleClickEnd = useCallback(() => {
    try {
      setEditMode('edit');
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

  const handleClickFileOk = useCallback(async (data) => {
    dispatch(incrementSpinner());
    await RobotApi.loadMap(data);
    setLoadPopupInfo({
      ...loadPopupInfo,
      show: false,
    });
    dispatch(setNeedReload(true));
    dispatch(decrementSpinner());
  }, [loadPopupInfo]);

  const handleClickFileClose = useCallback(() => {
    setLoadPopupInfo({
      ...loadPopupInfo,
      show: false,
    });
  }, [loadPopupInfo]);



  const _sleep = async (time) => {
    const promise = new Promise((resolve, reject) => {
      const id = setTimeout(() => {
        clearTimeout(id);
        resolve('response!');
      }, time);
    });
    return promise;
  }
  const handleClickSaveOk = async (data) => {
    dispatch(incrementSpinner());
    setSavePopupInfo({ show: false });
    const app = canvasRef.current.app;
    const viewport = app.stage.children[0];
    const container = viewport.children[0];
    const imageData = app.renderer.plugins.extract.pixels(container);
    const width = Math.floor(container.width / container.scale.x);
    const height = Math.floor(container.height / container.scale.y);
    const mapData = getMapFromImage(imageData, width, height);
    await RobotApi.saveMap(data, mapData);
    await _sleep(5000);
    await RobotApi.loadMap(data);
    dispatch(resetWall());
    dispatch(setNeedReload(true));
    dispatch(decrementSpinner());

  };

  const handleClickSaveClose = () => {
    setSavePopupInfo({ show: false });
  };

  return (
    <>
      <MapPage
        editMode={editMode}
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
      {loadPopupInfo.show &&
        <FileListPopupContainer
          items={loadPopupInfo.fileList}
          onClickOk={handleClickFileOk}
          onClickCancel={handleClickFileClose}
          onClickClose={handleClickFileClose}
        />
      }
      {savePopupInfo.show &&
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

export default withRouter(MapContainer);