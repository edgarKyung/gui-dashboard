import React, { useEffect, useState } from 'react';
import { Stage, Sprite, Container, } from '@inlet/react-pixi';
const MapContainer = () => {
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(600);
  const [imgData, setImgData] = useState();
  useEffect(() => {
    async function getInitData(){
      const req = await fetch('http://localhost:8000');
      const map = await req.json();

      draw(map);
    }
    getInitData();
    
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
    width:800,
    height:640,
    options: {
      backgroundAlpha: .5,
    },
  }
  return (
    <div>
      <Stage {...stageProps}>
        { imgData && (
          <Sprite 
            image={imgData} 
            option={width, height} 
            scale={{ x: 0.5, y: 0.5 }} 
            position={{x:600, y:0}}
          /> 
        ) }
        <Container>
          { imgData && (<Sprite image={imgData} option={width, height} scale={{ x: 2, y: 2 }} /> ) }
        </Container>
      </Stage>
    </div>
  )
}

export default MapContainer;