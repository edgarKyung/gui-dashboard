import React, { useCallback } from 'react';
import { Stage, Sprite, PixiComponent, useApp, Container, Graphics } from '@inlet/react-pixi';
import { Viewport as PixiViewport } from "pixi-viewport";
import classNames from 'classnames/bind';
import styles from './CanvasMap.module.scss';
import MiniMapBg from '../../../static/images/source/minimap_bg.png';

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


const size = { width: 1185, height: 479 };
const scale = { x: 2.7, y: 2.7 };

const CanvasMap = ({
  width,
  height,
  imgData,
  poseData,
  laserData,
}) => {
  const pointDraw = React.useCallback(g => {
    const pointSizeX = 5 * scale.x;
    const pointSizeY = 5 * scale.y;
    const scaledPoseX = poseData.x * scale.x - pointSizeX * 0.5;
    const scaledPoseY = poseData.y * scale.y - pointSizeY * 0.5;
    g.clear();
    g.beginFill(0xff0000, 1);
    g.drawRect(scaledPoseX, scaledPoseY, pointSizeX, pointSizeY);

    const laserSize = 3 * scale.x;
    g.beginFill(0xFFFF00, 1);
    for (let i = 0; i < laserData.length; i += 1) {
      const laser = laserData[i];
      const laserSizeX = 2 * scale.x;
      const laserSizeY = 2 * scale.y;
      const scaledLaserX = laser.x * scale.x - laserSizeX * 0.5;
      const scaledLaserY = laser.y * scale.y - laserSizeY * 0.5;
      g.drawRect(scaledLaserX, scaledLaserY, laserSize, laserSize);
    }
  }, [poseData.x, poseData.y]);

  return (
    <div className={cx('canvas-image')}>
      <Stage width={size.width} height={size.height} options={{ backgroundColor: '0xffffff', autoDensity: true }}>
        <PixiViewPortComponent width={size.width} height={size.height}>
          {imgData && (<Sprite image={imgData} option={width, height} scale={scale} />)}
          <Graphics draw={pointDraw} />
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
