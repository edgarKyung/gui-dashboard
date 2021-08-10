import React, { useEffect, useState, useInterval } from 'react';
import { CanvasMap } from '../components/organisms';

const CanvasMapContainer = () => {
  let canvas_padding = 10;
  let canvas_width = 0;
  let canvas_height = 0;
  let origin_x = 0;
  let origin_y = 0;
  let resolution_x = 0;
  let resolution_y = 0;
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(600);
  const [imgData, setImgData] = useState();
  const [poseData, setPoseData] = useState({x:null, y: null});

  function getCanvasPos(pose) {
    const diffX = (pose.x - origin_x) / resolution_x;
    const diffY = (pose.y - origin_y) / resolution_y;
    return {
      x: canvas_padding + diffX,
      y: canvas_padding + canvas_height - diffY
    };
  }

  useEffect(() => {
    async function getInitData(){
      const req = await fetch('http://127.0.0.1/map');
      const map = await req.json()
      
      setInterval(async () => {
        const reqStatus = await fetch('http://127.0.0.1/status');
        const status = await reqStatus.json();
        const canvasPos = getCanvasPos(status.pose);
        origin_x = map.origin.x;
        origin_y = map.origin.y;
        resolution_x = map.resolution.x;
        resolution_y = map.resolution.y;
        console.log(status.laser);
        drawMap(map);
        setPoseData(canvasPos);
        // drawLaser(canvasPos, status.pose.rz, status.laser);
      }, 1000);
    }
    getInitData();
    
  },[]);

  const drawMap = ({data, width, height}) => {
    const canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    ctx.canvas.width = width;
    ctx.canvas.height = height;

    const imageData = ctx.getImageData(0, 0, width, height);
    for (let cell = 0; cell < width * height; cell += 1) {
      let color = 230; // Movable Area
      color = (data[cell] === 100 || data[cell] > 127) ? 50 : color; // Unmovable Area
      color = (data[cell] === -1 || data[cell] === 0) ? 255 : color; // Unknown Area
      imageData.data[cell * 4 + 0] = color
      imageData.data[cell * 4 + 1] = color
      imageData.data[cell * 4 + 2] = color
      imageData.data[cell * 4 + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
    setImgData(canvas.toDataURL());
  }

  function drawLaser(canvasPos, angle, lasers) {
    const canvas = document.getElementById('map');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "yellow";

    for (let i = 0; i < lasers.length; i += 1) {
      const laser = lasers[i];
      const targetAngle = Math.PI / 2 + laser.angle + angle;
      const newPosX = canvasPos.x + Math.sin(targetAngle) * laser.range / resolution_x;
      const newPosY = canvasPos.y + Math.cos(targetAngle) * laser.range / resolution_y;
      ctx.fillRect(newPosX - 1, newPosY - 1, 2, 2);
    }
  }

  return (
    <CanvasMap
      width={width}
      height={height}
      imgData={imgData}
      poseData={poseData}
    />
  )
}

export default CanvasMapContainer;