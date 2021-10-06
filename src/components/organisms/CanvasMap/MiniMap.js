import React, { useCallback } from 'react';
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
const MiniMap = ({
  dataScale,
  miniMapScale,
  viewportScale,
  viewportPosition,
  imgData,
  canvasWidth,
  canvasHeight,
  dataWidth,
  dataHeight,
  laserDraw,
  pointDraw,
}) => {
  const maskBgDraw = (g) => {
    g.clear();
    g.beginFill(0x000, 0.5);
    g.lineStyle(50, 0x808080, 1)
    g.drawRect(0, 0, canvasWidth, canvasHeight);
    g.endFill()
  };
  const dataBgDraw = (g) => {
    g.clear();
    g.beginFill(0xffffff, 1);
    g.drawRect(0, 0, canvasWidth, canvasHeight);
    g.endFill()
  };
  const drawPositionSquare = ({ x, y, width, height }) => {
    const g = new PIXI.Graphics();
    g.clear();
    g.drawRect(x, y, width, height)
    g.endFill();
    return g;
  };

  const margin = 10;
  const offset = 1;
  const maskPosition = {
    x: -(viewportPosition.x / viewportScale * miniMapScale) + margin + offset,
    y: (canvasHeight * (1 - miniMapScale)) - (viewportPosition.y / viewportScale * miniMapScale) - margin - offset,
    width: canvasWidth * miniMapScale / viewportScale,
    height: canvasHeight * miniMapScale / viewportScale,
  };

  console.log(maskPosition)

  return (
    <Container
      width={canvasWidth}
      height={canvasHeight}
      scale={miniMapScale}
      alpha={1}
      position={[margin, canvasHeight * (1 - miniMapScale) - margin]}
    >
      <Graphics draw={dataBgDraw} />
      {imgData && (<Sprite image={imgData} option={{ width: dataWidth, height: dataHeight }} scale={dataScale} />)}
      <Graphics draw={laserDraw} />
      <Graphics draw={pointDraw} />
      <Graphics draw={maskBgDraw} />
      <Mask draw={() => drawPositionSquare(maskPosition)}>
        <Graphics draw={dataBgDraw} />
        {imgData && (<Sprite image={imgData} option={{ width: dataWidth, height: dataHeight }} scale={dataScale} />)}
      </Mask>
    </Container >
  )
}

export default MiniMap;
