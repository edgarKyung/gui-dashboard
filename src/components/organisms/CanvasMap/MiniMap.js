import React, { useCallback, useRef } from 'react';
import { Sprite, Container, Graphics, PixiComponent } from '@inlet/react-pixi';
import classNames from 'classnames/bind';
import styles from './CanvasMap.module.scss';
import * as PIXI from "pixi.js";

const cx = classNames.bind(styles);

const Mask = PixiComponent("Mask",
  {
    create: ({ draw }) => {
      const container = new PIXI.Container();
      container.mask = draw();
      return container;
    },
    applyProps: (instance, oldProps, { draw }) => {
      instance.mask = draw();
    }
  },
);

const MapData = ({
  imgData,
  dataWidth,
  dataHeight,
  rotate,
  scale,
  canvasWidth,
  canvasHeight,
  wall,
}) => {
  const dataBgDraw = useCallback((g) => {
    g.clear();
    g.beginFill(0xfffffff, 1);
    g.drawRect(0, 0, canvasWidth, canvasHeight);
    g.endFill()
  }, []);

  const calRotatePosition = (cx, cy, x, y, angle) => {
    let radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
  }  
  const lineDraw = (g) => {
    g.clear();
    wall.forEach(data => {
      data.forEach(wallData => {
        const { x, y, rotate, scale: drawScale,  size, type } = wallData;
        let color;
        color = (type === 'able') ? 0xFFFFFF : color;
        color = (type === 'undefined') ? 0xF0F0EC : color;
        color = (type === 'disable') ? 0x1E1E1E : color;
        g.beginFill(color, 1);
      
        const [newX, newY] = calRotatePosition(canvasWidth/2, canvasHeight/2, x, y, rotate);
        g.drawCircle(newX, newY, size / 2);
      });  
    })
    g.endFill();
  };
  return (
    <>
      <Graphics draw={dataBgDraw}/>
      <Container 
        angle={rotate} 
        pivot={[canvasWidth/2, canvasHeight/2]}
        position={[canvasWidth / 2, canvasHeight / 2]}        
      >
        {imgData && (
          <Sprite 
            image={imgData} 
            option={{ width: dataWidth, height: dataHeight }} 
            scale={scale} 
            anchor={.5} 
            x={(canvasWidth / 2)  } 
            y={(canvasHeight /2)  } 

          />
        )}
        <Container
          position={[
            (canvasWidth / 2) - ((dataWidth * scale) / 2), 
            (canvasHeight / 2) - ((dataHeight * scale) / 2)
          ]}
        >
          <Graphics draw={lineDraw}/>
        </Container>
      </Container>
    </>    
  )
};

const MiniMap = ({
  rotate,
  dataScale,
  miniMapScale,
  viewportScale,
  viewportPosition,
  imgData,
  canvasWidth,
  canvasHeight,
  dataWidth,
  dataHeight,
  wall,
}) => {
  const miniMapBlackBgDraw = useCallback((g) => {
    g.clear();
    g.beginFill(0x000, 0.5);
    g.lineStyle(50, 0x808080, 1)
    g.drawRect(0, 0, canvasWidth, canvasHeight);
    g.endFill()
  }, []);
  const drawPositionSquare = useCallback(({ x, y, width, height }) => {
    const g = new PIXI.Graphics();
    g.clear();
    g.drawRect(x, y, width, height)
    g.endFill();
    return g;
  }, []);

  const margin = 10;
  const maskPosition = {
    x: -(viewportPosition.x / viewportScale * miniMapScale) + margin,
    y: (canvasHeight * (1 - miniMapScale)) - (viewportPosition.y / viewportScale * miniMapScale) - margin,
    width: canvasWidth * miniMapScale / viewportScale,
    height: canvasHeight * miniMapScale / viewportScale,
  };
  
  return (
    <Container
      width={canvasWidth}
      height={canvasHeight}
      scale={miniMapScale}
      alpha={1}
      position={[margin, canvasHeight * (1 - miniMapScale) - margin]}
    >
      <MapData 
        imgData={imgData}
        dataWidth={dataWidth}
        dataHeight={dataHeight}
        rotate={rotate}
        scale={dataScale}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        wall={wall}
      />
      <Graphics draw={miniMapBlackBgDraw} />
      <Mask draw={drawPositionSquare.bind(this, maskPosition)}>
        <MapData 
          imgData={imgData}
          dataWidth={dataWidth}
          dataHeight={dataHeight}
          rotate={rotate}
          scale={dataScale}
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          wall={wall}
        />
      </Mask>
    </Container >
  )
}

export default React.memo(MiniMap);
