import React, { useCallback } from 'react';
import PropTypes from 'prop-types'
import { Stage, Sprite, Graphics, Container } from '@inlet/react-pixi';
import classNames from 'classnames/bind';
import styles from './CanvasMap.module.scss';
import iconPoint from '../../../static/images/ico/icon_point.png';
import iconPointOn from '../../../static/images/ico/icon_point_on.png';
import virtualWallStart from '../../../static/images/source/virtual_wall_start.png';
import rotationIncrease from '../../../static/images/btn/btn_redo.png';
import rotationDecrease from '../../../static/images/btn/btn_undo.png';
import reFresh from '../../../static/images/btn/btn_refresh.png';
import Draggable from './Draggable';
import PixiViewPort from './PixiViewPort';
import MiniMap from './MiniMap';
import * as PIXI from "pixi.js";
console.log('PIXI', PIXI);

const cx = classNames.bind(styles);

const calRotatePosition = (cx, cy, x, y, angle) => {
  let radians = (Math.PI / 180) * angle,
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
      ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
  return [nx, ny];
}  

const percentage = (partialValue, totalValue) => {
  return (100 * partialValue) / totalValue;
} 

const DrawLine = React.memo(({ data }) => {
  const _drawLine = (g) => {
    g.clear();
    data.forEach(wallData => {
      const { x, y, size, type } = wallData;
      let color;
      color = (type === 'able') ? 0xFFFFFF : color;
      color = (type === 'undefined') ? 0xF0F0EC : color;
      color = (type === 'disable') ? 0x1E1E1E : color;
      g.beginFill(color, 1);
    
      g.drawCircle(x, y, size / 2);
    });
    g.endFill();
  };

  return (
  <Graphics 
    draw={_drawLine}
  />
  )
});

const CanvasMap = ({
  canvasRef,
  viewportRef,
  wall,
  wallTemp,

  activeWallId,
  virtualWall,
  virtualWallList,
  onClickFirstPoint,

  activeMove,
  drawMode,
  viewportScale,
  viewportPosition,
  initScale,
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
  onClickCanvasImage,
  onMovePointStart,
  onMovePointEnd,
  onMoved,
  onDrag,
  onDragEnd,

  disableRotate,
  rotate,
  onClickRotationClock,
  onClickRotationUnClock,
  onClickRefreshMap,
}) => {

  function drawDash(
    target,
    x1,
    y1,
    x2,
    y2,
    dashLength = 5,
    spaceLength = 5
  ) {
    let x = x2 - x1;
    let y = y2 - y1;
    let hyp = Math.sqrt((x) * (x) + (y) * (y));
    let units = hyp / (dashLength + spaceLength);
    let dashSpaceRatio = dashLength / (dashLength + spaceLength);
    let dashX = (x / units) * dashSpaceRatio;
    let spaceX = (x / units) - dashX;
    let dashY = (y / units) * dashSpaceRatio;
    let spaceY = (y / units) - dashY;
    target.moveTo(x1, y1);
    while (hyp > 0) {
      x1 += dashX;
      y1 += dashY;
      hyp -= dashLength;
      if (hyp < 0) {
        x1 = x2;
        y1 = y2;
      }
      target.lineTo(x1, y1);
      x1 += spaceX;
      y1 += spaceY;
      target.moveTo(x1, y1);
      hyp -= spaceLength;
    }
    target.moveTo(x2, y2);
  }

  const laserDraw = useCallback(g => {
    g.clear();
    const laserSize = 2;
    for (let i = 0; i < laserData.length; i += 1) {
      const laser = laserData[i];
      const laserSizeX = 2;
      const laserSizeY = 2;
      const scaledLaserX = laser.x - laserSizeX * 0.5;
      const scaledLaserY = laser.y - laserSizeY * 0.5;
      g.beginFill(0x7A00FA, 0.75);
      g.drawCircle(scaledLaserX, scaledLaserY, laserSize);
      g.endFill();
    }
  }, [laserData, scale, initScale]);

  const drawBackGround = (g) => {
    g.clear();
    g.beginFill(0xffffff, .1);
    const dw = dataWidth * scale;
    const dh = dataHeight * scale;
    g.drawRect((canvasWidth / 2) - dw / 2, (canvasHeight / 2) - dh / 2, dw, dh);
    g.endFill();
  };

  const drawTempWall = g => {
    const data = wallTemp[wallTemp.length-1];
    const { x, y, size, type } = data;
    let color;
    color = (type === 'able') ? 0xFFFFFF : color;
    color = (type === 'undefined') ? 0xF0F0EC : color;
    color = (type === 'disable') ? 0x1E1E1E : color;
    g.beginFill(color, 1);
    g.drawCircle(x, y, size / 2);
    g.endFill();
  };

  // 가상벽 목록을 그림
  const drawVirtualWallList = useCallback(g => {
    g.clear();
    virtualWallList.forEach(virtualWall => {
      const color = activeWallId === virtualWall.id ? 0x6A6AD8 : 0x969696;
      g.beginFill(color, 1);
      virtualWall.data.forEach(data => {
        const { x, y } = data;
        g.drawCircle(x, y, 5);
      })

      g.lineStyle(2, color);
      for (let i = 0; i < virtualWall.data.length; i++) {
        const current = virtualWall.data[i];
        const next = virtualWall.data[i + 1] || virtualWall.data[0];
        drawDash(
          g,
          current.x,
          current.y,
          next.x,
          next.y,
          10,
          5
        );
      }

      g.beginFill(color, .2);
      g.lineStyle(0, '');
      g.drawPolygon(virtualWall.data);
    });

  }, [virtualWallList]);

  // 가상벽 추가하면서 그리는 그림
  const drawVirtualWall = useCallback(g => {
    g.clear();
    virtualWall.forEach((data, index) => {
      const { x, y } = data;
      g.lineStyle(2, 0xffd900, 1);
      if (index === 0) {
        g.moveTo(x, y);
      } else {
        g.lineTo(x, y);
      }
    });
    g.endFill();

    g.lineStyle(1, '', 0);
    virtualWall.forEach(data => {
      const { x, y } = data;
      g.beginFill(0x6A6AD8, 1);
      g.drawCircle(x, y, 10);
    });
  }, [virtualWall]);

  return (
    <div className={cx('canvas-image', {
      'active': activeMove
    })}>
      <Stage ref={canvasRef} width={canvasWidth} height={canvasHeight} options={{ backgroundColor: 0xFFFFFF, autoDensity: true }}>
        <PixiViewPort
          ref={viewportRef}
          drawMode={drawMode}
          width={canvasWidth}
          height={canvasHeight}
          dataWidth={dataWidth}
          dataHeight={dataHeight}
          onZoomEndCanvas={onZoomEndCanvas}
          onClickCanvas={onClickCanvas}
          onMoved={onMoved}
        >
          <Container 
            angle={rotate} 
            pivot={[dataWidth/2, dataHeight/2]}
            position={[canvasWidth / 2, canvasHeight / 2]}
            scale={scale}
          >
            {imgData && (
              <Sprite
                image={imgData}
                // anchor={.5}
                // x={canvasWidth / 2}
                // y={canvasHeight / 2}
                option={{ width: dataWidth, height: dataHeight}}
                // scale={scale}
                interactive
                pointerup={onClickCanvasImage}
                // tint={'#fff'}
              />
            )}
            {
              wall.map((data, i) => (
                <DrawLine 
                  key={i}
                  data={data}
                />
              ))
            }
            {/* 그리는 중인거 그리기 */}
            { wallTemp.length > 0 && (<Graphics 
              draw={drawTempWall} 
            />) }

              <Graphics 
                draw={laserDraw} 
                // scale={percentage(scale, initScale) * 0.01}
              />
              {(points.length > 0) && points.map((point, idx) => (
                <Draggable
                  key={idx}
                  image={selectedPoint.id === point.id ? iconPointOn : iconPoint}
                  id={point.id}
                  x={point.x}
                  y={point.y}
                  disabled={disabledDrag}
                  angle={point.degree}
                  scale={(0.3)}
                  onClickPoint={onClickPoint}
                  onMovePointStart={onMovePointStart}
                  onMovePointEnd={onMovePointEnd}
                />
              ))}
              <Graphics 
                draw={drawVirtualWallList} 
              />

              <Graphics 
                draw={drawVirtualWall} 
              />
              {virtualWall[0] && (
                <Sprite
                  image={virtualWallStart}
                  x={virtualWall[0].x - 15}
                  y={virtualWall[0].y - 15}
                  scale={1}
                  interactive
                  pointerup={(e) => {
                    onClickFirstPoint(e);
                    e.stopPropagation();
                  }}
                />
              )}

          </Container>
          { drawMode && (<Graphics
            draw={drawBackGround}
            interactive
            pointerout={onDragEnd}
            pointermove={onDrag}
            pointerup={onDragEnd}
          />)}
        </PixiViewPort>
        { !disableRotate && (
        <Container position={[canvasWidth - 180, canvasHeight - 70]}>
          <Sprite
            y={15}
            image={reFresh}
            interactive
            pointerup={onClickRefreshMap}
            angle={0}
            scale={1.5}
          />
          <Sprite
            x={50}
            image={rotationIncrease}
            interactive
            pointerup={onClickRotationClock}
            angle={0}
            scale={1.5}
          />
          <Sprite
            x={110}
            angle={0}
            image={rotationDecrease}
            interactive
            pointerup={onClickRotationUnClock}
            scale={1.5}
          />
        </Container>
        )}
        <MiniMap
          rotate={rotate}
          dataScale={scale}
          miniMapScale={.25}
          viewportScale={viewportScale}
          viewportPosition={viewportPosition}
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          dataWidth={dataWidth}
          dataHeight={dataHeight}
          imgData={imgData}
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
  scale: 1,
  initScale: 1,
  dataWidth: 0,
  dataHeight: 0,
  canvasWidth: 0,
  canvasHeight: 0,
  width: 0,
  height: 0,
  poseData: {},
  laserData: [],
  points: [],
  viewportScale: 0,
  selectedPoint: {},
  wallTemp: [],
  virtualWall: [],
  virtualWallList: [],
  activeWallId: '',
  disableRotate: true,
  onClickFirstPoint: () => { },
  onClickPoint: () => { },
  onClickCanvas: () => { },
  onMovePointStart: () => { },
  onMovePointEnd: () => { },
  onDrag: () => { },
}
export default CanvasMap;
