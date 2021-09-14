import React, { useCallback } from 'react';
import PropTypes from 'prop-types'
import { Stage, Sprite, Container, Graphics, PixiComponent } from '@inlet/react-pixi';
import classNames from 'classnames/bind';
import styles from './CanvasMap.module.scss';
import iconPoint from '../../../static/images/ico/icon_point.png';
import iconPointOn from '../../../static/images/ico/icon_point_on.png';
import tempWallBg from '../../../static/images/source/temp.png';
import Draggable from './Draggable';
import PixiViewPort from './PixiViewPort';
import MiniMap from './MiniMap';

const cx = classNames.bind(styles);

const CanvasMap = ({
  ableWall,
  disableWall,
  undefinedWall,

  disableViewPort,
  viewportScale,
  viewportPosition,
  scale,
  canvasWidth,
  canvasHeight,
  dataWidth,
  dataHeight,
  imgData,
  poseData,
  laserData,
  points,
  selectedPoint,
  disabledDrag,
  onClickPoint,
  onZoomEndCanvas,
  onClickCanvas,
  onMovePointStart,
  onMovePointEnd,
  onMoved,
  onDrag,
}) => {
  const laserDraw = useCallback(g => {
    g.clear();
    const laserSize = 2 * scale;
    for (let i = 0; i < laserData.length; i += 1) {
      const laser = laserData[i];
      const laserSizeX = 2 * scale;
      const laserSizeY = 2 * scale;
      const scaledLaserX = laser.x * scale - laserSizeX * 0.5;
      const scaledLaserY = laser.y * scale - laserSizeY * 0.5;
      g.beginFill(0x7A00FA, 0.75);
      g.drawCircle(scaledLaserX, scaledLaserY, laserSize);
      g.endFill();
    }
  }, [laserData]);

  const pointDraw = useCallback(g => {
    g.clear();
    const pointSizeX = 5 * scale;
    const pointSizeY = 5 * scale;
    const scaledPoseX = poseData.x * scale - pointSizeX * 0.5;
    const scaledPoseY = poseData.y * scale - pointSizeY * 0.5;
    g.beginFill(0xFA0135, 1);
    g.drawCircle(scaledPoseX, scaledPoseY, pointSizeX);
    g.endFill();
  }, [poseData.x, poseData.y]);

  const wallDraw = useCallback((g, x, y, type) => {
    let color;
    switch (type) {
      case 'able':
        color = 0xffffff;
        break;
      case 'disable':
        color = 0xd8d8d8;
        break;
      case 'undefined':
        color = 0x252525;
        break;
    }
    g.clear();
    g.beginFill(color, 1);
    g.drawCircle(x, y, 30);
    g.endFill();
  }, []);

  return (
    <div className={cx('canvas-image')}>
      <Stage width={canvasWidth} height={canvasHeight} options={{ backgroundColor: 0xFFFFFF, autoDensity: true }}>
        <PixiViewPort
          disableViewPort={disableViewPort}
          width={canvasWidth}
          height={canvasHeight}
          dataWidth={dataWidth}
          dataHeight={dataHeight}
          onClickCanvas={onClickCanvas}
          onZoomEndCanvas={onZoomEndCanvas}
          onMoved={onMoved}
        >
          {imgData && (
            <Sprite
              image={imgData}
              option={{ width: dataWidth, height: dataHeight }}
              interactive
              scale={scale}
              pointermove={onDrag}
            />
          )}

          {ableWall.map(wall => (
            <Sprite
              image={tempWallBg}
              scale={{ x: 1 / wall.scale, y: 1 / wall.scale }}
              anchor={0.5}
              x={wall.x}
              y={wall.y}
            />
          ))}
          {/* {ableWall.map(wall => (
            <Graphics draw={(g) => wallDraw(g, wall.x, wall.y, 'able')} />            
          ))} */}
          <Graphics draw={laserDraw} />
          <Graphics draw={pointDraw} />
          {(points.length > 0) && points.map((point, idx) => (
            <Draggable
              key={idx}
              image={selectedPoint.id === point.id ? iconPointOn : iconPoint}
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
        <MiniMap
          dataScale={scale}
          miniMapScale={.25}
          viewportScale={viewportScale}
          viewportPosition={viewportPosition}
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          dataWidth={dataWidth}
          dataHeight={dataHeight}
          imgData={imgData}
          points={points}
          laserDraw={laserDraw}
          pointDraw={pointDraw}
        />
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
  onDrag: PropTypes.func,
}

CanvasMap.defaultProps = {
  width: 0,
  height: 0,
  poseData: {},
  laserData: [],
  points: [],
  viewportScale: 0,
  selectedPoint: {},
  onClickPoint: () => { },
  onClickCanvas: () => { },
  onMovePointStart: () => { },
  onMovePointEnd: () => { },
  onDrag: () => { },
}
export default CanvasMap;
