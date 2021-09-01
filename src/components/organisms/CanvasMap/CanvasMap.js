import React, { useCallback } from 'react';
import PropTypes from 'prop-types'
import { Stage, Sprite, Container, Graphics, PixiComponent  } from '@inlet/react-pixi';
import classNames from 'classnames/bind';
import styles from './CanvasMap.module.scss';
import MiniMapBg from '../../../static/images/source/minimap_bg.png';
import iconPoint from '../../../static/images/ico/icon_point.png';
import Draggable from './Draggable';
import PixiViewPort from './PixiViewPort';
import * as PIXI from "pixi.js";

const cx = classNames.bind(styles);

const drawCircle = ({x, y, width, height}) => {
  const g = new PIXI.Graphics();
  g.clear();
  g.beginFill();
  g.drawRect(x, y, width, height)
  g.endFill();
  return g;
};

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
  miniMapScale,
  viewportScale,
  viewportPosition,
  imgData,
  worldWidth,
  worldHeight,
  laserDraw,
  pointDraw,
}) => {
  const maskBgDraw = (g) => {
    g.clear();
    g.beginFill(0x000, 0.5);
    g.drawRect(0, 0, worldWidth, worldHeight);
    console.log(worldWidth, worldHeight);
    g.endFill()
  };
  const maskPosition = {
    x: -(viewportPosition.x * miniMapScale),
    y: -(viewportPosition.y * miniMapScale),
    width: ( worldWidth / viewportScale * miniMapScale),
    height: ( worldHeight / viewportScale * miniMapScale),
  };
  return (
    <Container
      width={worldWidth}
      height={worldHeight}
      scale={miniMapScale}
      alpha={1}
    >
      {imgData && ( <Sprite image={imgData} option={{width: worldHeight, height: worldHeight}} /> )}
      <Graphics draw={laserDraw} />
      <Graphics draw={pointDraw} />
      <Graphics draw={maskBgDraw} />
      <Mask draw={() => drawCircle(maskPosition)}>
        {/* <Graphics draw={maskBgDraw} /> */}
        {imgData && ( <Sprite image={imgData} option={{width: worldHeight, height: worldHeight}} /> )}
      </Mask>
    </Container>
  )
}

const CanvasMap = ({
  viewportScale,
  viewportPosition,
  scale,
  width,
  height,
  imgData,
  poseData,
  laserData,
  points,
  disabledDrag,
  onClickPoint,
  onZoomEndCanvas,
  onMovedEnd,
  onClickCanvas,
  onMovePointStart,
  onMovePointEnd,
}) => {

  const laserDraw = useCallback(g => {
    g.clear();

    const laserSize = 3 * scale;
    for (let i = 0; i < laserData.length; i += 1) {
      const laser = laserData[i];
      const laserSizeX = 2 * scale;
      const laserSizeY = 2 * scale;
      const scaledLaserX = laser.x * scale - laserSizeX * 0.5;
      const scaledLaserY = laser.y * scale - laserSizeY * 0.5;
      g.beginFill(0xFA0135, 1);
      g.drawRect(scaledLaserX, scaledLaserY, laserSize, laserSize);
    }
    g.endFill();
  }, [laserData]);

  const pointDraw = useCallback(g => {
    g.clear();
    const pointSizeX = 3 * scale;
    const pointSizeY = 3 * scale;
    const scaledPoseX = poseData.x * scale - pointSizeX * 0.5;
    const scaledPoseY = poseData.y * scale - pointSizeY * 0.5;
    g.beginFill(0x7A00FA, 1);
    g.drawCircle(scaledPoseX, scaledPoseY, pointSizeX);
    g.endFill();
  }, [poseData.x, poseData.y]);

  return (
    <div className={cx('canvas-image')}>
      <Stage width={width} height={height} options={{ backgroundColor: 0xFFFFFF, autoDensity: true }}>
        <PixiViewPort
          width={width}
          height={height}
          onClickCanvas={onClickCanvas}
          onZoomEndCanvas={onZoomEndCanvas}
          onMovedEnd={onMovedEnd}
        >
          {imgData && (<Sprite image={imgData} option={width, height} scale={scale} />)}
          <Graphics draw={laserDraw} />
          <Graphics draw={pointDraw} />
          {(points.length > 0) && points.map((point, idx) => (
            <Draggable
              key={idx}
              image={iconPoint}
              id={point.id}
              x={point.x}
              y={point.y}
              disabled={disabledDrag}
              angle={point.degree}
              viewportScale={viewportScale}
              onClickPoint={onClickPoint}
              onMovePointStart={onMovePointStart}
              onMovePointEnd={onMovePointEnd}
            />
          ))}

        </PixiViewPort>
        {/* <MiniMap 
          miniMapScale={.25}
          viewportScale={viewportScale}
          viewportPosition={viewportPosition}
          worldWidth={width}
          worldHeight={height}
          imgData={imgData}
          points={points}
          laserDraw={laserDraw}
          pointDraw={pointDraw}
        /> */}
      </Stage>
    </div>
  )
};



CanvasMap.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  poseData: PropTypes.object,
  laserData: PropTypes.array,
  points: PropTypes.array,
  viewportScale: PropTypes.number,
  disabledDrag: PropTypes.bool,
  onClickPoint: PropTypes.func,
  onClickCanvas: PropTypes.func,
  onMovePointStart: PropTypes.func,
  onMovePointEnd: PropTypes.func,
}

CanvasMap.defaultProps = {
  width: 0,
  height: 0,
  poseData: {},
  laserData: [],
  points: [],
  viewportScale: 0,
  onClickPoint: () => { },
  onClickCanvas: () => { },
  onMovePointStart: () => { },
  onMovePointEnd: () => { },
}
export default CanvasMap;
