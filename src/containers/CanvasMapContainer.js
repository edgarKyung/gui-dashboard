import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux'
import { CanvasMap } from '../components/organisms';
import * as RobotApi from '../lib/Robot';
import * as FileApi from '../lib/File';

let drawInterval = null;
let drawStatusInterval = null;
let map = { origin: {}, resolution: {}, padding: {} };

const CanvasMapContainer = ({
  isOp,
  isDrawStatus,
  drawOneTime,
  disableViewPort,
  canvasWidth,
  canvasHeight,
  points,
  activeMove,
  disabledDrag = true,
  onClickCanvas,
  onClickPoint,
  onMovePointStart,
  onMovePointEnd,
  onDrag,
  onDragEnd,
  margin,
  selectedPoint,
  virtualWall,
  virtualWallList,
  onClickFirstPoint,
  activeWallId,
}) => {
  const canvas = document.createElement('canvas');
  let calcCanvasWidth = canvasWidth - margin;
  let calcCanvasHeight = canvasHeight - margin;
  const canvas_padding = { top: 0, bottom: 0, left: 0, right: 0 };
  const [dataWidth, setDataWidth] = useState(0);
  const [dataHeight, setDataHeight] = useState(0);
  const [scale, setScale] = useState(1);
  const [imgData, setImgData] = useState();
  const [poseData, setPoseData] = useState({ x: null, y: null });
  const [laserData, setLaserData] = useState([{ x: null, y: null }]);

  const [viewportScale, setViewportScale] = useState(1);
  const [viewportPosition, setViewportPosition] = useState({ x: 0, y: 0 });
  const {
    wall,
    wallTemp,
  } = useSelector((store) => ({
    wall: store.wall.present.get('wall'),
    wallTemp: store.wallTemp.get('wallTemp'),
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

  async function setMapData() {
    map = await RobotApi.getMap('office');

    const scaleWidth = calcCanvasWidth / map.width;
    const scaleHeight = calcCanvasHeight / map.height;
    if (scaleWidth < scaleHeight) {
      const padding = calcCanvasHeight / scaleWidth - map.height;
      canvas_padding.top = padding * 0.4;
      canvas_padding.bottom = padding * 0.6;
      canvas_padding.left = 0;
      canvas_padding.right = 0;
      map.padding = canvas_padding;
      map.scale = scaleWidth;
    }
    if (scaleWidth > scaleHeight) {
      const padding = calcCanvasWidth / scaleHeight - map.width;
      canvas_padding.top = 0;
      canvas_padding.bottom = 0;
      canvas_padding.left = padding * 0.6;
      canvas_padding.right = padding * 0.4;
      map.padding = canvas_padding;
      map.scale = scaleHeight;
    }

    setScale(map.scale);
    setDataWidth(map.width);
    setDataHeight(map.height);

    if (isOp) {
      FileApi.setOpMapData(map);
    } else {
      FileApi.setMapData(map);
    }
  }

  async function drawCanvas() {
    await setMapData();
    drawMap(map);
  }

  async function drawStatus() {
    const pose = await RobotApi.getPose();
    const sensor = await RobotApi.getSensor();
    const robotPose = convertRealToCanvas(pose);
    const laserData = getLaserData(robotPose, pose.rz, sensor);
    setLaserData(laserData);
    setPoseData(robotPose);
  }

  useEffect(() => {
    drawCanvas();
    if (!drawOneTime) drawInterval = setInterval(drawCanvas, 2000);
    if (isDrawStatus) {
      drawStatusInterval = setInterval(drawStatus, 100);
    }
    return () => {
      if (drawInterval) clearInterval(drawInterval);
      if (drawStatusInterval) clearInterval(drawStatusInterval);
    }
  }, []);

  const handleZoomEndCanvas = (e) => {
    // console.log('zoom end', e);
    const { scaleX, x, y } = e.lastViewport;
    setViewportScale(scaleX);
    setViewportPosition({ x, y });
  }

  const handleViewPortMoved = (e) => {
    const { x, y } = e.viewport.lastViewport;
    setViewportPosition({ x, y });
  };

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

  let defualtWallSize = 1;
  const handleGlobalMove = (e) => {
    const interaction = e.data;
    if (interaction.pressure > 0) {
      const { x, y } = _getLocalPoseFromGlobalPose(interaction.global);
      // onDrag({ x, y, size: defualtWallSize / viewportScale });
      onDrag({ x, y, size: defualtWallSize });
    }
  }

  return (
    <CanvasMap
      wall={wall}
      wallTemp={wallTemp}

      activeWallId={activeWallId}
      virtualWall={virtualWall}
      virtualWallList={virtualWallList}
      onClickFirstPoint={onClickFirstPoint}

      activeMove={activeMove}
      disableViewPort={disableViewPort}
      viewportScale={viewportScale}
      viewportPosition={viewportPosition}
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
      onZoomEndCanvas={handleZoomEndCanvas}
      onMovePointStart={onMovePointStart}
      onMovePointEnd={onMovePointEnd}
      onMoved={handleViewPortMoved}
      onDrag={handleGlobalMove}
      onDragEnd={onDragEnd}
    />
  )
}

CanvasMapContainer.defaultProps = {
  drawOneTime: false,
  margin: 0,
  selectedPoint: {},
  onClickCanvas: () => { console.log('onClickCanvas is not defined'); },
  onClickPoint: () => { console.log('onClickPoint is not defined'); },
  onMovePointStart: () => { console.log('onMovePointStart is not defined'); },
  onMovePointEnd: () => { console.log('onMovePointEnd is not defined'); },
  onDrag: () => { /* console.log('onDrag is not defined'); */ },
  onDragEnd: () => { /* console.log('onDrag is not defined'); */ },
};

export default CanvasMapContainer;