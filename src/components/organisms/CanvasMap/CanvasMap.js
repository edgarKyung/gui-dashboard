import React from 'react';
import { Stage, Sprite, PixiComponent, useApp, Container } from '@inlet/react-pixi';
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
        option={{
          backgroundColor: 0xeef1f5
        }} 
      >
        {/* <Sprite image={txtBG} options={width, height}/> */}
        <Sprite 
          image={MiniMapBg} 
        />
      </Container>
  )
}


const size = {
  width:1066,
  height:913,
}

const CanvasMap = ({
  imgData,
  width,
  height,
}) => (
  <div className={cx('canvas-image')}>
      <Stage width={size.width} height={size.height} options={ {backgroundAlpha: .5, autoDensity: true}}>
        <PixiViewPortComponent width={size.width} height={size.height}>
          { imgData && (<Sprite image={imgData} option={width, height} scale={{ x: 3, y: 3 }} /> ) }
        </PixiViewPortComponent>
        { imgData && (<MiniMap 
          imgData={imgData}
          width={500}
          height={290}
        />) }
      </Stage>
  </div>
);

export default CanvasMap;
