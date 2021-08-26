import React, { useEffect, useState, useInterval } from 'react';
import { CanvasMap } from '../components/organisms';
import * as RobotApi from '../lib/Robot';

let drawInterval = null;

const CanvasMapContainer = ({
  points,
  canvasWidth = 600,
  canvasHeight = 600,
  disabledDrag = true,
  onClickCanvas,
  onClickPoint,
  onMovePointStart,
  onMovePointEnd,
}) => {
  const canvas = document.createElement('canvas');

  let canvas_padding = 10;
  let canvas_width = 0;
  let canvas_height = 0;
  let origin_x = 0;
  let origin_y = 0;
  let resolution_x = 0;
  let resolution_y = 0;
  const [width, setWidth] = useState(canvasWidth);
  const [height, setHeight] = useState(canvasHeight);
  const [imgData, setImgData] = useState();
  const [poseData, setPoseData] = useState({ x: null, y: null });
  const [laserData, setLaserData] = useState([{ x: null, y: null }]);

  function getCanvasPos(pose) {
    const diffX = (pose.x - origin_x) / resolution_x;
    const diffY = (pose.y - origin_y) / resolution_y;
    return {
      x: canvas_padding + diffX,
      y: canvas_padding + canvas_height - diffY
    };
  }

  const drawMap = ({ data, width, height }) => {
    const ctx = canvas.getContext('2d');
    ctx.canvas.width = width + 2 * canvas_padding;
    ctx.canvas.height = height + 2 * canvas_padding;

    const imageData = ctx.getImageData(0, 0, width, height);
    for (let cell = 0; cell < width * height; cell += 1) {
      let color = [240, 240, 236]; // Movable Area
      color = (data[cell] === 100 || data[cell] > 127) ? [30, 30, 30] : color; // Unmovable Area
      color = (data[cell] === -1) ? [255, 255, 255] : color; // Unknown Area
      imageData.data[cell * 4 + 0] = color[0]
      imageData.data[cell * 4 + 1] = color[1]
      imageData.data[cell * 4 + 2] = color[2]
      imageData.data[cell * 4 + 3] = 255;
    }
    ctx.putImageData(imageData, canvas_padding, canvas_padding);
    setImgData(canvas.toDataURL());
  }

  function getLaserData(canvasPos, angle, lasers) {
    const data = [];
    if (resolution_x && resolution_y) {
      for (let i = 0; i < lasers.length; i += 1) {
        const laser = lasers[i];
        const targetAngle = Math.PI / 2 + laser.angle + angle;
        const x = canvasPos.x + Math.sin(targetAngle) * laser.range / resolution_x;
        const y = canvasPos.y + Math.cos(targetAngle) * laser.range / resolution_y;
        data.push({ x, y });
      }
    }
    return data;
  }

  async function getMapData() {
    const map = await RobotApi.getMap('office');
    canvas_width = map.width;
    canvas_height = map.height;
    origin_x = map.origin.x;
    origin_y = map.origin.y;
    resolution_x = map.resolution.x;
    resolution_y = map.resolution.y;
    return map;
  }

  async function drawCanvas() {
    const map = await getMapData();
    const pose = await RobotApi.getPose();
    const sensor = await RobotApi.getSensor();
    const canvasPos = getCanvasPos(pose);
    const laserData = getLaserData(canvasPos, pose.rz, sensor);
    drawMap(map);
    setLaserData(laserData);
    setPoseData(canvasPos);
  }

  useEffect(() => {
    if (drawInterval) {
      clearInterval(drawInterval);
      drawInterval = null;
    }
    drawInterval = setInterval(drawCanvas, 250);
  }, []);

  return (
    <CanvasMap
      width={width}
      height={height}
      imgData={imgData}
      poseData={poseData}
      laserData={laserData}
      points={points}
      disabledDrag={disabledDrag}
      onClickPoint={onClickPoint}
      onClickCanvas={onClickCanvas}
      onMovePointStart={onMovePointStart}
      onMovePointEnd={onMovePointEnd}
    />
  )
}

export default CanvasMapContainer;