import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, shallowEqual } from 'react-redux'
import { CanvasMap } from '../components/organisms';


const convertImageData = (data) => {
  const base64String = 'data:image/png;base64,' + new Buffer.from(data).toString("base64");
  return base64String; 
}

const CanvasMapContainer = () => {
  const { 
    imageList,
    activeIndex,
    activeRobotIndex,
    robots,
  } = useSelector((store) => ({
    imageList: store.images.list,
    activeIndex: store.images.activeIndex,
    activeRobotIndex: store.robots.activeIndex,
    robots: store.robots.robots,
  }), shallowEqual);

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


  if(activeIndex === null) return (<>No Image</>)
  // return (<div>asd</div>);
  const imageData = imageList[activeIndex];
  const imgData = convertImageData(imageData.data);
  return (
    <CanvasMap
      canvasWidth={1189}
      canvasHeight={1017}
      dataWidth={imageData.width}
      dataHeight={imageData.height}
      scale={1}
      imgData={imgData}
      robots={robots}
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
