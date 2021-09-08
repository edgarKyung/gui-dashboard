import React, { useEffect, useState, useInterval } from 'react';
import { CanvasMap } from '../components/organisms';
import * as RobotApi from '../lib/Robot';
import * as FileApi from '../lib/File';

let drawInterval = null;
let map = { origin: {}, resolution: {} };

const CanvasMapContainer = ({
  drawType,
  canvasWidth,
  canvasHeight,
  points,
  disabledDrag = true,
  onClickCanvas,
  onClickPoint,
  onMovePointStart,
  onMovePointEnd,
}) => {
  const canvas = document.createElement('canvas');
  // let canvasWidth = 1180;
  // let canvasHeight = 1125;
  const canvas_padding = 10;
  const [dataWidth, setDataWidth] = useState(0);
  const [dataHeight, setDataHeight] = useState(0);
  const [scale, setScale] = useState(1);
  const [imgData, setImgData] = useState();
  const [poseData, setPoseData] = useState({ x: null, y: null });
  const [laserData, setLaserData] = useState([{ x: null, y: null }]);

  const [viewportScale, setViewportScale] = useState(1);
  const [viewportPosition, setViewportPosition] = useState({ x: 0, y: 0 });

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

    const imageData = ctx.getImageData(0, 0, width, height);
    for (let cell = 0; cell < width * height; cell += 1) {
      let color = [255, 255, 255]; // Unknown Area
      color = (data[cell] >= 0) ? [240, 240, 236] : color; // Movable Area
      color = (data[cell] > 40) ? [255, 255, 255] : color; // Unmovable Area
      color = (data[cell] > 70) ? [30, 30, 30] : color; // Unmovable Area
      imageData.data[cell * 4 + 0] = color[0]
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
    map.scale = Math.min(canvasWidth / map.width, canvasHeight / map.height);
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
    const { scaleX } = e.lastViewport;
    setViewportScale(scaleX);
  }

  const handleMovedEnd = (e) => {
    const { x, y } = e.lastViewport;
    console.log('moved end', x, y, viewportScale);
    setViewportPosition({ x, y });
  }


  return (
    <CanvasMap
      viewportScale={viewportScale}
      viewportPosition={viewportPosition}
      scale={scale}
      canvasWidth={canvasWidth}
      canvasHeight={canvasHeight}
      dataWidth={dataWidth}
      dataHeight={dataHeight}
      imgData={imgData}
      poseData={poseData}
      laserData={laserData}
      points={points}
      disabledDrag={disabledDrag}
      onClickPoint={onClickPoint}
      onClickCanvas={onClickCanvas}
      onZoomEndCanvas={handleZoomEndCanvas}
      onMovedEnd={handleMovedEnd}
      onMovePointStart={onMovePointStart}
      onMovePointEnd={onMovePointEnd}
    />
  )
}

export default CanvasMapContainer;