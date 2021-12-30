import React, { useCallback} from 'react';
import PropTypes from 'prop-types'
import { Stage, Sprite, Graphics, Container } from '@inlet/react-pixi';
import classNames from 'classnames/bind';
import styles from './CanvasMap.module.scss';
import PixiViewPort from './PixiViewPort';
import MiniMap from './MiniMap';

import iconPoint from '../../../static/images/ico/icon_point.png';
import iconPointOn from '../../../static/images/ico/icon_point_on.png';

const cx = classNames.bind(styles);

const RobotIconList = ({
  dataWidth,
  dataHeight,
  scale,
  robots,
  activeRobotIndex,
}) => {
  return robots.map(({
    id,
    status
  }, idx) => (
    (status.pose.x < dataWidth) && (status.pose.y < dataHeight) && (
      <Sprite
        key={idx}
        image={id === activeRobotIndex ? iconPointOn : iconPoint}
        x={status.pose.x}
        y={status.pose.y}
        anchor={0.5}
        angle={status.pose.degree}
        interactive
        scale={scale}
      />
    )
  ));
};

const RobotScheduleList = ({
  schedule,
  activeRobotIndex
}) => {
  const drawSchedule = useCallback(g => {
    g.clear();
    schedule.forEach((data, index) => {
      const { x, y } = data;
      console.log(x, y);
      g.lineStyle(2, 0xffd900, 1);
      if (index === 0) {
        g.moveTo(x, y);
      } else {
        g.lineTo(x, y);
      }
    });
    g.endFill();
  }, [activeRobotIndex]);

  return <Graphics draw={drawSchedule}/>

};

const CanvasMap = ({
  canvasWidth,
  canvasHeight,
  dataWidth,
  dataHeight,
  scale,
  imgData,
  robots,
  activeRobotIndex,

  viewportScale,
  viewportPosition,
  onZoomEndCanvas,
  onMoved,
}) => {
  const activeRobot = robots[activeRobotIndex];
  console.log('redner canvas map');
  return (
    <div className={cx('canvas-image')}>
      <Stage width={canvasWidth} height={canvasHeight} options={{ backgroundColor: 0xFFFFFF, autoDensity: true }}>
        <PixiViewPort
          width={canvasWidth}
          height={canvasHeight}
          dataWidth={dataWidth}
          dataHeight={dataHeight}
          onZoomEndCanvas={onZoomEndCanvas}
          onMoved={onMoved}
        >
          <Container
            pivot={[dataWidth / 2, dataHeight / 2]}
            position={[canvasWidth / 2, canvasHeight / 2]}
            scale={scale}
          >
            {imgData && (
              <Sprite
                image={imgData}
                option={{ width: dataWidth, height: dataHeight }}
                interactive
                // pointerup={onClickCanvasImage}
              />
            )}
            <RobotIconList
              activeRobotIndex={activeRobotIndex}
              robots={robots}
              dataWidth={dataWidth}
              scale={scale}
              dataHeight={dataHeight}
            />
            {activeRobot && <RobotScheduleList 
              schedule={activeRobot.status.schedule}
              activeRobotIndex={activeRobotIndex}
            />}
            
          </Container>
        </PixiViewPort>
        <MiniMap
          rotate={0}
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
  robots: PropTypes.array,
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
  robots: [],
  activeRobotIndex: null,
  viewportScale: 0,
  selectedPoint: {},
  wallTemp: [],
  virtualWall: [],
  virtualWallList: [],
  activeWallId: '',
  disableRotate: true,
  onZoomEndCanvas: () => {},
  onMoved: () => {},
}

export default React.memo(CanvasMap);