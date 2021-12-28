import React from 'react';
import PropTypes from 'prop-types'
import { Stage, Sprite, Graphics, Container } from '@inlet/react-pixi';
import classNames from 'classnames/bind';
import styles from './CanvasMap.module.scss';
import PixiViewPort from './PixiViewPort';

import iconPoint from '../../../static/images/ico/icon_point.png';

const cx = classNames.bind(styles);

const RobotIconList = ({
  dataWidth,
  dataHeight,
  scale,
  robots,
}) => {
  return robots.map(({
    id,
    status
  }, idx) => (
    (status.pose.x < dataWidth) && (status.pose.y < dataHeight) && (
      <Sprite
        key={idx}
        image={iconPoint.src}
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


const CanvasMap = ({
  canvasWidth,
  canvasHeight,
  dataWidth,
  dataHeight,
  scale,
  imgData,
  robots,
}) => {
  return (
    <div className={cx('canvas-image')}>
      <Stage width={canvasWidth} height={canvasHeight} options={{ backgroundColor: 0xFFFFFF, autoDensity: true }}>
        <PixiViewPort
          width={canvasWidth}
          height={canvasHeight}
          dataWidth={dataWidth}
          dataHeight={dataHeight}
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
              robots={robots}
              dataWidth={dataWidth}
              scale={scale}
              dataHeight={dataHeight}
            />
          </Container>
        </PixiViewPort>
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
  viewportScale: 0,
  selectedPoint: {},
  wallTemp: [],
  virtualWall: [],
  virtualWallList: [],
  activeWallId: '',
  disableRotate: true,
}
export default React.memo(CanvasMap);
