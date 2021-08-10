import React, { useCallback } from 'react';
import { Stage, Sprite, PixiComponent, useApp, Container, Graphics } from '@inlet/react-pixi';
import { Viewport as PixiViewport } from "pixi-viewport";
import classNames from 'classnames/bind';
import styles from './CanvasMap.module.scss';
import MiniMapBg from '../../../static/images/source/minimap_bg.png';

const cx = classNames.bind(styles);
const PixiComponentViewport = PixiComponent("ViewPort",{
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
    viewport.drag().wheel().clamp({ direction: 'all' }).clampZoom({minScale:1});
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


const size = {
  width:1185,
  height:479,
}

const CanvasMap = ({
  width,
  height,
  imgData,
  poseData,
}) => {
  const pointDraw = React.useCallback(g => {
    g.clear();
    g.beginFill(0xff0000, 1);
    g.drawRect(poseData.x * 2 , Math.abs(poseData.y) * 5, 15, 15);
    // g.drawRect(poseData.x, poseData.y, 15, 15);
  }, [poseData.x, poseData.y]);
  
  return(
    <div className={cx('canvas-image')}>
      <Stage width={size.width} height={size.height} options={ {backgroundColor: '0xffffff', autoDensity: true}}>
        <PixiViewPortComponent width={size.width} height={size.height}>
          { imgData && (<Sprite image={imgData} option={width, height} scale={{ x: 3, y: 3 }} /> ) }
          <Graphics draw={pointDraw}/>
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
