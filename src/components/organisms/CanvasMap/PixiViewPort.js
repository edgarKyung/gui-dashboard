import React from 'react';
import PropTypes from 'prop-types'
import { PixiComponent, useApp } from '@inlet/react-pixi';
import { Viewport as PixiViewport } from "pixi-viewport";
import classNames from 'classnames/bind';
import styles from './CanvasMap.module.scss';
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
      stopPropagation:true,
    });
    viewport.drag().pinch().wheel().clamp({ direction: 'all' }).clampZoom({ minScale: 1, maxScale: 10 });
    return viewport;
  },
  didMount: (instance, parent) => {
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
  children, 
  onZoomEndCanvas,
  onClickCanvas,
  onWheel,
  onWheelScroll,
  onMovedEnd,
}) => {
  const app = useApp();
  app.onClickCanvas = onClickCanvas;
  app.onZoomEndCanvas = onZoomEndCanvas;
  app.onWheel = onWheel;
  app.onWheelScroll = onWheelScroll;
  app.onMovedEnd = onMovedEnd;
  return <PixiComponentViewport app={app} width={width} height={height} >{children}</PixiComponentViewport>;
};

PixiViewPortComponent.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
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
