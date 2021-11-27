import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { CanvasMap } from '../components/organisms';
import { setNeedReload } from '../modules/reducers/common';
import { addWall } from '../modules/reducers/wall';
import { useInterval } from '../services/hooks';
import { incrementSpinner, decrementSpinner, setLoadCanvas } from '../modules/reducers/common';
import * as RobotApi from '../lib/Robot';
import * as FileApi from '../lib/File';
import { is } from 'immutable';

let drawInterval = null;
let drawStatusInterval = null;
let map = { origin: {}, resolution: {}, padding: {} };
const CanvasMapContainer = ({
  editMode,
  pageType,
  isDrawStatus,
  drawOneTime,
  drawMode,
  canvasWidth,
  canvasHeight,
  points,
  activeMove,
  disabledDrag = true,
  onClickCanvas,
  onClickPoint,
  onClickCanvasImage,
  onMovePointStart,
  onMovePointEnd,
  margin,
  selectedPoint,
  virtualWall,
  virtualWallList,
  onClickFirstPoint,
  activeWallId,
  viewportRef,
  canvasRef,
  drawType,
  drawSize,
  disableRotate,
}) => {
  const dispatch = useDispatch();
  const canvas = document.createElement('canvas');
  let calcCanvasWidth = canvasWidth - margin;
  let calcCanvasHeight = canvasHeight - margin;
  const canvas_padding = { top: 0, bottom: 0, left: 0, right: 0 };
  const [isBigSize, setBigSize] = useState(false);
  const [wallTemp, setWallTemp] = useState([]);
  const [rotate, setRotate] = useState(0);
  const [dataWidth, setDataWidth] = useState(0);
  const [dataHeight, setDataHeight] = useState(0);
  const [initScale, setInitScale] = useState(null);
  const [scale, setScale] = useState(1);
  const [imgData, setImgData] = useState();
  const [poseData, setPoseData] = useState({ x: null, y: null });
  const [laserData, setLaserData] = useState([{ x: null, y: null }]);

  const [viewportScale, setViewportScale] = useState(1);
  const [viewportPosition, setViewportPosition] = useState({ x: 0, y: 0 });
  const {
    wall,
    isNeedReload
  } = useSelector((store) => ({
    wall: store.wall.present.get('wall'),
    isNeedReload: store.common.isNeedReload,
  }));

  function convertRealToCanvas(pose) {
    const diffX = (pose.x - map.origin.x) / map.resolution.x;
    const diffY = (pose.y - map.origin.y) / map.resolution.y;
    return {
      x: canvas_padding.left + diffX,
      y: canvas_padding.top + map.height - diffY
    };
  }

  const drawMap = ({ data, width, height }) => {
    const ctx = canvas.getContext('2d');
    ctx.canvas.width = width + canvas_padding.left + canvas_padding.right;
    ctx.canvas.height = height + canvas_padding.top + canvas_padding.bottom;

    // const cache = {};
    const imageData = ctx.getImageData(0, 0, width, height);
    for (let cell = 0; cell < width * height; cell += 1) {
      // cache[data[cell]] = cache[data[cell]] || [];
      // cache[data[cell]].push(cell);
      let color = [255, 255, 255]; // Unknown Area
      color = (data[cell] >= 0) ? [240, 240, 236] : color; // Movable Area
      color = (data[cell] > 40) ? [255, 255, 255] : color; // Unknown Area
      color = (data[cell] > 70) ? [30, 30, 30] : color; // Unmovable Area
      // color = (data[cell] > 127) ? [30, 30, 30] : color; // Unmovable Area
      imageData.data[cell * 4 + 0] = color[0]
      imageData.data[cell * 4 + 1] = color[1]
      imageData.data[cell * 4 + 2] = color[2]
      imageData.data[cell * 4 + 3] = 255;
    }
    // console.log(cache);
    ctx.putImageData(imageData, canvas_padding.left, canvas_padding.top);
    setImgData(canvas.toDataURL());
    reSizeCanvasData();
  }

  function getLaserData(robotPose, angle, sensor) {
    const data = [];
    if (map.resolution.x && map.resolution.y) {
      // console.log(sensor);
      for (let i = 0; i < sensor.laser.length; i += 1) {
        const laser = sensor.laser[i];
        const targetAngle = sensor.degree + laser.angle + angle;
        if (sensor.reverse) {
          const x = robotPose.x + Math.cos(targetAngle) * laser.range / map.resolution.x;
          const y = robotPose.y + Math.sin(targetAngle) * laser.range / map.resolution.y;
          data.push({ x, y });
        } else {
          const x = robotPose.x + Math.sin(targetAngle) * laser.range / map.resolution.x;
          const y = robotPose.y + Math.cos(targetAngle) * laser.range / map.resolution.y;
          data.push({ x, y });
        }
      }
    }
    return data;
  }

  const reSizeCanvasData = () => {
    const [w, h] = imageSizeAfterRotation([map.width, map.height], rotate);

    const scaleWidth = calcCanvasWidth / w;
    const scaleHeight = calcCanvasHeight / h;
    if (scaleWidth < scaleHeight) {
      const padding = calcCanvasHeight / scaleWidth - map.height;
      // canvas_padding.top = padding * 0.4;
      // canvas_padding.bottom = padding * 0.6;
      canvas_padding.left = 0;
      canvas_padding.right = 0;
      map.padding = canvas_padding;
      map.scale = scaleWidth;
    }
    if (scaleWidth > scaleHeight) {
      const padding = calcCanvasWidth / scaleHeight - map.width;
      canvas_padding.top = 0;
      canvas_padding.bottom = 0;
      // canvas_padding.left = padding * 0.6;
      // canvas_padding.right = padding * 0.4;
      map.padding = canvas_padding;
      map.scale = scaleHeight;
    }

    // map.scale = pageType === 'map' ? 1 : map.scale;

    if (!initScale) setInitScale(map.scale);
    setScale(map.scale);
    setDataWidth(map.width);
    setDataHeight(map.height);
  };

  async function setMapData() {
    map = await RobotApi.getMap('office');
    setBigSize(map.data.length > 1000 * 1000);
    if (pageType === 'operation') {
      reSizeCanvasData();
      FileApi.setOpMapData(map);
      return;
    }
    FileApi.setMapData(map);
  }

  function imageSizeAfterRotation(size, degrees) {
    degrees = degrees % 180;
    if (degrees < 0) {
      degrees = 180 + degrees;
    }
    if (degrees >= 90) {
      size = [size[1], size[0]];
      degrees = degrees - 90;
    }
    if (degrees === 0) {
      return size;
    }
    const radians = degrees * Math.PI / 180;
    const width = (size[0] * Math.cos(radians)) + (size[1] * Math.sin(radians));
    const height = (size[0] * Math.sin(radians)) + (size[1] * Math.cos(radians));
    return [width, height];
  }

  async function drawCanvas() {
    try {
      dispatch(incrementSpinner());
      dispatch(setLoadCanvas(false));
      await setMapData();
      drawMap(map);
      dispatch(setLoadCanvas(true));
      dispatch(decrementSpinner());
    } catch (err) {
      dispatch(setLoadCanvas(false));
      dispatch(decrementSpinner());
    }
  }

  async function drawStatus() {
    const pose = await RobotApi.getPose();
    const sensor = await RobotApi.getSensor();
    const robotPose = convertRealToCanvas(pose);
    const laserData = getLaserData(robotPose, pose.rz, sensor);
    setLaserData(laserData);
    setPoseData(robotPose);
  }

  useInterval(() => {
    if (pageType === 'map' && isBigSize) return;
    drawStatus();
  }, 100);

  useInterval(async () => {
    if (pageType === 'map') {
      await setMapData();
      console.log(map.data.length);
      if (!isBigSize) drawMap(map);
    }
  }, 1000);

  useEffect(() => {
    if (isNeedReload) {
      drawCanvas();
      dispatch(setNeedReload(false));
    }
  }, [isNeedReload]);

  useEffect(() => {
    drawCanvas();
    drawStatus();
  }, []);

  useEffect(() => {
    reSizeCanvasData();
  }, [rotate]);

  const handleZoomEndCanvas = useCallback((e) => {
    const { scaleX, x, y } = e.lastViewport;
    setViewportScale(scaleX);
    setViewportPosition({ x, y });
  }, []);

  const handleViewPortMoved = useCallback((e) => {
    const { scaleX, x, y } = e.viewport.lastViewport;
    setViewportScale(scaleX);
    setViewportPosition({ x, y });
  }, []);

  const _getLocalPoseFromGlobalPose = ({ x, y }) => {
    const padding = {
      x: -(viewportPosition.x) > 0 ? (-(viewportPosition.x) / viewportScale) : 0,
      y: -(viewportPosition.y) > 0 ? (-(viewportPosition.y) / viewportScale) : 0,
    }
    return {
      x: (x / viewportScale) + padding.x,
      y: (y / viewportScale) + padding.y,
    }
  }

  const calRotatePosition = (cx, cy, x, y, angle) => {
    let radians = (Math.PI / 180) * angle,
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
      ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
  }

  const handleGlobalMove = useCallback((e) => {
    if (drawMode) {
      const interaction = e.data;
      if (e.target === e.currentTarget && interaction.pressure > 0) {
        const { x: globalX, y: globalY } = _getLocalPoseFromGlobalPose(interaction.global);
        const [diffX, diffY] = [(calcCanvasWidth - e.target.width) / 2, (calcCanvasHeight - e.target.height) / 2];
        const [x, y] = [globalX - diffX, globalY - diffY];
        const [scaleX, scaleY] = [x / scale, y / scale];
        const [rotateX, rotateY] = calRotatePosition(dataWidth / 2, dataHeight / 2, scaleX, scaleY, rotate);

        setWallTemp([...wallTemp, {
          x: rotateX,
          y: rotateY,
          rotate,
          size: drawSize,
          type: drawType,
          scale,
          initScale,
          canvasWidth: calcCanvasWidth,
          canvasHeight: calcCanvasHeight,
        }]);
      } else if (wallTemp.length > 0) {
        dispatch(addWall({
          type: drawType,
          data: wallTemp,
        }));
        setWallTemp([]);
      }
    }
  }, [drawMode, drawType, drawSize, wallTemp]);

  const handleGlobalMoveEnd = useCallback(() => {
    if (drawMode && wallTemp.length > 0) {
      dispatch(addWall({
        type: drawType,
        data: wallTemp,
      }));
      setWallTemp([]);
    }
  }, [drawMode, drawType, wallTemp]);

  const handleClickRotationClock = useCallback(() => {
    const newRotate = rotate + 10;
    setRotate(newRotate);
  }, [rotate]);

  const handleClickRotationUnClock = useCallback(() => {
    const newRotate = rotate - 10;
    setRotate(newRotate);
  }, [rotate]);

  const handleClickRefreshMap = () => {
    dispatch(incrementSpinner());
    drawCanvas();
    drawStatus();
    dispatch(decrementSpinner());
  };

  return (
    <CanvasMap
      pageType={pageType}
      isBigSize={isBigSize}
      canvasRef={canvasRef}
      viewportRef={viewportRef}
      wall={wall}
      wallTemp={wallTemp}

      activeWallId={activeWallId}
      virtualWall={virtualWall}
      virtualWallList={virtualWallList}
      onClickFirstPoint={onClickFirstPoint}

      editMode={editMode}
      activeMove={activeMove}
      drawMode={drawMode}
      viewportScale={viewportScale}
      viewportPosition={viewportPosition}
      initScale={initScale}
      scale={scale}
      canvasWidth={calcCanvasWidth}
      canvasHeight={calcCanvasHeight}
      dataWidth={dataWidth}
      dataHeight={dataHeight}
      imgData={imgData}
      poseData={poseData}
      laserData={laserData}
      points={points}
      selectedPoint={selectedPoint}
      disabledDrag={disabledDrag}
      onClickPoint={onClickPoint}
      onClickCanvas={onClickCanvas}
      onClickCanvasImage={onClickCanvasImage}
      onZoomEndCanvas={handleZoomEndCanvas}
      onMovePointStart={onMovePointStart}
      onMovePointEnd={onMovePointEnd}
      onMoved={handleViewPortMoved}
      onDrag={handleGlobalMove}
      onDragEnd={handleGlobalMoveEnd}

      disableRotate={disableRotate}
      rotate={rotate}
      onClickRotationClock={handleClickRotationClock}
      onClickRotationUnClock={handleClickRotationUnClock}
      onClickRefreshMap={handleClickRefreshMap}
    />
  )
}

CanvasMapContainer.defaultProps = {
  disableRotate: true,
  drawOneTime: false,
  margin: 0,
  selectedPoint: {},
  drawType: '',
  drawSize: 1,
  onClickCanvas: () => { console.log('onClickCanvas is not defined'); },
  onClickPoint: () => { console.log('onClickPoint is not defined'); },
  onClickCanvasImage: () => { console.log('onClickCanvasImage is not defined'); },
  onClickCanvasPoint: () => { console.log('onClickCanvasPoint is not defined'); },
  onMovePointStart: () => { console.log('onMovePointStart is not defined'); },
  onMovePointEnd: () => { console.log('onMovePointEnd is not defined'); },
};

export default React.memo(CanvasMapContainer);
