import React, { useEffect, useState } from 'react';
import { Stage, Sprite } from '@inlet/react-pixi';

import * as PIXI from "pixi.js";
const PointContainer = () => {
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(400);
  const [imgData, setImgData] = useState();
  const [points, setPoints] = useState([]);
  useEffect(() => {
    async function getInitData(){
      const req = await fetch('http://localhost:8000');
      const map = await req.json();

      draw(map);
    }
    getInitData();
    setPoints([
      { x:50, y:50, },
      { x:150, y:50, },
      { x:150, y:150, },
      { x:50, y:150, },
    ]);

  },[]);
  const draw = ({data, width, height}) => {
    const canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    const imageData = ctx.getImageData(0, 0, width, height);
    for (let row = 0; row < width * height; row += 1) {
        if (data[row] === 100) {
            imageData.data[row * 4 + 0] = 77;
            imageData.data[row * 4 + 1] = 77;
            imageData.data[row * 4 + 2] = 77;
            imageData.data[row * 4 + 3] = 255;
            continue;
        }
        if (data[row] > 30 || data[row] === -1) {
            imageData.data[row * 4 + 0] = 180;
            imageData.data[row * 4 + 1] = 180;
            imageData.data[row * 4 + 2] = 180;
            imageData.data[row * 4 + 3] = 255;
            continue;
        }
        imageData.data[row * 4 + 0] = 255 - data[row] * 2;
        imageData.data[row * 4 + 1] = 255 - data[row] * 2;
        imageData.data[row * 4 + 2] = 255 - data[row] * 2;
        imageData.data[row * 4 + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
    setWidth(width);
    setHeight(height);
    setImgData(canvas.toDataURL());
  }

  const stageProps = {
    width : width,
    height : height,
    options: {
      backgroundAlpha: .5,
    },
  }
  return (
    <div>
      <Stage {...stageProps}>
        { imgData && (<Sprite texture={PIXI.Texture.from(imgData)} option={width, height} /> ) }
        { points.map(point => (
          <Sprite image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png" x={point.x} y={point.y} />
        ))}
        
      </Stage>
    </div>
  )
}

export default PointContainer;