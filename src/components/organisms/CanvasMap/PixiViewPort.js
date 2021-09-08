import React from 'react';
import PropTypes from 'prop-types'
import { PixiComponent, useApp } from '@inlet/react-pixi';
import { Viewport as PixiViewport } from "pixi-viewport";
import * as PIXI from "pixi.js";

const brush = new PIXI.Graphics();
brush.beginFill(0x000000);
brush.drawCircle(0, 0, 50);
brush.endFill();

const PixiComponentViewport = PixiComponent("ViewPort", {
  create: (props) => {
    const viewport = new PixiViewport({
      screenWidth: props.width,
      screenHeight: props.height,
      worldWidth: props.worldWidth,
      worldHeight: props.worldHeight,
      ticker: props.app.ticker,
      interaction: props.app.renderer.plugins.interaction,
      passiveWheel: false,
      stopPropagation:true,
    });
    viewport.drag().pinch().wheel().clamp({ direction: 'all' }).clampZoom({ minScale: 1, maxScale: 10 });
    
    return viewport;
  },
  didMount: (instance, parent) => {
    instance.on('drag-start', (event) => {
      instance.app.onDragStart(event);
    });
    instance.on('drag-end', (event) => {
      instance.app.onDragEnd(event);
    });
    instance.on('clicked', (event) => {
      instance.app.onClickCanvas(event);
    });
    instance.on('zoomed-end', (event) => {
      instance.app.onZoomEndCanvas(event);
    });
    instance.on('wheel', (event) => {
      instance.app.onWheel(event);
    });
    instance.on('wheel-scroll', (event) => {
      instance.app.onWheelScroll(event);
    });
    instance.on('moved-end', (event) => {
      instance.app.onMovedEnd(event);
    });
  },
});


const PixiViewPortComponent = ({ 
  width, 
  height, 
  dataWidth, 
  dataHeight, 
  children, 
  onZoomEndCanvas,
  onClickCanvas,
  onWheel,
  onWheelScroll,
  onMovedEnd,
  onDragStart,
  onDragEnd,
}) => {
  const app = useApp();
  app.onClickCanvas = onClickCanvas;
  app.onZoomEndCanvas = onZoomEndCanvas;
  app.onWheel = onWheel;
  app.onWheelScroll = onWheelScroll;
  app.onMovedEnd = onMovedEnd;
  app.onDragStart = onDragStart;
  app.onDragEnd = onDragEnd;
  return <PixiComponentViewport app={app} width={width} height={height} worldWidth={width} worldHeight={height}>{children}</PixiComponentViewport>;
};

PixiViewPortComponent.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  dataWidth: PropTypes.number,
  dataHeight: PropTypes.number,
  onClickCanvas: PropTypes.func,
  onZoomEndCanvas: PropTypes.func,
  onWheel: PropTypes.func,
  onWheelScroll: PropTypes.func,
  onMovedEnd: PropTypes.func,
}

PixiViewPortComponent.defaultProps = {
  width: 0,
  height: 0,
  poseData: {},
  laserData: [],
  points: [],
  onClickCanvas: () => { },
  onZoomEndCanvas: () => { },
  onWheel: () => { },
  onWheelScroll: () => { },
  onMovedEnd: () => { },
}

export default PixiViewPortComponent;
