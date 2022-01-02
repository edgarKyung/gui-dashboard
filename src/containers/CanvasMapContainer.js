import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, shallowEqual } from 'react-redux'
import { CanvasMap } from '../components/organisms';


const convertImageData = (data) => {
  const base64String = 'data:image/png;base64,' + new Buffer.from(data).toString("base64");
  return base64String; 
}

const CanvasMapContainer = () => {
  const { 
    floorList,
    activeFloor,
    activeRobotIndex,
    robots,
  } = useSelector((store) => ({
    floorList: store.floors.floors,
    activeFloor: store.floors.activeFloor,
    activeRobotIndex: store.robots.activeIndex,
    robots: store.robots.robots,
  }), shallowEqual);

  const selectedFloor = floorList[activeFloor];
  const robotsFilter = selectedFloor ? robots.filter((robot) => selectedFloor.robots.includes(robot.id)) : [];

  const [viewportScale, setViewportScale] = useState(1);
  const [viewportPosition, setViewportPosition] = useState({ x: 0, y: 0 });

  const handleZoomEndCanvas = useCallback((e) => {
    const { scaleX, x, y } = e.lastViewport;
    setViewportScale(scaleX);
    setViewportPosition({ x, y });
  }, []);

  const handleViewPortMoved = useCallback((e) => {
    const { scaleX, x, y } = e.viewport.lastViewport;
    setViewportScale(scaleX);
    setViewportPosition({ x, y });
  }, []);


  if(activeFloor === null) return (<>No Image</>)
  // return (<div>asd</div>);
  const { image } = floorList[activeFloor];
  const imgData = convertImageData(image.data);
  return (
    <CanvasMap
      canvasWidth={1189}
      canvasHeight={1017}
      dataWidth={image.width}
      dataHeight={image.height}
      scale={1}
      imgData={imgData}
      robots={robotsFilter}
      activeRobotIndex={activeRobotIndex}

      viewportScale={viewportScale}
      viewportPosition={viewportPosition}
      onZoomEndCanvas={handleZoomEndCanvas}
      onMoved={handleViewPortMoved}
    />
  )
}

CanvasMapContainer.defaultProps = {
};

export default React.memo(CanvasMapContainer);
