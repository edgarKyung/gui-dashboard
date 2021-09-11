import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux'
import { CanvasMap } from '../components/organisms';
import * as RobotApi from '../lib/Robot';
import * as FileApi from '../lib/File';

let drawInterval = null;
let map = { origin: {}, resolution: {} };

const CanvasMapContainer = ({
  drawType,
  disableViewPort,
  canvasWidth,
  canvasHeight,
  points,
  disabledDrag = true,
  onClickCanvas,
  onClickPoint,
  onMovePointStart,
  onMovePointEnd,
  onDrag,
  margin,
  selectedPoint,
}) => {
  const canvas = document.createElement('canvas');
  let calcCanvasWidth = canvasWidth - margin;
  let calcCanvasHeight = canvasHeight - margin;
  const canvas_padding = 10;
  const [dataWidth, setDataWidth] = useState(0);
  const [dataHeight, setDataHeight] = useState(0);
  const [scale, setScale] = useState(1);
  const [imgData, setImgData] = useState();
  const [poseData, setPoseData] = useState({ x: null, y: null });
  const [laserData, setLaserData] = useState([{ x: null, y: null }]);

  const [viewportScale, setViewportScale] = useState(1);
  const [viewportPosition, setViewportPosition] = useState({ x: 0, y: 0 });
  const {
    ableWall,
    disableWall,
    undefinedWall,
  } = useSelector((store) => ({
    ableWall: store.wall.get('able'),
    disableWall: store.wall.get('disable'),
    undefinedWall: store.wall.get('undefined'),
  }));

  function convertRealToCanvas(pose) {
    const diffX = (pose.x - map.origin.x) / map.resolution.x;
    const diffY = (pose.y - map.origin.y) / map.resolution.y;
    return {
      x: canvas_padding + diffX,
      y: canvas_padding + map.height - diffY
    };
  }

  const drawMap = ({ data, width, height }) => {
    const ctx = canvas.getContext('2d');
    ctx.canvas.width = width + 2 * canvas_padding;
    ctx.canvas.height = height + 2 * canvas_padding;

    const cache = {};
    const imageData = ctx.getImageData(0, 0, width, height);
    for (let cell = 0; cell < width * height; cell += 1) {
      cache[data[cell]] = cache[data[cell]] || [];
      cache[data[cell]].push(cell);
      let color = [255, 255, 255]; // Unknown Area
      color = (data[cell] >= 0) ? [240, 240, 236] : color; // Movable Area
      // color = (data[cell] > 40) ? [255, 255, 255] : color; // Unknown Area
      // color = (data[cell] > 70) ? [30, 30, 30] : color; // Unmovable Area
      color = (data[cell] > 127) ? [30, 30, 30] : color; // Unmovable Area
      imageData.data[cell * 4 + 0] = color[0]
      imageData.data[cell * 4 + 1] = color[1]
      imageData.data[cell * 4 + 2] = color[2]
      imageData.data[cell * 4 + 3] = 255;
    }
    ctx.putImageData(imageData, canvas_padding, canvas_padding);
    setImgData(canvas.toDataURL());
  }

  function getLaserData(robotPose, angle, sensor) {
    const data = [];
    if (map.resolution.x && map.resolution.y) {
      for (let i = 0; i < sensor.laser?.length; i += 1) {
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
    // map.scale = Math.min(canvasWidth / (map.width), canvasHeight / (map.height));
    map.scale = Math.min(calcCanvasWidth / (map.width + 20), calcCanvasHeight / (map.height + 20));
    setScale(map.scale);
    setDataWidth(map.width);
    setDataHeight(map.height);
    FileApi.setMapData(map);
  }

  async function drawCanvas() {
    await setMapData();
    const pose = await RobotApi.getPose();
    const sensor = await RobotApi.getSensor();
    const robotPose = convertRealToCanvas(pose);
    const laserData = getLaserData(robotPose, pose.rz, sensor);
    drawMap(map);
    setLaserData(laserData);
    setPoseData(robotPose);
  }

  useEffect(() => {
    drawCanvas();
    drawInterval = setInterval(drawCanvas, 2000);
    return () => {
      clearInterval(drawInterval);
    }
  }, []);

  const handleZoomEndCanvas = (e) => {
    console.log('zoom end', e);
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

  const handleGlobalMove = (e) => {
    const interaction = e.data;
    if (interaction.pressure > 0) {
      const transPose = _getLocalPoseFromGlobalPose(interaction.global);
      console.log('global', interaction.global);
      console.log(transPose);
      onDrag(transPose);
    }
  }

  return (
    <CanvasMap
      ableWall={ableWall}
      disableWall={disableWall}
      undefinedWall={undefinedWall}

      drawType={drawType}
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
    />
  )
}

CanvasMapContainer.defaultProps = {
  margin: 0,
  selectedPoint: {},
  onClickCanvas: () => { console.log('onClickCanvas is not defined'); },
  onClickPoint: () => { console.log('onClickPoint is not defined'); },
  onMovePointStart: () => { console.log('onMovePointStart is not defined'); },
  onMovePointEnd: () => { console.log('onMovePointEnd is not defined'); },
  onDrag: () => { console.log('onDrag is not defined'); }
};

export default CanvasMapContainer;