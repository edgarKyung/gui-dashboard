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
    robots,
  } = useSelector((store) => ({
    imageList: store.images.list,
    activeIndex: store.images.activeIndex,
    robots: store.robots.robots,
  }), shallowEqual);

  if(activeIndex === null) return (<>No Image</>)
  // return (<div>asd</div>);
  const imageData = imageList[activeIndex];
  console.log(imageList, imageData);
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
    />
  )
}

CanvasMapContainer.defaultProps = {
};

export default React.memo(CanvasMapContainer);
