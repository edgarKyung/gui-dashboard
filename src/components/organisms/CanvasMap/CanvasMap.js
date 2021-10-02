import React, { useCallback } from 'react';
import PropTypes from 'prop-types'
import { Stage, Sprite, Graphics, Text } from '@inlet/react-pixi';
import classNames from 'classnames/bind';
import styles from './CanvasMap.module.scss';
import iconPoint from '../../../static/images/ico/icon_point.png';
import iconPointOn from '../../../static/images/ico/icon_point_on.png';
import virtualWallStart from '../../../static/images/source/virtual_wall_start.png';
import Draggable from './Draggable';
import PixiViewPort from './PixiViewPort';
import MiniMap from './MiniMap';


const cx = classNames.bind(styles);

const CanvasMap = ({
  viewportRef, 
  wall, 
  wallTemp,

  activeWallId,
  virtualWall,
  virtualWallList,
  onClickFirstPoint,

  activeMove,
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
  onDragEnd,
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

  // 맵 데이터 그림
  const drawWall = useCallback(g => {
    g.clear();
    wall.reduce((prev, current) => prev.concat(current), []).concat(wallTemp).forEach(data => {
      const {x,y, size, type} = data;
      let color;
      switch(type){
        case 'able': color = 0xffffff; break;
        case 'undefined': color = 0xd8d8d8; break;
        case 'disable': color = 0x222222; break;
      }
      g.beginFill(color, 1);
      g.drawRect(x - (size/2), y- (size/2), size, size);
    }); 
    g.endFill();
  }, [wallTemp.length, wall]);

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
      for(let i = 0; i < virtualWall.data.length; i++){
        const current = virtualWall.data[i];
        const next = virtualWall.data[i+1] || virtualWall.data[0];
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
      if(index === 0){
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
      'active' : activeMove
    })}>
      <Stage width={canvasWidth} height={canvasHeight} options={{ backgroundColor: 0xFFFFFF, autoDensity: true }}>
        <PixiViewPort
          ref={viewportRef}
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
              pointerup={onDragEnd}
            />
          )}
          <Graphics draw={drawWall} />

          <Graphics draw={drawVirtualWallList} />
          
          <Graphics draw={drawVirtualWall} />
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

          <Graphics draw={laserDraw} />
          {(points.length > 0) && points.map((point, idx) => (
            <Draggable
              key={idx}
              image={selectedPoint.id === point.id ? iconPointOn : iconPoint}
              id={point.id}
              x={point.x}
              y={point.y}
              disabled={disabledDrag}
              angle={point.degree}
              scale={scale - .2}
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
  wallTemp: [],
  virtualWall: [],
  virtualWallList: [],
  activeWallId: '',
  onClickFirstPoint: () => { },
  onClickPoint: () => { },
  onClickCanvas: () => { },
  onMovePointStart: () => { },
  onMovePointEnd: () => { },
  onDrag: () => { },
}
export default CanvasMap;
