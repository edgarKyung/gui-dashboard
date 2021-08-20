import React, { useCallback } from 'react';
import { Stage, Sprite, PixiComponent, useApp, Container, Graphics } from '@inlet/react-pixi';
import { Viewport as PixiViewport } from "pixi-viewport";
import classNames from 'classnames/bind';
import styles from './CanvasMap.module.scss';
import MiniMapBg from '../../../static/images/source/minimap_bg.png';
import iconPoint from '../../../static/images/ico/icon_point.png';

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
      passiveWheel: false,
    });
    viewport.drag().wheel().clamp({ direction: 'all' }).clampZoom({ minScale: 1 });
    return viewport;
  }
});

const PixiViewPortComponent = (props) => {
  const app = useApp();
  return <PixiComponentViewport app={app} {...props} />;
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

const scale = { x: 2.7, y: 2.7 };

const CanvasMap = ({
  width = 1185,
  height = 580,
  imgData,
  poseData,
  laserData,
  points,
}) => {
  const pointDraw = React.useCallback(g => {
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
      <Stage width={width} height={height} options={{ backgroundColor: '0xffffff', autoDensity: true }}>
        <PixiViewPortComponent width={width} height={height}>
          {imgData && (<Sprite image={imgData} option={width, height} scale={scale} />)}
          <Graphics draw={pointDraw} />
          { points && points.map(point => (
            <Sprite
              image={iconPoint}
              anchor={[0.5, 0.5]}
              angle={point.degree}
              x={point.x}
              y={point.y}
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

export default CanvasMap;
