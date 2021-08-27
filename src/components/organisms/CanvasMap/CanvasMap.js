import React, { useCallback } from 'react';
import PropTypes from 'prop-types'
import { Stage, Sprite, PixiComponent, useApp, Container, Graphics } from '@inlet/react-pixi';
import { Viewport as PixiViewport } from "pixi-viewport";
import classNames from 'classnames/bind';
import styles from './CanvasMap.module.scss';
import MiniMapBg from '../../../static/images/source/minimap_bg.png';
import iconPoint from '../../../static/images/ico/icon_point.png';
import Draggable from './Draggable';
const cx = classNames.bind(styles);

const PixiComponentViewport = PixiComponent("ViewPort", {
  create: (props) => {
    const viewport = new PixiViewport({
      screenWidth: props.width,
      screenHeight: props.height,
      worldWidth: props.width,
      worldHeight: props.height,
      ticker: props.app.ticker,
      interaction: props.app.renderer.plugins.interaction,
      // passiveWheel: false,
      // stopPropagation:true,
    });
    viewport.drag().wheel().clamp({ direction: 'all' }).clampZoom({ minScale: 1 });
    return viewport;
  },
  didMount: (instance, parent) => {
    instance.on('clicked', (event) => {
      // if(onClick) onClick(event);
      instance.app.onClickCanvas(event);
    });
  },
});


const PixiViewPortComponent = ({ width, height, children, onClickCanvas }) => {
  const app = useApp();
  app.onClickCanvas = onClickCanvas;
  return <PixiComponentViewport app={app} width={width} height={height} >{children}</PixiComponentViewport>;
};

const MiniMap = ({
  imgData,
  width,
  height,
}) => {

  return (
    <Container
      width={width}
      height={height}
    >
      {/* <Sprite image={txtBG} options={width, height}/> */}
      <Sprite
        image={MiniMapBg}
      />
    </Container>
  )
}

const scale = { x: 3.5, y: 3.5 };

const CanvasMap = ({
  width,
  height,
  imgData,
  poseData,
  laserData,
  points,
  disabledDrag,
  onClickPoint,
  onClickCanvas,
  onMovePointStart,
  onMovePointEnd,
}) => {

  const pointDraw = useCallback(g => {
    g.clear();

    const laserSize = 3 * scale.x;
    for (let i = 0; i < laserData.length; i += 1) {
      const laser = laserData[i];
      const laserSizeX = 2 * scale.x;
      const laserSizeY = 2 * scale.y;
      const scaledLaserX = laser.x * scale.x - laserSizeX * 0.5;
      const scaledLaserY = laser.y * scale.y - laserSizeY * 0.5;
      g.beginFill(0xFA0135, 1);
      g.drawRect(scaledLaserX, scaledLaserY, laserSize, laserSize);
    }

    const pointSizeX = 3 * scale.x;
    const pointSizeY = 3 * scale.y;
    const scaledPoseX = poseData.x * scale.x - pointSizeX * 0.5;
    const scaledPoseY = poseData.y * scale.y - pointSizeY * 0.5;
    g.beginFill(0x7A00FA, 1);
    g.drawCircle(scaledPoseX, scaledPoseY, pointSizeX);
    g.endFill();
  }, [poseData.x, poseData.y]);

  return (
    <div className={cx('canvas-image')}>
      <Stage width={width} height={height} options={{ backgroundColor: 0xFFFFFF, autoDensity: true }}>
        <PixiViewPortComponent
          width={width}
          height={height}
          onClickCanvas={onClickCanvas}
        // activeAddMove={activeAddMove}
        >
          {imgData && (<Sprite image={imgData} option={width, height} scale={scale} />)}
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
              onClickPoint={onClickPoint}
              onMovePointStart={onMovePointStart}
              onMovePointEnd={onMovePointEnd}
            />
          ))}

        </PixiViewPortComponent>
        {/* { imgData && (<MiniMap 
          imgData={imgData}
          width={500}
          height={290}
        />) } */}
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
  onClickPoint: () => { },
  onClickCanvas: () => { },
  onMovePointStart: () => { },
  onMovePointEnd: () => { },
}
export default CanvasMap;
